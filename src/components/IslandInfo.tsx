import { islands } from "../data/islands";
import { useState } from "react";

export default function IslandInfo() {
    const [selected_island, setSelectedIsland] = useState("Rainbow Fields");

    const island_names_sr2 = [
        "Rainbow Fields",
        "Starlight Strand",
        "Ember Valley",
        "Powderfall Bluffs",
        "Grey Labyrinth",
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between mb-5 md:items-center">
                <h2 className="text-lg font-bold">Island Info</h2>
                <select
                    value={selected_island}
                    onChange={event => setSelectedIsland(event.target.value)}
                    className="cursor-pointer bg-btn outline outline-1 p-1"
                >
                    {island_names_sr2.map((type: string) => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>

            <div className="flex flex-col mb-5">
                <h3 className="text-md font-bold mb-2">Slimes</h3>
                <div className="flex flex-wrap gap-2">
                    {
                        islands[selected_island].slimes.map(slime => {
                            const key = `${slime} pin icon`;
                            return <img
                                key={key}
                                src={`icons/slimes/${slime}`}
                                alt={key}
                                style={{ width: 40 }}
                            />;
                        })
                    }
                </div>
            </div>

            <div className="flex flex-col mb-5">
                <h3 className="text-md font-bold mb-2">Resources</h3>
                <div className="flex flex-wrap gap-2">
                    {
                        islands[selected_island].resources.map(resource => {
                            const key = `${resource} pin icon`;
                            return <img
                                key={key}
                                src={`icons/resources/${resource}`}
                                alt={key}
                                style={{ width: 40 }}
                            />;
                        })
                    }
                </div>
            </div>
        </div>
    );
}
