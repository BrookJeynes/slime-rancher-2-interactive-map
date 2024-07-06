import { stitchMap } from "./stitch-map.mjs";
import { convertToTilemap } from "./convert-map-to-tiles.mjs";
import { genMapInfo } from "./gen-mapinfo.mjs";

const mapImgFilePath = '../public/map.png';
const tilesOutDirPath = '../public/map';

await stitchMap(mapImgFilePath);

await convertToTilemap(mapImgFilePath, tilesOutDirPath);

await genMapInfo('../src/data/mapinfo.ts');
