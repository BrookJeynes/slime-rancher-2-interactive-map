import { useContext, useEffect, useState } from "react";

import { Marker, Popup } from "react-leaflet"
import L from "leaflet";

import { TreasurePod } from "../types";
import { icon_template, icon_opacity, treasure_pod_ls_key } from "../globals";
import { treasure_pods } from "../data/treasure_pods";
import { handleChecked } from "../util";
import { FoundContext } from "../FoundContext";

export function TreasurePodIcon({ treasure_pod }: { treasure_pod: TreasurePod }) {
    const key = `${treasure_pod.name.toLowerCase().replace(" ", "")}${treasure_pod.pos.x}${treasure_pod.pos.y}`;
    // @ts-ignore
    const { found, setFound } = useContext(FoundContext);

    const [checked, setChecked] = useState(
        found.treasure_pods ? found.treasure_pods.some((k: string) => k === key) : false
    );

    useEffect(() => {
        if (checked) {
            setFound({
                ...found,
                treasure_pods: [...found.treasure_pods, key],
            });
        } else {
            setFound({
                ...found,
                treasure_pods: [...found.treasure_pods.filter((item: string) => item !== key)]
            });
        }
    }, [checked]);

    const icon = L.icon({
        ...icon_template,
        iconUrl: "/icons/iconTreasurePod.png",
        className: `${checked && icon_opacity}`
    });

    return (
        <Marker key={key} position={[treasure_pod.pos.x, treasure_pod.pos.y]} icon={icon}>
            <Popup>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center gap-5">
                        <div className="my-1 flex items-center">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleChecked(treasure_pod_ls_key, key, checked, setChecked)}
                            />
                            <span className="ml-1 font-medium">{treasure_pod.name}</span>
                        </div>
                        {treasure_pod.required_items.length > 0 && <span>Required: {treasure_pod.required_items.map(item => <span>{item}, </span>)}</span>}
                    </div>

                    <hr />

                    <span className="mb-0.5 mt-2"><span className="font-bold">Contents:</span> {treasure_pod.contents}</span>

                    <span className="my-0.5"><span className="font-bold">Description:</span> {treasure_pod.description ? treasure_pod.description : "N/A"}</span>

                    <span className="my-0.5">
                        <span className="font-bold">Location: </span>
                        {treasure_pod.link && <a href={treasure_pod.link} target="_blank" rel="noreferrer noopener">Video showcase</a>}
                    </span>
                </div>
            </Popup>
        </Marker>
    )
}

export const TreasurePodIcons = Object.values(treasure_pods).map((treasure_pod: TreasurePod) => {
    return <TreasurePodIcon treasure_pod={treasure_pod} />;
})
