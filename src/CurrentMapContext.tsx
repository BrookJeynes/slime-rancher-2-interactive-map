import React, { createContext, useState } from "react";

export enum MapType {
    overworld = "map_overworld",
    labyrinth = "map_labyrinth",
}

export const CurrentMapContext: React.Context<{
    current_map: MapType,
    setCurrentMap: React.Dispatch<React.SetStateAction<MapType>>
}> = createContext({
    current_map: MapType.overworld as MapType,
    setCurrentMap: {} as React.Dispatch<React.SetStateAction<MapType>>,
});

export function CurrentMapProvider({ children }: { children: React.ReactNode }) {
    const [current_map, setCurrentMap] = useState<MapType>(MapType.overworld);

    return (
        <CurrentMapContext.Provider value={{ current_map: current_map, setCurrentMap: setCurrentMap }}>
            {children}
        </CurrentMapContext.Provider>
    );
}
