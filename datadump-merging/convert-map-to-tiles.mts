import fs from "fs";
import path from "path";
import { spawn } from 'child_process';
import sharp from "sharp";
import esMain from "es-main";

if (esMain(import.meta)) convertToTilemap();

const _pathToGdal2Tiles = 'gdal2tiles-leaflet/gdal2tiles.py';

const _pythonCLIname = (process.platform === 'win32' ? 'py' : process.platform === 'linux' ? 'python3' : 'python');


export function convertToTilemap(mapFilePath = 'map.png', outDirPath = 'map') {

    const _inFileArg = mapFilePath;
    const _outDirArg = outDirPath;

    let promise = new Promise<{ code: number | null, signal: NodeJS.Signals | null }>(function(resolve, reject) {

        sharp(mapFilePath, { limitInputPixels: false }).metadata()
        .then((metadata) => {
            const imgWidthPx = metadata.width;
            if(typeof imgWidthPx === "undefined") throw new Error(`Unable to determine width of input image ${mapFilePath}`);

            const pipListProcess = spawn('pip', ["list"]);

            let errs: any[] = [];
            let outs: any[] = [];

            // transparently forward the stdout and stderr
            pipListProcess.stdout.on('data', (chunk) => { outs.push(chunk); process.stdout.write(chunk); });
            pipListProcess.stderr.on('data', (chunk) => { errs.push(chunk); process.stderr.write(chunk); });

            pipListProcess.on('close', (code, signal) => {
                
                if(outs.map((chunk) => chunk.toString()).join('').toLowerCase().indexOf('gdal') < 0) {
                    // failed to find gdal module installed
                    console.error(
                        '\nFailed to find python module "gdal" installed (via \'pip list\').'
                        + '\n  Ensure python is available at the command line (\'pip\' and \'py\'),'
                        + '\n  and the python module "gdal" is installed'
                        + '\n    (can find prebuilt wheels available at \'https://github.com/cgohlke/geospatial-wheels/releases\')'
                    );
                    reject({ code: code, signal: signal });
                }
                else {
                    // successfully found gdal module installed!
                    console.log(
                        '\nSuccessfully found python module "gdal" installed (via \'pip list\')!'
                        + '\n  Executing the gdal2tiles script...'
                    );

                    // proceed with executing gdal2tiles script

                    outs = [];
                    errs = [];

                    const pythonProcess = spawn(_pythonCLIname, [_pathToGdal2Tiles, "-l", "-p", "raster", "-z", "0-5", "-w", "none", _inFileArg, _outDirArg]);

                    // transparently forward the stdout and stderr
                    pythonProcess.stdout.on('data', (chunk) => { outs.push(chunk); process.stdout.write(chunk); });
                    pythonProcess.stderr.on('data', (chunk) => { errs.push(chunk); process.stderr.write(chunk); });

                    pythonProcess.on('close', (code, signal) => {
                        
                        // check that all expected files exist
                        let allFilesExist = true;
                        if(!fs.existsSync(path.join(outDirPath, 'tilemapresource.xml'))) {
                            allFilesExist = false;
                        }
                        else {
                            const maxz = Math.ceil(Math.log2(imgWidthPx / tileSizePx));
                            loop1:
                            for(let z = maxz; z >= 0; z--) {
                                const tilect = tilesForSideLengthForZoomLevel(imgWidthPx, maxz, z);
                                // containing folders
                                for(let x = 0; x < tilect; x++) {
                                    // tiles in folder
                                    for(let y = 0; y < tilect; y++) {
                                        // expect tile file to exist
                                        if(!fs.existsSync(path.join(outDirPath, `${z}/${x}/${y}.png`))) {
                                            console.error(`File ${path.join(outDirPath, `${z}/${x}/${y}.png`)} is missing!`);
                                            allFilesExist = false;
                                            break loop1;
                                        }
                                    }
                                }
                            }
                        }

                        if(!allFilesExist) {
                            console.error('\nFailed to convert map image file into leaflet map tiles.');
                            reject({ code: code, signal: signal });
                        }
                        else {
                            console.log('\nSuccessfully converted map image file into leaflet map tiles!');
                            resolve({ code: code, signal: signal });
                        }
                    });
                }
            });
        });
    });

    return promise
    .then((result) => {
        console.log(`Converted ${mapFilePath} to tilemap at ${outDirPath}. Returned code ${result.code}, signal ${result.signal}`);
        return result;
    })
    .catch((reason) => console.error(`Converting to tilemap failed! \nCode: ${reason.code}, signal: ${reason.signal}`));


    // TODO optimize the pngs?
}

const tileSizePx = 256;  // Could read this from tilemapresource.xml for reducing hardcoded values, although this value is not expected to change

function tilesForSideLengthForZoomLevel(imgWidthPx: number, maxz: number, z: number) {
    return Math.ceil(imgWidthPx / (tileSizePx * Math.pow(2, (maxz - z))));
}