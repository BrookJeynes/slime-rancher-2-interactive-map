import { useContext, useEffect, useState } from "react";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { TreasurePod } from "../types";
import { icon_template, icon_opacity, treasure_pod_ls_key } from "../globals";
import { treasure_pods } from "../data/treasure_pods";
import { handleChecked } from "../util";
import { FoundContext } from "../FoundContext";

export function TreasurePodIcon({ treasure_pod, keyName }: { treasure_pod: TreasurePod, keyName: string }) {
    const { found, setFound } = useContext(FoundContext);

    const [checked, setChecked] = useState(
        found.treasure_pods ? found.treasure_pods.some((k: string) => k === keyName) : false
    );

    useEffect(() => {
        if (checked) {
            setFound({
                ...found,
                treasure_pods: [...found.treasure_pods, keyName],
            });
        } else {
            setFound({
                ...found,
                treasure_pods: [...found.treasure_pods.filter((item: string) => item !== keyName)],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    const icon = L.icon({
        ...icon_template,
        iconUrl: "/icons/iconTreasurePod.png",
        className: `${checked && icon_opacity}`,
    });

    return (
        <Marker key={keyName} position={[treasure_pod.pos.x, treasure_pod.pos.y]} icon={icon}>
            <Popup>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-5">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleChecked(treasure_pod_ls_key, keyName, checked, setChecked)}
                                className="w-4 h-4"
                            />
                            <h1 className="ml-2 text-xl font-medium">Treasure Pod</h1>
                        </div>
                    </div>

                    <hr />

                    <span className="my-0.5"><span className="font-bold">Description:</span> {treasure_pod.description ? treasure_pod.description : "N/A"}</span>

                    <div>
                        <h2 className="text-md font-bold">Contents:</h2>
                        <ul>
                            {treasure_pod.contents.map(content => {
                                return <li className="list-disc ml-5" key={content}>{content}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export const TreasurePodIcons = Object.keys(treasure_pods).map((keyName) => {
    const treasure_pod = treasure_pods[keyName];
    return <TreasurePodIcon key={keyName} treasure_pod={treasure_pod} keyName={keyName} />;
});
