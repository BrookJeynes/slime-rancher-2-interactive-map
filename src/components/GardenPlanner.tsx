import L from "leaflet";

import { PlannerIcons } from "../types";
import { icon_template } from "../globals";
import { pins } from "../data/pins";

export default function GardenPlanner({
    icons,
    setIcons
}: {
    icons: PlannerIcons,
    setIcons: React.Dispatch<React.SetStateAction<PlannerIcons>>
}) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <select
                    onChange={(e) => {
                        const val = e.target.value;

                        setIcons({
                            ...icons,
                            left: (val !== "Empty") ? {
                                name: val,
                                icon: L.icon({
                                    ...icon_template,
                                    iconUrl: `icons/${pins.Food.find((food) => food.name === val)!.icon}`
                                }),
                            } : null,
                        })
                    }}
                    className="bg-transparent outline outline-1 p-1"
                >
                    <option>Empty</option>
                    {pins.Food.map(food => <option>{food.name}</option>)}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <div>
                    <input type="checkbox" name="Nutrient Soil (350)" />
                    <label className="ml-2">Nutrient Soil (350)</label>
                </div>
                <div>
                    <input type="checkbox" name="Sprinkler (500)" />
                    <label className="ml-2">Sprinkler (500)</label>
                </div>
                <div>
                    <input type="checkbox" name="Scareslime (425)" />
                    <label className="ml-2">Scareslime (425)</label>
                </div>
            </div>
        </div>
    );
}
