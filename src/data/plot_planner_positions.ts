import { PlannerPositions, Vec2 } from "../types";

// Top to bottom, left to right.
export const planner_positions: { [key: string]: { [key: string]: PlannerPositions } } = {
    digsite: {
        4: {
            left: { x: 4.24, y: -3.7 } as Vec2,
            right: { x: 4.24, y: -3 } as Vec2,
            center: { x: 4.24, y: -3.37 } as Vec2,
        }
    }
}
