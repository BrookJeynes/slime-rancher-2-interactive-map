import { useState } from "react";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { vecToLatLng } from "../util";
import { PlannerIcon, PlannerIcons, PlannerPositions } from "../types";
import { icon_template } from "../globals";
import { planner_positions } from "../data/plot_planner_positions";
import CorralPlanner from "./CorralPlanner";
import GardenPlanner from "./GardenPlanner";

export function PlotPlanner({ positions }: { positions: PlannerPositions }) {
    enum Tab {
        corral = "Corral",
        coop = "Coop",
        garden = "Garden",
        incenerator = "Incenerator",
        pond = "Pond",
        silo = "Silo",
    }

    const invisible_icon: PlannerIcon = {
        name: "invisible",
        icon: L.icon({
            ...icon_template,
            iconUrl: "icons/lockedIcon.png",
        })
    };

    const [icons, setIcons] = useState<PlannerIcons>({ left: null, right: null });
    const [tab, setTab] = useState<Tab>(Tab.corral);

    let body = <></>;
    switch (tab) {
        case Tab.corral: {
            body = <CorralPlanner icons={icons} setIcons={setIcons} />
            break;
        }
        case Tab.garden: {
            body = <GardenPlanner icons={icons} setIcons={setIcons} />
            break;
        }
    }

    return (
        <div>
            {(icons.left && icons.right) ? (
                <div>
                    <Marker
                        position={vecToLatLng(positions.left)}
                        icon={icons.left.icon}
                    />
                    <Marker
                        position={vecToLatLng(positions.right)}
                        icon={icons.right.icon}
                    />
                </div>
            ) : icons.left ?
                <Marker
                    position={vecToLatLng(positions.center)}
                    icon={icons.left.icon}
                />
                : icons.right ?
                    <Marker
                        position={vecToLatLng(positions.center)}
                        icon={icons.right.icon}
                    />
                    :
                    <></>
            }

            <Marker
                position={vecToLatLng(positions.center)}
                icon={invisible_icon.icon}
                opacity={0}
                zIndexOffset={10}
            >
                <Popup>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center gap-5">
                            <h1 className="ml-2 text-xl font-medium">{tab}</h1>
                            <select
                                className="bg-transparent outline outline-1 p-1"
                                value={tab}
                                onChange={(e) => {
                                    setIcons({ left: null, right: null });
                                    setTab(e.target.value);
                                }}
                            >
                                {Object.keys(Tab).filter((key) => isNaN(Number(key))).map((key) => <option>{Tab[key]}</option>)}
                            </select>
                        </div>

                        <hr />

                        {body}
                    </div>
                </Popup>
            </Marker>
        </div >
    );
}

export const plot_planners = Object.keys(planner_positions).flatMap((site) => {
    return Object.keys(planner_positions[site]).map((plot) => {
        return <PlotPlanner positions={planner_positions[site][plot]} />;
    })
});
