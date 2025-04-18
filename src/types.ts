import { MapType } from "./CurrentMapContext";

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
    dimension: MapType;
}

export interface LockedDoor {
    name: string;
    plort: string;
    pos: Vec2;
    image: string
    description: string;
    unlocks: string;
    dimension: MapType;
}

export interface MapNode {
    name: string;
    pos: Vec2;
    description: string;
    dimension: MapType;
}

export interface TreasurePod {
    contents: string[];
    description: string;
    pos: Vec2;
    dimension: MapType;
}

export interface ResearchDrone {
    name: string;
    log: string[];
    archive: string[];
    pos: Vec2;
    description: string;
    dimension: MapType;
}

export interface TeleportLine {
    name: string;
    positions: Vec2[];
    midpoint: Vec2;
}

export interface Resource {
    name: string;
    type: string;
}

export interface PlotOptions extends Pin {
    optionsA?: Pin[];
    optionsAName?: string;
    optionsB?: Pin[];
    optionsBName?: string;
    upgrades: string[];
}

export type PinTitle = "Food" | "Utility" | "Plorts" | "Slimes" | "Gordos" | "Resources";
export interface Pins {
    Food: Pin[];
    Utility: Pin[];
    Plorts: Pin[];
    Slimes: Pin[];
    Gordos: Pin[];
    Resources: Pin[];
}

// Fields must match those found in `globals` / localstorage, e.g. gordo_ls_key
export interface UserData {
    found_gordos: string[];
    found_locked_doors: string[];
    found_map_nodes: string[];
    found_research_drones: string[];
    found_treasure_pods: string[];
    found_stabilizing_gates: string[];
    found_shadow_doors: string[];
}

export interface Pin {
    name: string;
    type: string;
    icon: string;
}

export interface LocalStoragePin {
    icon: string;
    pos: Vec2;
    dimension: MapType;
}

export interface LocalStoragePlotPlan {
    selectedPlotType?: number;
    selectedOptionA?: number;
    selectedOptionB?: number;
    selectedUpgrades: number[];
}

export interface LocalStorageSitePlan {
    site: string;
    plotPlans: LocalStoragePlotPlan[];
}

export interface Island {
    resources: string[];
    slimes: string[];
}

export interface PlannerPosition {
    position: Vec2;
}

export interface PlannerIcon {
    name: string;
    icon: L.Icon<L.IconOptions>;
}

export interface PlannerIcons {
    left: PlannerIcon | null;
    right: PlannerIcon | null;
}

export interface StabilizingGate {
    position: Vec2;
    description: string;
}

export interface ShadowDoor {
    position: Vec2;
    description: string;
    amount_required: number;
    unlocks: string[];
}
