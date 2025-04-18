import { Marker, Popup } from "react-leaflet";
import { icon_opacity, icon_template, treasure_pod_ls_key } from "../globals";
import { useContext, useEffect, useState } from "react";
import { FoundContext } from "../FoundContext";
import L from "leaflet";
import { MapType } from "../CurrentMapContext";
import { TreasurePod } from "../types";
import { handleChecked } from "../util";
import { treasure_pods } from "../data/treasure_pods";

export function TreasurePodIcon({ treasure_pod, keyName }: { treasure_pod: TreasurePod, keyName: string }) {
    const deprecatedKey = `treasurepod${treasure_pod.pos.x}${treasure_pod.pos.y}`;
    const { found, setFound } = useContext(FoundContext);
    const [checked, setChecked] = useState(
        found.treasure_pods ? found.treasure_pods.some((k: string) => k === keyName || k === deprecatedKey) : false
    );

    useEffect(() => {
        setChecked(found.treasure_pods ? found.treasure_pods.some((k: string) => k === keyName || k === deprecatedKey) : false);
    }, [found]);

    useEffect(() => {
        if (checked) {
            setFound({
                ...found,
                treasure_pods: [...found.treasure_pods, keyName],
            });
        } else {
            setFound({
                ...found,
                treasure_pods: [...found.treasure_pods.filter((item: string) => item !== keyName && item !== deprecatedKey)],
            });
        }
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
                                onChange={() => handleChecked(treasure_pod_ls_key, keyName, checked, setChecked, deprecatedKey)}
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

export function TreasurePodIcons(current_map: MapType) {
    return Object.keys(treasure_pods).filter((keyName) => {
        return treasure_pods[keyName].dimension === current_map;
    }).map((keyName) => {
        const treasure_pod = treasure_pods[keyName];
        return <TreasurePodIcon key={keyName} treasure_pod={treasure_pod} keyName={keyName} />;
    });
}
