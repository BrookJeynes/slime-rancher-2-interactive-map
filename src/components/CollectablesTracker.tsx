import { CurrentMapContext, MapType } from "../CurrentMapContext";
import { FoundContext } from "../FoundContext";
import { gordos } from "../data/gordos";
import { locked_doors } from "../data/locked_doors";
import { map_nodes } from "../data/map_nodes";
import { research_drones } from "../data/research_drones";
import { shadow_doors } from "../data/shadow_doors";
import { stabilizing_gates } from "../data/stabilizing_gates";
import { treasure_pods } from "../data/treasure_pods";
import { useContext } from "react";

export default function CollectablesTracker() {
    const { current_map, setCurrentMap } = useContext(CurrentMapContext);
    const { found } = useContext(FoundContext);

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between pb-4">
                <div>
                    <span className="text-lg font-bold">Current Location: </span>
                    <span>{current_map === MapType.overworld ? "Overworld" : "Grey Labyrinth"}</span>
                </div>
            </div>
            <div className="flex flex-col pb-4">
                <h2 className="text-md font-bold">Locations</h2>
                <span>
                    Gordo Slimes {
                        found.gordos.filter(key =>
                            gordos[key]?.dimension === current_map ||
                            // This is required to maintain backwards compatibility
                            (gordos[key]?.dimension === undefined && current_map === MapType.overworld)
                        ).length
                    } / {
                        Object.values(gordos).filter(gordo => gordo.dimension === current_map).length
                    }
                </span>
                <span>
                    Locked Doors {
                        found.locked_doors.filter(key =>
                            locked_doors[key]?.dimension === current_map ||
                            // This is required to maintain backwards compatibility
                            (locked_doors[key]?.dimension === undefined && current_map === MapType.overworld)
                        ).length
                    } / {
                        Object.values(locked_doors).filter(locked_door => locked_door.dimension === current_map).length
                    }
                </span>
                {current_map === MapType.labyrinth && <span>
                    Shadow Doors {found.shadow_doors.length} / {Object.values(shadow_doors).length}
                </span>}
                {current_map === MapType.labyrinth && <span>
                    Stabilizing Gates {found.stabilizing_gates.length} / {Object.values(stabilizing_gates).length}
                </span>}
            </div>
            <div className="flex flex-col pb-4">
                <h2 className="text-md font-bold">Collectables</h2>
                <span>
                    Map Nodes {
                        found.map_nodes.filter(key =>
                            map_nodes[key]?.dimension === current_map ||
                            // This is required to maintain backwards compatibility
                            (map_nodes[key]?.dimension === undefined && current_map === MapType.overworld)
                        ).length
                    } / {
                        Object.values(map_nodes).filter(map_node => map_node.dimension === current_map).length
                    }
                </span>
                <span>
                    Treasure Pods {
                        found.treasure_pods.filter(key =>
                            treasure_pods[key]?.dimension === current_map ||
                            // This is required to maintain backwards compatibility
                            (treasure_pods[key]?.dimension === undefined && current_map === MapType.overworld)
                        ).length
                    } / {
                        Object.values(treasure_pods).filter(treasure_pod => treasure_pod.dimension === current_map).length
                    }
                </span>
                <span>
                    Research Drones {
                        found.research_drones.filter(key =>
                            research_drones[key]?.dimension === current_map ||
                            // This is required to maintain backwards compatibility
                            (research_drones[key]?.dimension === undefined && current_map === MapType.overworld)
                        ).length
                    } / {
                        Object.values(research_drones).filter(research_drone => research_drone.dimension === current_map).length
                    }
                </span>
            </div>

            <button
                className="bg-btn outline outline-1 p-1 mt-3 w-full"
                onClick={() => {
                    if (current_map === MapType.overworld) {
                        setCurrentMap(MapType.labyrinth);
                    } else {
                        setCurrentMap(MapType.overworld);
                    }
                }}>
                Change Map
            </button>
            <button
                className="bg-btn outline outline-1 p-1 mt-3 w-full"
                onClick={() => {
                    if (current_map === MapType.overworld || current_map === MapType.labyrinth) {
                        setCurrentMap(MapType.sr1);
                    } else {
                        setCurrentMap(MapType.overworld);
                    }
                }}>
                Switch Game
            </button>
            
        </div>
    );
}
