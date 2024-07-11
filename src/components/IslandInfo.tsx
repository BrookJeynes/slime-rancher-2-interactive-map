import { useState } from "react";

import { islands } from "../data/islands";

export default function IslandInfo() {
    const [selected_island, setSelectedIsland] = useState("Rainbow Fields");

    const island_names = [
        "Rainbow Fields",
        "Starlight Strand",
        "Ember Valley",
        "Powderfall Bluffs",
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between mb-5 md:items-center">
                <h2 className="text-lg font-bold">Island Info</h2>
                <select
                    value={selected_island}
                    onChange={event => setSelectedIsland(event.target.value)}
                    className="bg-transparent outline outline-1 p-1"
                >
                    {island_names.map((type: string) => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>

            <div className="flex flex-col mb-5">
                <h3 className="text-md font-bold mb-2">Slimes</h3>
                <div className="flex flex-wrap gap-2">
                    {
                        islands[selected_island].slimes.map(slime => {
                            return <img
                                src={`icons/slimes/${slime}`}
                                alt={`${slime} pin icon`}
                                style={{ width: 40 }}
                            />
                        })
                    }
                </div>
            </div>

            <div className="flex flex-col mb-5">
                <h3 className="text-md font-bold mb-2">Resources</h3>
                <div className="flex flex-wrap gap-2">
                    {
                        islands[selected_island].resources.map(resource => {
                            return <img
                                src={`icons/resources/${resource}`}
                                alt={`${resource} pin icon`}
                                style={{ width: 40 }}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    );
}
