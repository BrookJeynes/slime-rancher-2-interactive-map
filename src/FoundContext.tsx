import { createContext, useState } from "react";
import { gordo_ls_key, locked_door_ls_key, map_node_ls_key, research_drone_ls_key, treasure_pod_ls_key } from "./globals";

export interface Found {
    gordos: string[];
    locked_doors: string[];
    map_nodes: string[];
    treasure_pods: string[];
    research_drones: string[];
}

export const FoundContext: React.Context<{ found: Found, setFound: React.Dispatch<React.SetStateAction<Found>> }> = createContext({
    found: {
        gordos: [],
        locked_doors: [],
        map_nodes: [],
        treasure_pods: [],
        research_drones: [],
    } as Found,
    setFound: {} as React.Dispatch<React.SetStateAction<Found>>,
});

export function FoundProvider({ children }: { children: React.ReactNode }) {
    const [found, setFound] = useState<Found>({
        gordos: JSON.parse(localStorage.getItem(gordo_ls_key) ?? "[]") ?? [],
        locked_doors: JSON.parse(localStorage.getItem(locked_door_ls_key) ?? "[]") ?? [],
        map_nodes: JSON.parse(localStorage.getItem(map_node_ls_key) ?? "[]") ?? [],
        treasure_pods: JSON.parse(localStorage.getItem(treasure_pod_ls_key) ?? "[]") ?? [],
        research_drones: JSON.parse(localStorage.getItem(research_drone_ls_key) ?? "[]") ?? [],
    });

    return (
        <FoundContext.Provider value={{ found, setFound }}>
            {children}
        </FoundContext.Provider>
    );
}
