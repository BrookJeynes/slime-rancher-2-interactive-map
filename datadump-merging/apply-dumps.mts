import { Vec2 } from '../src/types.js';
type GetPosForIdFn = (id: string, oldXraw: string, oldYraw: string) => Vec2;

import fs from "fs";
import { parse } from "csv-parse/sync";
import esMain from "es-main";

const csvParserOptions = {
    columns: true,
    skip_empty_lines: true
};

// using capturing groups to extract the id portion
const idLineRegex = /^[ \t]*(?:"([^\"]*)"|([^ ]+)): *{ *$/;
// using capturing groups to extract the numbers and surrounding text, for ease of reconstructing the line with different numbers.
const posLineRegex = /^([ \t]*pos: *{ *x: *)([-+]?\d*(?:\d\.?|\.\d)\d*)( *, *y: *)([-+]?\d*(?:\d\.?|\.\d)\d*)( *},? *)$/;
// no capturing groups needed for matching the last line of a data group
const endLineRegex = /^[ \t]*},$/;

if (esMain(import.meta)) applyAllPositions();

// for reducing redundancy
function getGetPosForId(positionsMapObj: { [id: string]: Vec2 }, singularName: string): GetPosForIdFn {
    return (id: string, oldXraw: string, oldYraw: string): Vec2 => {
        if(positionsMapObj.hasOwnProperty(id)) {
            let res = positionsMapObj[id];
            // remove it from the mapping to track that we have covered it.
            delete positionsMapObj[id];
            return res;
        }
        // throw new Error(`Unable to find ${singularName} position for id "${id}" or it was already applied earlier`);
        console.error(`Unable to find ${singularName} position for id "${id}" or it was already applied earlier`);
        return { x: parseFloat(oldXraw), y: parseFloat(oldYraw) };
    }
}

export function applyAllPositions() {

    // ====================
    // Apply positions from other dumped .CSVs

    // ==========
    // Gordos

    const gordoPositions: { [gordoId: string]: Vec2 } = {};

    parse(fs.readFileSync('dumps/sr2plugin_dump_gordos.csv'), csvParserOptions).forEach((record: { [x: string]: any; }) => {
        // intentional side-effect: this de-duplicates records in the csv.
        gordoPositions[record['gordoId']] = { x: record['gordoObj.transform.position.x'], y: record['gordoObj.transform.position.z'] };
    });

    applyPositions({
        filePath: '../src/data/gordos.ts',
        idLineRegex: idLineRegex,
        posLineRegex: posLineRegex,
        endLineRegex: endLineRegex,
        // getPosForId: (gordoId: string, oldX: string, oldY: string): Vec2 => {
        //     if(gordoPositions.hasOwnProperty(gordoId)) {
        //         let res = gordoPositions[gordoId];
        //         // remove it from the mapping to track that we have covered it.
        //         delete gordoPositions[gordoId];
        //         return res;
        //     }
        //     throw new Error(`Unable to find gordo position for id "${gordoId}" or it was already applied earlier`);
        // },
        getPosForId: getGetPosForId(gordoPositions, 'gordo'),
        getRemainingPositions: (): [string, Vec2][] => Object.entries(gordoPositions),
        posEntryToNewDataElement: ([id, pos]: [string, Vec2]): string[] => {
            console.error(`PLEASE FILL OUT INCOMPLETE INFORMATION for gordo id ${id} at position { x: ${pos.x}, y: ${pos.y} }`);
            return [
                `    "${id}": {`,
                `        name: "Incomplete Gordo Data",`,
                `        food: "unspecified",`,
                `        pos: { x: ${pos.x}, y: ${pos.y} },`,
                `        image: "../pins/xMark.png",`,
                `        drops: ["unspecified drops"],`,
                `        unlocks: ["unspecified unlock"],`,
                `        description: "${id} Needs description",`,
                `    },`
            ];
        }
    });

    // ==========
    // Pods

    const podPositions: { [podId: string]: Vec2 } = {};

    parse(fs.readFileSync('dumps/sr2plugin_dump_pods.csv'), csvParserOptions).forEach((record: { [x: string]: any; }) => {
        // intentional side-effect: this de-duplicates records in the csv.
        podPositions[record['podId']] = { x: record['podObj.transform.position.x'], y: record['podObj.transform.position.z'] };
    });

    applyPositions({
        filePath: '../src/data/treasure_pods.ts',
        idLineRegex: idLineRegex,
        posLineRegex: posLineRegex,
        endLineRegex: endLineRegex,
        getPosForId: getGetPosForId(podPositions, 'pod'),
        getRemainingPositions: (): [string, Vec2][] => Object.entries(podPositions),
        posEntryToNewDataElement: ([id, pos]: [string, Vec2]): string[] => {
            console.error(`PLEASE FILL OUT INCOMPLETE INFORMATION for pod id ${id} at position { x: ${pos.x}, y: ${pos.y} }`);
            return [
                `    "${id}": {`,
                `        contents: ["unspecified contents"],`,
                `        description: "${id} Needs description",`,
                `        pos: { x: ${pos.x}, y: ${pos.y} }`,
                `    },`
            ];
        }
    });

    // ==========
    // Locked Plort Doors

    const plortDoorPositions: { [podId: string]: Vec2 } = {};

    parse(fs.readFileSync('dumps/sr2plugin_dump_puzzleslots.csv'), csvParserOptions).forEach((record: { [x: string]: any; }) => {
        // intentional side-effect: this de-duplicates records in the csv.
        plortDoorPositions[record['slotId']] = { x: record['slotObj.transform.position.x'], y: record['slotObj.transform.position.z'] };
    });

    applyPositions({
        filePath: '../src/data/locked_doors.ts',
        idLineRegex: idLineRegex,
        posLineRegex: posLineRegex,
        endLineRegex: endLineRegex,
        getPosForId: getGetPosForId(plortDoorPositions, 'locked plort door'),
        getRemainingPositions: (): [string, Vec2][] => Object.entries(plortDoorPositions),
        posEntryToNewDataElement: ([id, pos]: [string, Vec2]): string[] => {
            console.error(`PLEASE FILL OUT INCOMPLETE INFORMATION for locked plort door id ${id} at position { x: ${pos.x}, y: ${pos.y} }`);
            return [
                `    "${id}": {`,
                `        name: "<Unspecified type> Door Receptacle",`,
                `        plort: "x<Unspecified count> <Unspecified type> Plort",`,
                `        pos: { x: ${pos.x}, y: ${pos.y} },`,
                `        image: "../pins/xMark.png",`,
                `        description: "${id} Needs description",`,
                `        unlocks: "Unspecified unlock",`,
                `    },`
            ];
        }
    });

    // ==========
    // Map Nodes

    const mapNodePositions: { [podId: string]: Vec2 } = {};

    parse(fs.readFileSync('dumps/sr2plugin_dump_mapnodes.csv'), csvParserOptions).forEach((record: { [x: string]: any; }) => {
        // intentional side-effect: this de-duplicates records in the csv.
        // Note: the map nodes did not have a sufficiently unique id from dump; therefore, creating one from position.
        const x = record['mapNodeObj.transform.position.x'];
        const y = record['mapNodeObj.transform.position.z'];
        const id = `${x},${y}`;
        mapNodePositions[id] = { x: x, y: y };
    });

    applyPositions({
        filePath: '../src/data/map_nodes.ts',
        idLineRegex: idLineRegex,
        posLineRegex: posLineRegex,
        endLineRegex: endLineRegex,
        getPosForId: getGetPosForId(mapNodePositions, 'map node'),
        getRemainingPositions: (): [string, Vec2][] => Object.entries(mapNodePositions),
        posEntryToNewDataElement: ([id, pos]: [string, Vec2]): string[] => {
            console.error(`PLEASE FILL OUT INCOMPLETE INFORMATION for map node id ${id} at position { x: ${pos.x}, y: ${pos.y} }`);
            return [
                `    "${id}": {`,
                `        name: "Needs name",`,
                `        pos: { x: ${pos.x}, y: ${pos.y} },`,
                `        description: "${id} Needs description",`,
                `    },`
            ];
        }
    });

    // ==========
    // Research Drones

    const dronePositions: { [podId: string]: Vec2 } = {};

    parse(fs.readFileSync('dumps/sr2plugin_dump_drones.csv'), csvParserOptions).forEach((record: { [x: string]: any; }) => {
        // intentional side-effect: this de-duplicates records in the csv.
        // Note: the research drones did not have a sufficiently unique id from dump; therefore, creating one from position.
        const x = record['droneObj.transform.position.x'];
        const y = record['droneObj.transform.position.z'];
        const id = `${x},${y}`;
        dronePositions[id] = { x: x, y: y };
    });

    applyPositions({
        filePath: '../src/data/research_drones.ts',
        idLineRegex: idLineRegex,
        posLineRegex: posLineRegex,
        endLineRegex: endLineRegex,
        getPosForId: getGetPosForId(dronePositions, 'research drone'),
        getRemainingPositions: (): [string, Vec2][] => Object.entries(dronePositions),
        posEntryToNewDataElement: ([id, pos]: [string, Vec2]): string[] => {
            console.error(`PLEASE FILL OUT INCOMPLETE INFORMATION for research drone id ${id} at position { x: ${pos.x}, y: ${pos.y} }`);
            return [
                `    "${id}": {`,
                `        name: "Research Drone <unspecified number>",`,
                `        log: [`,
                `            \`Unspecified log\`,`,
                `        ],`,
                `        archive: [`,
                `            \`Unspecified archive\`,`,
                `        ],`,
                `        pos: { x: ${pos.x}, y: ${pos.y} },`,
                `        description: "Research drone ${id} needs description",`,
                `    },`
            ];
        }
    });

} // end main()


function applyPositions({
            filePath,
            idLineRegex,
            posLineRegex,
            endLineRegex,
            getPosForId,
            getRemainingPositions,
            posEntryToNewDataElement
        } : {
            filePath: fs.PathOrFileDescriptor;
            idLineRegex: RegExp; posLineRegex: RegExp;
            endLineRegex: RegExp;
            getPosForId: GetPosForIdFn;
            getRemainingPositions: () => [string, Vec2][];
            posEntryToNewDataElement: ([id, pos]: [string, Vec2]) => string[];
        }) {

    if(!filePath || !idLineRegex || !posLineRegex || !endLineRegex || !getPosForId || !getRemainingPositions || !posEntryToNewDataElement)
        throw new Error('Missing an argument');

    let _datafileCurId: string | null = null;
    let _datafileLastLineOfLastDataElement: number = NaN;
    
    let fileLines = fs.readFileSync(filePath, { encoding: 'utf8' }).split(/\r?\n/);
    
    fileLines = fileLines.map((line: string, i: number) => {
        if(line.length != 0) {            
            let regexResult: RegExpExecArray | null = null;
            
            if((regexResult = idLineRegex.exec(line)) != null) {
                if(_datafileCurId != null)
                    throw new Error('Found another data element id line (starting line) while inside a data element? Line #' + (i+1));

                _datafileCurId = regexResult[1] ?? regexResult[2];
            }
            else if((regexResult = posLineRegex.exec(line)) != null) {
                if(_datafileCurId == null)
                    throw new Error('Found a pos line while outside any data element? Line #' + (i+1));

                // crudely check its 'length', i.e. existence of all 5 capturing group values
                if(!regexResult.hasOwnProperty(5))
                    throw new Error('Regex result does not have a property 5. Line ' + line);

                // reconstruct the line with new numbers
                const { x, y } = getPosForId(_datafileCurId, regexResult[2], regexResult[4]);
                return regexResult[1] + x + regexResult[3] + y + regexResult[5];
            }
            else if(endLineRegex.test(line)) {
                if(_datafileCurId == null)
                    throw new Error('Found the end line of a data element while outside any data element? Line #' + (i+1));

                _datafileCurId = null;
                _datafileLastLineOfLastDataElement = i;
            }
        }
        return line;
    });

    const morePositions = getRemainingPositions();
    if(morePositions.length > 0) {
        console.warn(`After processing file "${filePath}", ${morePositions.length} positions remained: ` + morePositions);

        // for all remaining positions, 'append' them in the file
        fileLines.splice(_datafileLastLineOfLastDataElement + 1, 0, ...morePositions.flatMap(posEntryToNewDataElement));
    } else {
        console.log(`Processed positions in file "${filePath}".`)
    }

    fs.writeFileSync(filePath, fileLines.join('\n'));

}
