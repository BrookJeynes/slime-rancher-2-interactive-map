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
        <Marker key={key} position={[gordo.pos.x, gordo.pos.y]} icon={icon}>
            <Popup>
                {gordo.name} - {gordo.food}
                <div className="mt-1">
                    <label className="mr-1">Found:</label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleChecked(gordo_ls_key, key, checked, setChecked)}
                    />
                </div>
            </Popup>
        </Marker>
    );
}

export const GordoIcons = Object.values(gordos).map((gordo: Gordo) => {
    return <GordoIcon gordo={gordo} />;
})
