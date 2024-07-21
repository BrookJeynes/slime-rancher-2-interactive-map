import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import esMain from "es-main";

if(esMain(import.meta)) optimizeMapTiles('../public/map', 'map');


export async function optimizeMapTiles(inDir, outDir) {
    
    const subPaths = await fs.readdir(inDir, { 
        withFileTypes: true,
        recursive: true
    });
    const fileDirents = subPaths.filter((dirent) => dirent.isFile() && dirent.name.endsWith('.png'));
    
    // console.log(fileDirents);
    
    const sharpOutputInfos = await Promise.all(fileDirents.map(async dirent => {
        // return path.join(path.relative(tilesOutDirPath, dirent.parentPath), dirent.name);
        const relPath = path.relative(inDir, dirent.parentPath);
        const inFile = path.join(dirent.parentPath, dirent.name);
        const outFile = path.join(outDir, relPath, dirent.name);
        // console.log(dirent.parentPath + ' | ' + dirent.name + ' - ' + inFile + ' - ' + outFile);
        // await fs.mkdir(outFile, { recursive: true });
        
        await fs.mkdir(path.join(outDir, relPath), { recursive: true });
        const outputInfo = await sharp(inFile)
            .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
            .toFile(outFile);
    
        // const origSize = , newSize = outputInfo.size;
        const origSize = (await fs.stat(inFile)).size, newSize = (await fs.stat(outFile)).size;
        let keeporig = false;
        if(newSize > origSize) {
            await fs.copyFile(inFile, outFile);
            keeporig = true;
        }
        console.log(`done ${path.join(relPath, dirent.name)}  | orig size ${origSize}, new size ${newSize}, x ${`${newSize / origSize}`.substring(0,5)}`
            + `${keeporig ? ' (kept original)' : ''}`)
        return outputInfo;
    }));

    return sharpOutputInfos;
}
