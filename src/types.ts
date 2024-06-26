export interface Vec2 {
    x: number;
    y: number;
}

export interface Gordo {
    name: string;
    food: string;
    pos: Vec2;
    image: string
    drops: string[];
    description: string;
    unlocks: string[];
}

export interface LockedDoor {
    name: string;
    plort: string;
    pos: Vec2;
    image: string
    description: string;
    unlocks: string;
}

export interface MapNode {
    name: string;
    pos: Vec2;
    description: string;
}

export interface TreasurePod {
    contents: string[];
    description: string;
    pos: Vec2;
}

export interface ResearchDrone {
    name: string;
    log: string[];
    archive: string[];
    pos: Vec2;
    description: string;
}

export interface TeleportLine {
    name: string;
    positions: Vec2[];
    midpoint: Vec2;
}

// TODO: Could `type` be an enum?
export interface Pin {
    name: string;
    type: string;
    icon: string;
}

export interface LocalStoragePin {
    icon: string;
    pos: Vec2;
}

export interface Island {
    resources: string[];
    slimes: string[];
}
