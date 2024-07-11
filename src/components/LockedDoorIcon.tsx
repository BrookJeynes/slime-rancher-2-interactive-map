import { useContext, useEffect, useState } from "react";

import { Marker, Popup } from "react-leaflet"
import L from "leaflet";

import { LockedDoor } from "../types";
import { icon_template, icon_opacity, locked_door_ls_key } from "../globals";
import { locked_doors } from "../data/locked_doors";
import { handleChecked } from "../util";
import { FoundContext } from "../FoundContext";

export function LockedDoorIcon({ locked_door }: { locked_door: LockedDoor }) {
    const key = `${locked_door.name.toLowerCase().replace(" ", "")}${locked_door.pos.x}${locked_door.pos.y}`;
    const { found, setFound } = useContext(FoundContext);

    const [checked, setChecked] = useState(
        found.locked_doors ? found.locked_doors.some((k: string) => k === key) : false
    );

    useEffect(() => {
        if (checked) {
            setFound({
                ...found,
                locked_doors: [...found.locked_doors, key],
            });
        } else {
            setFound({
                ...found,
                locked_doors: [...found.locked_doors.filter((item: string) => item !== key)]
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    const icon = L.icon({
        ...icon_template,
        iconUrl: `/icons/plorts/${locked_door.image}`,
        className: `${checked && icon_opacity}`
    });

    return (
        <Marker key={key} position={[locked_door.pos.x, locked_door.pos.y]} icon={icon}>
            <Popup>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-5">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleChecked(locked_door_ls_key, key, checked, setChecked)}
                                className="w-4 h-4"
                            />
                            <h1 className="ml-2 text-xl font-medium">{locked_door.name}</h1>
                        </div>
                    </div>

                    <hr />

                    <div>
                        <span className="text-md font-bold">Plort Requirement: </span>
                        <span>{locked_door.plort}</span>
                    </div>

                    <div>
                        <span className="text-md font-bold">Description: </span>
                        <span>{locked_door.description}</span>
                    </div>

                    <div>
                        <span className="text-md font-bold">Unlocks: </span>
                        <span>{locked_door.unlocks}</span>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export const LockedDoorIcons = Object.values(locked_doors).map((locked_door: LockedDoor) => {
    return <LockedDoorIcon locked_door={locked_door} />;
})
