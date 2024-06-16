import { useContext, useEffect, useState } from "react";

import { Marker, Popup } from "react-leaflet"
import L from "leaflet";

import { MapNode } from "../types";
import { icon_template, icon_opacity, map_node_ls_key } from "../globals";
import { map_nodes } from "../data/map_nodes";
import { handleChecked } from "../util";
import { FoundContext } from "../FoundContext";

export function MapNodeIcon({ map_node }: { map_node: MapNode }) {
    const key = `${map_node.name.toLowerCase().replace(" ", "")}${map_node.pos.x}${map_node.pos.y}`;
    // @ts-ignore
    const { found, setFound } = useContext(FoundContext);

    const [checked, setChecked] = useState(
        found.map_nodes ? found.map_nodes.some((k: string) => k === key) : false
    );

    useEffect(() => {
        if (checked) {
            setFound({
                ...found,
                map_nodes: [...found.map_nodes, key],
            });
        } else {
            setFound({
                ...found,
                map_nodes: [...found.map_nodes.filter((item: string) => item !== key)]
            });
        }
    }, [checked]);

    const icon = L.icon({
        ...icon_template,
        iconUrl: "/icons/iconMapNode.png",
        className: `${checked && icon_opacity}`
    });

    return (
        <Marker key={key} position={[map_node.pos.x, map_node.pos.y]} icon={icon}>
            <Popup>
                {map_node.name}
                <div className="mt-1">
                    <label className="mr-1">Found:</label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleChecked(map_node_ls_key, key, checked, setChecked)}
                    />
                </div>
            </Popup>
        </Marker>
    );
}

export const MapNodeIcons = Object.values(map_nodes).map((map_node: MapNode) => {
    return <MapNodeIcon map_node={map_node} />;
})
