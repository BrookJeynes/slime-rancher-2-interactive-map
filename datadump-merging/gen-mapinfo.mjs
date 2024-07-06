import fs from "fs";
import esMain from "es-main";

if(esMain(import.meta)) genMapInfo();


export function genMapInfo(outFilePath = 'mapinfo.ts') {

    // using capturing groups to extract minx, miny, maxx, and maxy, in that order expected.
    const bbRegex = /<BoundingBox minx="([+-]?\d*(?:\d\.?|\.\d)\d*)" miny="([+-]?\d*(?:\d\.?|\.\d)\d*)" maxx="([+-]?\d*(?:\d\.?|\.\d)\d*)" maxy="([+-]?\d*(?:\d\.?|\.\d)\d*)"\/>/;
    // using capturing group to extract the units per pixel of the highest (zoom=0) layer.
    const tileSet0Regex = /<TileSet href="0" units-per-pixel="([+-]?\d*(?:\d\.?|\.\d)\d*)" order="0"\/>/;
    // using capturing groups to extract the width and height of the tiles.
    const tileWHRegex = /<TileFormat width="([+-]?\d*(?:\d\.?|\.\d)\d*)" height="([+-]?\d*(?:\d\.?|\.\d)\d*)"/;

    let [ minx, miny, maxx, maxy ] = fs.readFileSync('dumps/sr2plugin_dump_map_info.csv', 'utf-8')
    .split(/\r?\n/, 2)[1]
    .split(',').map(parseFloat);

    // let gameMapBounds = {x: [-3200,3200], y: [-3200,3200]};
    let gameMapBounds = {x: [minx,miny], y: [maxx,maxy]};
    let gameMapWidthUnits = gameMapBounds.x[1] - gameMapBounds.x[0];
    let gameMapHeightUnits = gameMapBounds.y[1] - gameMapBounds.y[0];

    let tileSize = null;
    let unitsPerPixel = null;
    let mapWidthPx = null;
    let mapHeightPx = null;

    fs.readFileSync('../public/map/tilemapresource.xml', 'utf-8').split(/\r?\n/).forEach((line) => {
        let regexResult = null;
        if((regexResult = bbRegex.exec(line)) != null) {
            let minx = parseFloat(regexResult[1]);
            let miny = parseFloat(regexResult[2]);
            let maxx = parseFloat(regexResult[3]);
            let maxy = parseFloat(regexResult[4]);
            mapWidthPx = Math.abs(maxx - minx);
            mapHeightPx = Math.abs(maxy - miny);
            if(mapWidthPx != mapHeightPx)
                throw new Error(`Unexpected: map size was not rectangular! Instead, ${mapWidthPx}x${mapHeightPx}. If this is correct, update the script.`);
        }
        else if((regexResult = tileSet0Regex.exec(line)) != null) {
            unitsPerPixel = parseFloat(regexResult[1]);
        }
        else if((regexResult = tileWHRegex.exec(line)) != null) {
            tileSize = parseFloat(regexResult[1]);
            let h = parseFloat(regexResult[2]);
            if(tileSize != h)
                throw new Error(`Unexpected: tile size was not rectangular! Instead, ${tileSize}x${h}. If this is correct, update the script.`);
        }
    });

    if(tileSize == null) throw new Error('Did not initialize tileSize!');
    if(unitsPerPixel == null) throw new Error('Did not initialize unitsPerPixel!');
    if(mapWidthPx == null) throw new Error('Did not initialize mapWidthPx!');
    if(mapHeightPx == null) throw new Error('Did not initialize mapHeightPx!');

    fs.writeFileSync(outFilePath,
        '// generated by datadump-merging'
        + ''
        + `export const gameMapBounds: { x: number[]; y: number[]; } = { x: [${gameMapBounds.x}], y: [${gameMapBounds.y}] };`
        + `export const gameMapWidthUnits: number = ${gameMapWidthUnits};`
        + `export const gameMapHeightUnits: number = ${gameMapHeightUnits};`
        + ''
        + `export const tileSize: number = ${tileSize};`
        + `export const unitsPerPixel: number = ${unitsPerPixel};`
        + `export const mapWidthPx: number = ${mapWidthPx};`
        + `export const mapHeightPx: number = ${mapHeightPx};`
    );
    console.log('Generated mapinfo.ts');

}