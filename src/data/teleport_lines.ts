import { TeleportLine } from "../types";

export const teleport_lines: { [key: string]: TeleportLine } = {
    "line_1": {
        name: "RF to EV 1",
        positions: [
            { x: 39.77, y: -52.33 },
            { x: 48.61, y: -81.36 },
        ],
        midpoint: { x: 46, y: -65 },
    },
    "line_2": {
        name: "RF to EV 2",
        positions: [
            { x: 48.31, y: -31.13 },
            { x: 70.49, y: -120.65 },
        ],
        midpoint: { x: 65, y: -70 },
    },
    "line_3": {
        name: "RF to SS 1",
        positions: [
            { x: 22.26, y: -50.91 },
            { x: -8.71, y: -58.82 },
        ],
        midpoint: { x: 10, y: -55 },
    },
    "line_4": {
        name: "RF to SS 2",
        positions: [
            { x: 21.14, y: -25.7 },
            { x: -46.48, y: -21.97 },
        ],
        midpoint: { x: -10, y: -21 },
    },
    "line_5": {
        name: "EV to PB 1",
        positions: [
            { x: 77.13, y: -130.84 },
            { x: 66.08, y: -134.67 },
        ],
        midpoint: { x: 72, y: -130 },
    },
    "line_6": {
        name: "EV to PB 2",
        positions: [
            { x: 82.0, y: -122.95 },
            { x: 28.32, y: -126.27 },
        ],
        midpoint: { x: 68, y: -150 },
    },
};
