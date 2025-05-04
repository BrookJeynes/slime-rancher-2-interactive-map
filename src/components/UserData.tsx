import {
    gordo_ls_key,
    locked_door_ls_key,
    map_node_ls_key,
    research_drone_ls_key,
    shadow_door_ls_key,
    stabilizing_gate_ls_key,
    treasure_pod_ls_key
} from "../globals";
import { useContext, useEffect } from "react";
import { FoundContext } from "../FoundContext";
import { UserData } from "../types";

export function ExportUserDataButton() {
    const { found } = useContext(FoundContext);

    const gordos = localStorage.getItem(gordo_ls_key) ?? "[]";
    const locked_doors = localStorage.getItem(locked_door_ls_key) ?? "[]";
    const map_nodes = localStorage.getItem(map_node_ls_key) ?? "[]";
    const treasure_pods = localStorage.getItem(treasure_pod_ls_key) ?? "[]";
    const research_drones = localStorage.getItem(research_drone_ls_key) ?? "[]";
    const stabilizing_gates = localStorage.getItem(stabilizing_gate_ls_key) ?? "[]";
    const shadow_doors = localStorage.getItem(shadow_door_ls_key) ?? "[]";

    let found_data: UserData = {
        found_gordos: JSON.parse(gordos),
        found_locked_doors: JSON.parse(locked_doors),
        found_map_nodes: JSON.parse(map_nodes),
        found_treasure_pods: JSON.parse(treasure_pods),
        found_research_drones: JSON.parse(research_drones),
        found_stabilizing_gates: JSON.parse(stabilizing_gates),
        found_shadow_doors: JSON.parse(shadow_doors),
    };

    useEffect(() => {
        const gordos = localStorage.getItem(gordo_ls_key) ?? "[]";
        const locked_doors = localStorage.getItem(locked_door_ls_key) ?? "[]";
        const map_nodes = localStorage.getItem(map_node_ls_key) ?? "[]";
        const treasure_pods = localStorage.getItem(treasure_pod_ls_key) ?? "[]";
        const research_drones = localStorage.getItem(research_drone_ls_key) ?? "[]";
        const stabilizing_gates = localStorage.getItem(stabilizing_gate_ls_key) ?? "[]";
        const shadow_doors = localStorage.getItem(shadow_door_ls_key) ?? "[]";

        found_data = {
            found_gordos: JSON.parse(gordos),
            found_locked_doors: JSON.parse(locked_doors),
            found_map_nodes: JSON.parse(map_nodes),
            found_treasure_pods: JSON.parse(treasure_pods),
            found_research_drones: JSON.parse(research_drones),
            found_stabilizing_gates: JSON.parse(stabilizing_gates),
            found_shadow_doors: JSON.parse(shadow_doors),
        } as UserData;
    }, [found]);

    const found_json_file = new Blob([JSON.stringify(found_data)], { type: "application/json" });

    return (
        <button className="bg-btn w-full outline outline-1 p-1">
            <a
                download="found_data.json"
                target="_blank"
                rel="noreferrer"
                href={URL.createObjectURL(found_json_file)}
            >
                Export Found Data
            </a>
        </button>
    );
}

export function ImportUserDataButton() {
    const { found, setFound } = useContext(FoundContext);
    return (
        <label
            htmlFor="found_data_upload"
            className="flex justify-center items-center w-full cursor-pointer bg-btn outline outline-1 p-1 text-center"
        >
            <span>Import Found Data</span>
            <input
                type="file"
                accept=".json"
                id="found_data_upload"
                className="hidden"
                onChange={(event) => {
                    const file = (event.target.files ?? [])[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const found_data_json = e.target?.result as string;
                        if (window.confirm("This will overwrite your current found data. Are you sure you want to continue?")) {
                            try {
                                const parsed_found_data = JSON.parse(found_data_json);
                                const temp_found = { ...found };

                                for (const key of Object.keys(parsed_found_data)) {
                                    const data = parsed_found_data[key];
                                    switch (key) {
                                        case gordo_ls_key:
                                        case locked_door_ls_key:
                                        case map_node_ls_key:
                                        case research_drone_ls_key:
                                        case treasure_pod_ls_key:
                                        case stabilizing_gate_ls_key:
                                        case shadow_door_ls_key:
                                            break;
                                        default:
                                            console.error(`error: invalid key '${key}' for found items.`);
                                            continue;
                                    }

                                    if (!Array.isArray(data)) {
                                        console.error("error: invalid gordo key format - not an array.");
                                        continue;
                                    }

                                    localStorage.setItem(key, JSON.stringify(data));

                                    switch (key) {
                                        case gordo_ls_key:
                                            temp_found.gordos = data;
                                            break;
                                        case locked_door_ls_key:
                                            temp_found.locked_doors = data;
                                            break;
                                        case map_node_ls_key:
                                            temp_found.map_nodes = data;
                                            break;
                                        case research_drone_ls_key:
                                            temp_found.research_drones = data;
                                            break;
                                        case treasure_pod_ls_key:
                                            temp_found.treasure_pods = data;
                                            break;
                                        case stabilizing_gate_ls_key:
                                            temp_found.stabilizing_gates = data;
                                            break;
                                        case shadow_door_ls_key:
                                            temp_found.shadow_doors = data;
                                            break;
                                    }

                                    setFound(temp_found);
                                }
                            } catch (err) {
                                console.error(`error: failed to parse found data JSON file - ${err}`);
                                window.alert("Failed to parse found data. Please ensure you uploaded a properly formed JSON file.");
                            }
                        }
                    };
                    reader.onerror = () => {
                        console.error("error: failed to read user pins.");
                    };

                    reader.readAsText(file);
                }}
            />
        </label>
    );
}
