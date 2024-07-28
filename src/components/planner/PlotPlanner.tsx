import { useState } from "react";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { vecToLatLng } from "../../util";
import { PlannerIcon, PlannerIcons, PlannerPosition, PlotOptions } from "../../types";
import { icon_template } from "../../globals";
import { planner_positions } from "../../data/plot_planner_positions";
import Planner from "./Planner";
import { plotTypes } from "../../data/pins";


export function PlotPlanner({ positions }: { positions: PlannerPosition }) {

    const invisible_icon: PlannerIcon = {
        name: "invisible",
        icon: L.icon({
            ...icon_template,
            iconUrl: "icons/lockedIcon.png",
        })
    };

    const [plotType, setplotType] = useState<PlotOptions>(plotTypes[0]);
    const [icons, setIcons] = useState<PlannerIcons>({ left: null, right: null });

    const doubleIconYOffset = 0.35;

    return (
        <div>
            {(icons.left && icons.right) ? (
                <div>
                    <Marker
                        position={vecToLatLng({x:positions.position.x, y:positions.position.y-doubleIconYOffset})}
                        icon={icons.left.icon}
                    />
                    <Marker
                        position={vecToLatLng({x:positions.position.x, y:positions.position.y+doubleIconYOffset})}
                        icon={icons.right.icon}
                    />
                </div>
            ) : icons.left ?
                <Marker
                    position={vecToLatLng(positions.position)}
                    icon={icons.left.icon}
                />
                : icons.right ?
                    <Marker
                        position={vecToLatLng(positions.position)}
                        icon={icons.right.icon}
                    />
                    :
                    <></>
            }

            <Marker
                position={vecToLatLng(positions.position)}
                icon={invisible_icon.icon}
                opacity={0}
                zIndexOffset={10}
            >
                <Popup>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center gap-5">
                            <h1 className="ml-2 text-xl font-medium">{plotType.name}</h1>
                            <select
                                className="bg-transparent outline outline-1 p-1"
                                value={plotTypes.indexOf(plotType)}
                                onChange={(e) => {
                                    setIcons({ left: {
                                        name: plotTypes[e.target.value].name,
                                        icon: L.icon({
                                            ...icon_template,
                                            iconUrl: plotTypes[e.target.value].icon
                                        })}, right: null });
                                    setplotType(plotTypes[e.target.value]);
                                }}
                            >
                                {plotTypes.map((plotType, index) => <option key={index} value={index}>{plotType.name}</option>)}
                            </select>
                        </div>

                        <hr />

                        <Planner plotType={plotType} icons={icons} setIcons={setIcons}/>
                    </div>
                </Popup>
            </Marker>
        </div >
    );
}

export const PlotPlanners = Object.keys(planner_positions).flatMap((site) => {
    return Object.keys(planner_positions[site]).map((plot) => {
        return <PlotPlanner positions={planner_positions[site][plot]} />;
    })
});
