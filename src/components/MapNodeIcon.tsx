import { Marker, Popup } from "react-leaflet";
import { icon_opacity, icon_template, map_node_ls_key } from "../globals";
import { useContext, useEffect, useState } from "react";
import { FoundContext } from "../FoundContext";
import L from "leaflet";
import { MapNode } from "../types";
import { handleChecked } from "../util";
import { map_nodes } from "../data/map_nodes";

export function MapNodeIcon({ map_node }: { map_node: MapNode }) {
    const key = `${map_node.name.toLowerCase().replace(" ", "")}${map_node.pos.x}${map_node.pos.y}`;
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
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-5">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleChecked(map_node_ls_key, key, checked, setChecked)}
                                className="w-4 h-4"
                            />
                            <h1 className="ml-2 text-xl font-medium">{map_node.name}</h1>
                        </div>
                    </div>

                    <hr />

                    <div>
                        <span className="text-md font-bold">Description: </span>
                        <span>{map_node.description}</span>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export const MapNodeIcons = Object.values(map_nodes).map((map_node: MapNode) => {
    const key = `${map_node.pos.x}${map_node.pos.y}`;
    return <MapNodeIcon key={key} map_node={map_node} />;
});
