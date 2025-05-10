import React, { createContext, useState } from "react";

export enum MapType {
    overworld = "map_overworld",
    labyrinth = "map_labyrinth",
    sr1 = "map_sr1",
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

    const contextValue = React.useMemo(() => ({ current_map, setCurrentMap }), [current_map, setCurrentMap]);

    return (
        <CurrentMapContext.Provider value={contextValue}>
            {children}
        </CurrentMapContext.Provider>
    );
}
