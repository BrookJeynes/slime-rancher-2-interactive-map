import { PlannerPosition, Vec2 } from "../types";

// Top to bottom, left to right.
export const planner_positions: { [key: string]: { [key: string]: PlannerPosition } } = {
    conservatory: {
        1: {
            position: { x: 37.45, y: -11.54 } as Vec2,
        }, 
        2: {
            position: { x: 37.45, y: -10.01 } as Vec2,
        },
        3: {
            position: { x: 33.85, y: -10.06 } as Vec2,
        },
        4: {
            position: { x: 32.61, y: -11.57 } as Vec2,
        },
        5: {
            position: { x: 32.61, y: -10.06 } as Vec2,
        },
        6: {
            position: { x: 32.61, y: -8.55 } as Vec2,
        },
        7: {
            position: { x: 33.85, y: -5.59 } as Vec2,
        },
        8: {
            position: { x: 32.61, y: -5.59 } as Vec2,
        },
    },
    gully: {
        1: {
            position: { x: 48.85, y: -4.01 } as Vec2,
        },
        2: {
            position: { x: 47.46, y: -7.39 } as Vec2,
        },
        3: {
            position: { x: 47.46, y: -5.07 } as Vec2,
        },
        4: {
            position: { x: 47.21, y: -1.83 } as Vec2,
        },
        5: {
            position: { x: 44.70, y: -3.93 } as Vec2,
        },
    },
    tidepools: {
        1: {
            position: { x: 49.68, y: 6.75 } as Vec2,
        },
        2: {
            position: { x: 49.48, y: 9.96 } as Vec2,
        },
        3: {
            position: { x: 47.35, y: 8.65 } as Vec2,
        },
        4: {
            position: { x: 47.35, y: 10.46 } as Vec2,
        },
        5: {
            position: { x: 45.69, y: 10.00 } as Vec2,
        },
    },
    archway: {
        1: {
            position: { x: 35.90, y: 10.12 } as Vec2,
        },
        2: {
            position: { x: 35.21, y: 12.08 } as Vec2,
        },
        3: {
            position: { x: 34.13, y: 13.79 } as Vec2,
        },
        4: {
            position: { x: 32.66, y: 13.35 } as Vec2,
        },
        5: {
            position: { x: 33.31, y: 8.87 } as Vec2,
        },
    },
    den: {
        1: {
            position: { x: 21.18, y: -2.42 } as Vec2,
        },
        2: {
            position: { x: 21.82, y: -0.90 } as Vec2,
        },
        3: {
            position: { x: 19.18, y: -1.42 } as Vec2,
        },
        4: {
            position: { x: 19.14, y: 0.24 } as Vec2,
        },
        5: {
            position: { x: 19.74, y: 2.42 } as Vec2,
        },
    },
    digsite: {
        1: {
            position: { x: 12.45, y: -4.38 } as Vec2,
        },
        2: {
            position: { x: 7.42, y: -4.80 } as Vec2,
        },
        3: {
            position: { x: 5.85, y: -4.64 } as Vec2,
        },
        4: {
            position: { x: 4.24, y: -3.37 } as Vec2,
        },
    },
};
