import { useContext, useEffect, useState } from "react";

import { Marker, Popup } from "react-leaflet"
import L from "leaflet";

import { Gordo } from "../types";
import { icon_template, icon_opacity, gordo_ls_key } from "../globals";
import { gordos } from "../data/gordos";
import { handleChecked } from "../util";
import { FoundContext } from "../FoundContext";

export function GordoIcon({ gordo }: { gordo: Gordo }) {
    const key = `${gordo.name.toLowerCase().replace(" ", "")}${gordo.pos.x}${gordo.pos.y}`;
    // @ts-ignore
    const { found, setFound } = useContext(FoundContext);

    const [checked, setChecked] = useState(
        found.gordos ? found.gordos.some((k: string) => k === key) : false
    );

    useEffect(() => {
        if (checked) {
            setFound({
                ...found,
                gordos: [...found.gordos, key],
            });
        } else {
            setFound({
                ...found,
                gordos: [...found.gordos.filter((item: string) => item !== key)]
            });
        }
    }, [checked]);

    const icon = L.icon({
        ...icon_template,
        iconUrl: `/icons/gordos/${gordo.image}`,
        className: `${checked && icon_opacity}`
    });

    return (
        <Marker key={key} position={[-gordo.pos.y, gordo.pos.x]} icon={icon}>
            <Popup>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-5">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleChecked(gordo_ls_key, key, checked, setChecked)}
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
                                return <li className="list-disc ml-5">{drop}</li>
                            })}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-md font-bold">Unlocks:</h2>
                        <ul>
                            {gordo.unlocks.map(unlock => {
                                return <li className="list-disc ml-5">{unlock}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export const GordoIcons = Object.values(gordos).map((gordo: Gordo) => {
    return <GordoIcon gordo={gordo} />;
})
