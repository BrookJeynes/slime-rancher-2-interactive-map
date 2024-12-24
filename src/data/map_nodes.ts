import { MapNode } from "../types";
import { MapType } from "../CurrentMapContext";

export const map_nodes: { [key: string]: MapNode } = {
    // TODO(24-12-24): These keys should be how the other data keys are, 
    // e.g. rainbowfields_1, greylabyrinth_1, etc...
    "Rainbow Fields Southern": {
        name: "Southern Node",
        pos: { x: 26.78, y: -38.93 },
        description: "Next to a big rock near the edge of a ledge over the water.",
        dimension: MapType.overworld,
    },
    "Rainbow Fields Western": {
        name: "Western Node",
        pos: { x: 32.26, y: -46.27 },
        description: "Near the edge of the top of a cliff.",
        dimension: MapType.overworld,
    },
    "Ember Valley North": {
        name: "North Node",
        pos: { x: 64.97, y: -119.17 },
        description: "On a ledge overlooking a pit and a pond across from a waterfall.",
        dimension: MapType.overworld,
    },
    "Ember Valley Center": {
        name: "Center Node",
        pos: { x: 55.26, y: -106.67 },
        description: "On a ledge up a cliff in front of a large fossilized shell.",
        dimension: MapType.overworld,
    },
    "Ember Valley West": {
        name: "West Node",
        pos: { x: 48.56, y: -140.49 },
        description: "On top of a plateau above the lava",
        dimension: MapType.overworld,
    },
    "Starlight Strand North": {
        name: "North Node",
        pos: { x: 2.46, y: -58.84 },
        description: "On the edge of a high ledge on an island.",
        dimension: MapType.overworld,
    },
    "Starlight Strand Center": {
        name: "Center Node",
        pos: { x: -24.86, y: -40.34 },
        description: "On a ledge next to a rock.",
        dimension: MapType.overworld,
    },
    "Starlight Strand South": {
        name: "South Node",
        pos: { x: -54.63, y: -30.2 },
        description: "On top of a ruin ledge between two ruin walls.",
        dimension: MapType.overworld,
    },
    "Powderfall Bluffs West": {
        name: "West Node",
        pos: { x: 82.62, y: -140.6 },
        description: "On a grass ledge near some trees over the water.",
        dimension: MapType.overworld,
    },
    "Powderfall Bluffs East": {
        name: "East Node",
        pos: { x: 80.73, y: -117.35 },
        description: "On an ice cube next to a patch of deep snow.",
        dimension: MapType.overworld,
    },
    "Grey Labyrinth Dream Land": {
        name: "Grey Labyrinth Dream Land Node",
        pos: { x: 67.2, y: -111.8 },
        description: "South of the Sloomber Gordo located on the edge of the cliff.",
        dimension: MapType.labyrinth,
    },
    "Grey Labyrinth West": {
        name: "Grey Labyrinth West Node",
        pos: { x: 6.1, y: -135.5 },
        description: "Located directly next to the nearby Shadow Plort Door, at the end of the hedge maze.",
        dimension: MapType.labyrinth,
    },
    "Grey Labyrinth Aquarium": {
        name: "Grey Labyrinth Aquarium Node",
        pos: { x: -49.1, y: -61.1 },
        description: "Right above the Batty Plort Statue in the room with the large glass tower.",
        dimension: MapType.labyrinth,
    },
    "Grey Labyrinth Prismacore Surroundings": {
        name: "Grey Labyrinth Prismacore Surroundings Node",
        pos: { x: -15.4, y: -32.5 },
        description: "Inside of the grey tower with many water spouts.",
        dimension: MapType.labyrinth,
    },
    "Grey Labyrinth Lava": {
        name: "Grey Labyrinth Lava Node",
        pos: { x: -17.9, y: 13.7 },
        description: "Located inside the hallway locked by Plort Doors. Use the surrounding Rock Plort Statues to access it.",
        dimension: MapType.labyrinth,
    },
};
