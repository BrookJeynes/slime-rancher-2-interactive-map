import fs from "fs";
import { parse } from "csv-parse/sync";
import sharp from "sharp";
import esMain from "es-main";

if(esMain(import.meta)) stitchMap();


const csvParserOptions = {
    columns: true,
    skip_empty_lines: true
};

// the ingame map uses 4096x4096-pixel textures in 1024x1024-unit RectTransforms.
const textureRatio = 4096 / 1024;  // = 4

// the ingame map extends from -3200 to +3200 units on both axes.
const mapWidthPx = 6400 * textureRatio;
const mapHeightPx = 6400 * textureRatio;

/** @type {{ [texname: string]: {left: number, top: number} }} */
let assetPositions = {};



export async function stitchMap(outFilePath = 'map.png') {

    assetPositions = {};

    // ====================
    // Stitch map assets

    parse(fs.readFileSync('dumps/sr2plugin_dump_map_texture_locations.csv'), csvParserOptions).forEach((/**@type {{ [x: string]: any }}*/ record) => {
        // 1) The ingame map's coordinate space increases Y from bottom to top.
        //    In our case, images increase Y from top to bottom.
        //    Therefore, we need to "flip" each asset RectTransform's top left corner Y.
        //      (Note that this means we are taking what was originally the rect's bottom Y as the new top Y.)
        // 2) The ingame map's 0,0 is centered.
        //    In our case, images' 0,0 are at the top left.
        //    Therefore, we add half the width/height to adjust for the originally-centered origin.
    
        // Note on RectTransforms: offsetMin is top left, offsetMax is bottom right.
    
        const leftX = (parseFloat(record['rt.offsetMin.x']) * textureRatio + mapWidthPx / 2);
        const topY = (-parseFloat(record['rt.offsetMax.y']) * textureRatio + mapHeightPx / 2);
        assetPositions[record['texture.name']] = { left: leftX, top: topY };
    });
    
    // begin map-stitching promise
    console.log('Stitching map assets into ' + outFilePath + ' ...')
    const sharpoutputinfo = await stitch(outFilePath);
    console.log('Done stitching map assets.');

}

function getAssetPosition(texName) {
    if(assetPositions.hasOwnProperty(texName))
        return assetPositions[texName];
    throw new Error(`Unable to find asset position for texture name ${texName}`);
}

function stitch(outFilePath = 'map.png') {
    return sharp({
        limitInputPixels: mapWidthPx * mapHeightPx,
        create: {
            width: mapWidthPx,
            height: mapHeightPx,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .composite([
        { input: './map_assets/Map_Fields.png', ...getAssetPosition('Map_Fields') },
        { input: './map_assets/Map_Strand.png', ...getAssetPosition('Map_Strand') },
        { input: './map_assets/Map_Wall.png', ...getAssetPosition('Map_Wall') },
        { input: './map_assets/Map_Gorge.png', ...getAssetPosition('Map_Gorge') },
        { input: './map_assets/Map_Bluffs.png', ...getAssetPosition('Map_Bluffs') },
    ])
    .toFile(outFilePath);
}