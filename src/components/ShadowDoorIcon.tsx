import { Marker, Popup } from "react-leaflet";
import { icon_opacity, icon_template, shadow_door_ls_key } from "../globals";
import { useContext, useEffect, useState } from "react";
import { FoundContext } from "../FoundContext";
import L from "leaflet";
import { ShadowDoor } from "../types";
import { handleChecked } from "../util";
import { shadow_doors } from "../data/shadow_doors";

export function ShadowDoorIcon({
    shadow_door,
    key_name,
}: {
    shadow_door: ShadowDoor,
    key_name: string
}) {
    const { found, setFound } = useContext(FoundContext);
    const [checked, setChecked] = useState(
        found.shadow_doors ? found.shadow_doors.some((k: string) => k === key_name) : false
    );

    useEffect(() => {
        setChecked(found.shadow_doors ? found.shadow_doors.some((k: string) => k === key_name) : false);
    }, [found]);

    useEffect(() => {
        if (checked) {
            setFound({
                ...found,
                shadow_doors: [...found.shadow_doors, key_name],
            });
        } else {
            setFound({
                ...found,
                shadow_doors: [...found.shadow_doors.filter((item: string) => item !== key_name)]
            });
        }
    }, [checked]);

    const icon = L.icon({
        ...icon_template,
        iconUrl: "/icons/iconMapShadowPlortDoor.png",
        className: `${checked && icon_opacity}`
    });

    return (
        <Marker key={key_name} position={[shadow_door.position.x, shadow_door.position.y]} icon={icon}>
            <Popup>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-5">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleChecked(shadow_door_ls_key, key_name, checked, setChecked)}
                                className="w-4 h-4"
                            />
                            <h1 className="ml-2 text-xl font-medium">Shadow Plort Door</h1>
                        </div>
                    </div>

                    <hr />

                    <div>
                        <span className="text-md font-bold">Plort Requirement: </span>
                        <span>{shadow_door.amount_required}</span>
                    </div>

                    <div>
                        <span className="text-md font-bold">Description: </span>
                        <span>{shadow_door.description}</span>
                    </div>

                    <div>
                        <span className="text-md font-bold">Unlocks: </span>
                        <span>{shadow_door.unlocks}</span>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export const ShadowDoorIcons = Object.keys(shadow_doors).map(key => {
    const shadow_door = shadow_doors[key];
    return <ShadowDoorIcon key={key} key_name={key} shadow_door={shadow_door} />;
});
