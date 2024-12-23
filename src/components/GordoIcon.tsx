import { Marker, Popup } from "react-leaflet";
import { gordo_ls_key, icon_opacity, icon_template } from "../globals";
import { useContext, useEffect, useState } from "react";
import { FoundContext } from "../FoundContext";
import { Gordo } from "../types";
import L from "leaflet";
import { gordos } from "../data/gordos";
import { handleChecked } from "../util";

export function GordoIcon({ gordo, keyName }: { gordo: Gordo, keyName: string }) {
    const deprecatedKey = `${gordo.name.toLowerCase().replace(" ", "")}${gordo.pos.x}${gordo.pos.y}`;
    const { found, setFound } = useContext(FoundContext);
    const [checked, setChecked] = useState(
        found.gordos ? found.gordos.some((k: string) => k === keyName || k === deprecatedKey) : false
    );

    useEffect(() => {
        if (checked) {
            setFound({
                ...found,
                gordos: [...found.gordos, keyName],
            });
        } else {
            setFound({
                ...found,
                gordos: [...found.gordos.filter((item: string) => item !== keyName && item !== deprecatedKey)]
            });
        }
    }, [checked]);

    const icon = L.icon({
        ...icon_template,
        iconUrl: `/icons/gordos/${gordo.image}`,
        className: `${checked && icon_opacity}`
    });

    return (
        <Marker key={keyName} position={[gordo.pos.x, gordo.pos.y]} icon={icon}>
            <Popup>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-5">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleChecked(gordo_ls_key, keyName, checked, setChecked, deprecatedKey)}
                                className="w-4 h-4"
                            />
                            <h1 className="ml-2 text-xl font-medium">{gordo.name}</h1>
                        </div>
                    </div>

                    <hr />

                    <div>
                        <span className="text-md font-bold">Food Requirement: </span>
                        <span>{gordo.food}</span>
                    </div>

                    <div>
                        <span className="text-md font-bold">Description: </span>
                        <span>{gordo.description}</span>
                    </div>

                    <div>
                        <h2 className="text-md font-bold">Drops:</h2>
                        <ul>
                            {gordo.drops.map(drop => {
                                const key = `${keyName}${drop}`;
                                return <li key={key} className="list-disc ml-5">{drop}</li>;
                            })}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-md font-bold">Unlocks:</h2>
                        <ul>
                            {gordo.unlocks.map(unlock => {
                                const key = `${keyName}${unlock}`;
                                return <li key={key} className="list-disc ml-5">{unlock}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export const GordoIcons = Object.keys(gordos).map((keyName) => {
    const gordo = gordos[keyName];
    return <GordoIcon key={keyName} gordo={gordo} keyName={keyName} />;
});

