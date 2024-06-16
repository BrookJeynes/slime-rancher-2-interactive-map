import { TeleportLine } from "../types";

export const teleport_lines: { [key: string]: TeleportLine } = {
    "line_1": {
        name: "RF to EV 1",
        positions: [
            { x: 67.785, y: 78.895 },
            { x: 69.013, y: 64.124 },
        ],
        midpoint: { x: 68.766, y: 71.765 },
    },
    "line_2": {
        name: "RF to EV 2",
        positions: [
            { x: 70.419, y: 94.673 },
            { x: 76.145, y: 40.303 },
        ],
        midpoint: { x: 74.748, y: 70.388 },
    },
    "line_3": {
        name: "RF to SS 1",
        positions: [
            { x: 62.06, y: 80.288 },
            { x: 53.398, y: 76.807 },
        ],
        midpoint: { x: 58.507, y: 77.349 },
    },
    "line_4": {
        name: "RF to SS 2",
        positions: [
            { x: 61.612, y: 98.54 },
            { x: 36.964, y: 98.462 },
        ],
        midpoint: { x: 51.043, y: 103.644 },
    },
    "line_5": {
        name: "EV to PB 1",
        positions: [
            { x: 64.8, y: 37.6 },
            { x: 83.1, y: 38.5 },
        ],
        midpoint: { x: 77.9, y: 25 },
    },
    "line_6": {
        name: "EV to PB 2",
        positions: [
            { x: 74.1, y: 32 },
            { x: 80.59, y: 32.8 },
        ],
        midpoint: { x: 77.85, y: 30 },
    },
};
