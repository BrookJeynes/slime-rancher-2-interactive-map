import { CurrentMapContext, MapType } from "../CurrentMapContext";
import { islands_sr1, islands_sr2, sr1_common_resources } from "../data/islands";
import { useContext, useEffect, useState } from "react";

const imgStyle = {
    width: 40,
    height: 40
};

export default function IslandInfo() {
    const { current_map } = useContext(CurrentMapContext);

    const island_names_sr2 = [
        "Rainbow Fields",
        "Starlight Strand",
        "Ember Valley",
        "Powderfall Bluffs",
        "Grey Labyrinth",
    ];

    const island_names_sr1 = [
        "The Dry Reef",
        "The Moss Blanket",
        "The Indigo Quarry",
        "The Ancient Ruins",
        "The Glass Desert"
    ];

    const [current_islands, setCurrentIslands] = useState(current_map === MapType.sr1 ? island_names_sr1 : island_names_sr2);
    const [current_island, setCurrentIsland] = useState(current_map === MapType.sr1 ? islands_sr1 : islands_sr2);
    const [selected_island, setSelectedIsland] = useState(current_islands[0]);

    useEffect(() => {
        if (current_map === MapType.sr1) {
            setCurrentIslands(island_names_sr1);
            setCurrentIsland(islands_sr1);
            setSelectedIsland(island_names_sr1[0]); 
        } else {
            setCurrentIslands(island_names_sr2);
            setCurrentIsland(islands_sr2);
            setSelectedIsland(island_names_sr2[0]);
        }
    }, [current_map]);

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between mb-5 md:items-center">
                <h2 className="text-lg font-bold">Island Info</h2>
                <select
                    value={selected_island}
                    onChange={event => setSelectedIsland(event.target.value)}
                    className="cursor-pointer bg-btn outline outline-1 p-1"
                >
                    {current_islands.map((type: string) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col mb-5">
                <h3 className="text-md font-bold mb-2">Slimes</h3>
                <div className="flex flex-wrap gap-2">
                    {
                        current_island[selected_island]?.slimes?.map(slime => {
                            const key = `${slime} pin icon`;
                            return <img
                                key={key}
                                src={`/${current_map === MapType.sr1 ? "icons_sr1" : "icons"}/slimes/${slime}`}
                                alt={key}
                                style={imgStyle}
                            />;
                        }) || <p>No slimes available for this island.</p>
                    }
                </div>
            </div>

            <div className="flex flex-col mb-5">
                <h3 className="text-md font-bold mb-2">Resources</h3>
                <div className="flex flex-wrap gap-2">
                    {
                        current_island[selected_island]?.resources?.concat(current_map === MapType.sr1 ? sr1_common_resources : []).map(resource => {
                            const key = `${resource} pin icon`;
                            return <img
                                key={key}
                                src={`/${current_map === MapType.sr1 ? "icons_sr1" : "icons"}/resources/${resource}`}
                                alt={key}
                                style={imgStyle}
                            />;
                        }) || <p>No resources available for this island.</p>
                    }
                </div>
            </div>
            <div className="flex flex-col mb-5">
                <h3 className="text-md font-bold mb-2">Resources</h3>
                <div className="flex flex-wrap gap-2">
                    {
                        current_island[selected_island]?.food?.map(food => {
                            const key = `${food} pin icon`;
                            return <img
                                key={key}
                                src={`/${current_map === MapType.sr1 ? "icons_sr1" : "icons"}/foods/${food}`}
                                alt={key}
                                style={imgStyle}
                            />;
                        }) || <p>No food available for this island.</p>
                    }
                </div>
            </div>
        </div>
    );
}
