import { TeleportLine } from "../types";

export const teleport_lines: { [key: string]: TeleportLine } = {
    "line_1": {
        name: "RF to EV 1",
        positions: [
            { x: 65.20, y: 96.85 },
            { x: 68.49, y: 74.73 },
        ],
        midpoint: { x: 67, y: 90 },
    },
    "line_2": {
        name: "RF to EV 2",
        positions: [
            { x: 68.39, y: 112.91 },
            { x: 77.36, y: 45.12 },
        ],
        midpoint: { x: 75, y: 90.388 },
    },
    "line_3": {
        name: "RF to SS 1",
        positions: [
            { x: 58.63, y: 97.94 },
            { x: 45.48, y: 91.97 },
        ],
        midpoint: { x: 54, y: 92 },
    },
    "line_4": {
        name: "RF to SS 2",
        positions: [
            { x: 58.19, y: 117.03 },
            { x: 20.65, y: 119.82 },
        ],
        midpoint: { x: 40, y: 115 },
    },
    "line_5": {
        name: "EV to PB 1",
        positions: [
            { x: 60.85, y: 41.19 },
            { x: 83.13, y: 43.27 },
        ],
        midpoint: { x: 77.9, y: 25 },
    },
    "line_6": {
        name: "EV to PB 2",
        positions: [
            { x: 75.44, y: 34.42 },
            { x: 80.49, y: 37.28 },
        ],
        midpoint: { x: 78.5, y: 34 },
    },
};
