import L from "leaflet";

import { PlannerIcons } from "../types";
import { icon_template } from "../globals";
import { pins } from "../data/pins";

enum Side {
    left,
    right,
}

export default function CorralPlanner({
    icons,
    setIcons
}: {
    icons: PlannerIcons,
    setIcons: React.Dispatch<React.SetStateAction<PlannerIcons>>
}) {
    function onChange(event: React.ChangeEvent<HTMLSelectElement>, side: Side) {
        const val = event.target.value;

        if (side === Side.left) {
            setIcons({
                ...icons,
                left: (val !== "Empty") ? {
                    name: val,
                    icon: L.icon({
                        ...icon_template,
                        iconUrl: `icons/slimes/iconSlime${val}.png`
                    }),
                } : null,
            })
        } else {
            setIcons({
                ...icons,
                right: (val !== "Empty") ? {
                    name: val,
                    icon: L.icon({
                        ...icon_template,
                        iconUrl: `icons/slimes/iconSlime${val}.png`
                    }),
                } : null,
            })
        }

    }

    return (
        <div className="flex justify-between">
            <div className="flex flex-col gap-1">
                <h2 className="ml-2 text-lg">Slime A</h2>
                <select
                    onChange={(e) => onChange(e, Side.left)}
                    className="bg-transparent outline outline-1 p-1"
                >
                    <option>Empty</option>
                    {pins.Slimes.map(slime => <option>{slime.name}</option>)}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <h2 className="ml-2 text-lg">Slime B</h2>
                <select
                    onChange={(e) => onChange(e, Side.right)}
                    className="bg-transparent outline outline-1 p-1"
                >
                    <option>Empty</option>
                    {pins.Slimes.map(slime => <option>{slime.name}</option>)}
                </select>
            </div>
        </div>
    );
}
