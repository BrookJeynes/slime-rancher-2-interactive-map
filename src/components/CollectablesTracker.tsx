import { useContext } from "react";

import { gordos } from "../data/gordos";
import { locked_doors } from "../data/locked_doors";
import { map_nodes } from "../data/map_nodes";
import { treasure_pods } from "../data/treasure_pods";
import { research_drones } from "../data/research_drones";

import { FoundContext } from "../FoundContext";

export default function CollectablesTracker() {
    const { found } = useContext(FoundContext);

    return (
        <div>
            <div className="flex flex-col pb-4">
                <h2 className="text-lg font-bold">Locations</h2>
                <span>Gordo Slimes {found.gordos.length} / {Object.keys(gordos).length}</span>
                <span>Locked Doors {found.locked_doors.length} / {Object.keys(locked_doors).length}</span>
            </div>
            <div className="flex flex-col">
                <h2 className="text-lg font-bold">Collectables</h2>
                <span>Map Nodes {found.map_nodes.length} / {Object.keys(map_nodes).length}</span>
                <span>Treasure Pods {found.treasure_pods.length} / {Object.keys(treasure_pods).length}</span>
                <span>Research Drones {found.research_drones.length} / {Object.keys(research_drones).length}</span>
            </div>
        </div>
    );
}
