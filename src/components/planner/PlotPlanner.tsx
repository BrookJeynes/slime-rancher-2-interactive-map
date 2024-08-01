import { useState, useEffect } from "react";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { vecToLatLng } from "../../util";
import { PlannerIcon, PlannerIcons, PlannerPosition, PlotOptions, LocalStoragePlotPlan } from "../../types";
import { icon_template } from "../../globals";
import { planner_positions } from "../../data/plot_planner_positions";
import Planner from "./Planner";
import { plotTypes } from "../../data/pins";
import { handlePlotPlanned, getStoredPlotPlan } from "../../util";


export function PlotPlanner({ positions, site, plot }: { positions: PlannerPosition, site:string, plot:number}) {

    const invisible_icon: PlannerIcon = {
        name: "invisible",
        icon: L.icon({
            ...icon_template,
            iconUrl: "icons/lockedIcon.png",
        })
    };

    const [plotType, setplotType] = useState<PlotOptions>();
    const [icons, setIcons] = useState<PlannerIcons>({ left: null, right: null });
    const [plotPlan, setPlotPlan] = useState<LocalStoragePlotPlan>(getStoredPlotPlan(site, plot));
    const doubleIconYOffset = 0.35;

    useEffect(()=>{
        let plotType;
        if(plotPlan !== null && plotPlan.selectedPlotType !== undefined){
            setplotType(plotTypes[plotPlan.selectedPlotType])
            plotType = plotTypes[plotPlan.selectedPlotType]
        }
        console.log(0)

        console.log(icons)

        setIcons({
            left: (plotType !== undefined && plotType.optionsA !== undefined && plotPlan.selectedOptionA !== undefined && plotType.optionsA[plotPlan.selectedOptionA] !==undefined)? {
                name: plotType.optionsA[plotPlan.selectedOptionA].name,
                icon: L.icon({
                    ...icon_template,
                    iconUrl: plotType.optionsA[plotPlan.selectedOptionA].icon
                }),
            } : (icons.right === null && plotType !== undefined) ? ({
                name: plotType.name,
                icon: L.icon({
                    ...icon_template,
                    iconUrl: plotType.icon
                })}) : null,
            right: (plotType !== undefined &&  plotType.optionsB !== undefined && plotPlan.selectedOptionB !== undefined && plotType.optionsB[plotPlan.selectedOptionB] !==undefined)? {
                name: plotType.optionsB[plotPlan.selectedOptionB].name,
                icon: L.icon({
                    ...icon_template,
                    iconUrl: plotType.optionsB[plotPlan.selectedOptionB].icon
                }),
            }  : null,
        })   
        console.log(1)

        console.log(icons)
    }, [])

    function handlePlotPlanChange(newPlotPlan: LocalStoragePlotPlan) {
        console.log("handling plot change: "+ site + " " + plot + " " + JSON.stringify(newPlotPlan))
        setPlotPlan(newPlotPlan);
        handlePlotPlanned(site, plot, newPlotPlan)
    }

    const plotTypeName = (plotType?.name)? plotType.name : "Choose"

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
                            <h1 className="ml-2 text-xl font-medium">{plotTypeName}</h1>
                            <select
                                className="bg-transparent outline outline-1 p-1"
                                value={(plotPlan !== null && plotPlan.selectedPlotType !== undefined) ? plotPlan.selectedPlotType : "Empty"}
                                onChange={(e) => {
                                    setIcons({ left: {
                                        name: plotTypes[e.target.value].name,
                                        icon: L.icon({
                                            ...icon_template,
                                            iconUrl: plotTypes[e.target.value].icon
                                        })}, right: null });
                                    setplotType(plotTypes[e.target.value]);
                                    handlePlotPlanChange({...plotPlan, selectedPlotType: Number(e.target.value)});
                                }}
                            >
                                <option>Empty</option>
                                {plotTypes.map((plotType, index) => <option key={index} value={index}>{plotType.name}</option>)}
                            </select>
                        </div>

                        <hr />

                        <Planner plotType={plotType} icons={icons} setIcons={setIcons} plotPlan={plotPlan} setPlotPlan={handlePlotPlanChange}/>
                    </div>
                </Popup>
            </Marker>
        </div >
    );
}

export const PlotPlanners = Object.keys(planner_positions).flatMap((site) => {
    return Object.keys(planner_positions[site]).map((plot) => {
        return <PlotPlanner positions={planner_positions[site][plot] } site={site} plot={Number(plot)}/>;
    })
});
