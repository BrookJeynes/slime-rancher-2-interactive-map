import L from "leaflet";

import { LocalStoragePlotPlan, Pin, PlannerIcons, PlotOptions } from "../../types";
import { icon_template } from "../../globals";

enum Side {
    left,
    right,
}

export default function Planner({
    plotType,
    icons,
    setIcons, plotPlan, setPlotPlan
}: {
    plotType: PlotOptions,
    icons: PlannerIcons,
    setIcons: React.Dispatch<React.SetStateAction<PlannerIcons>>,
    plotPlan: LocalStoragePlotPlan,
    setPlotPlan: (a: LocalStoragePlotPlan) => void
}) {

    function onChange(eventValue: number, side: Side, options: Pin[]) {
        const val = options[eventValue];

        if (side === Side.left) {
            setIcons({
                ...icons,
                left: (val !== undefined) ? {
                    name: val.name,
                    icon: L.icon({
                        ...icon_template,
                        iconUrl: val.icon
                    }),
                } : (icons.right === null) ? ({
                    name: plotType.name,
                    icon: L.icon({
                        ...icon_template,
                        iconUrl: plotType.icon
                    })}) : null,
            })

            setPlotPlan({...plotPlan, selectedOptionA: eventValue});
        } else {
            setIcons({
                left: (val !==undefined)? ((icons.left !== null && icons.left.icon.options.iconUrl.includes("plots"))? null : icons.left) :
                    ({
                        name: plotType.name,
                        icon: L.icon({
                            ...icon_template,
                            iconUrl: plotType.icon
                        })})
                ,
                right: (val !==undefined) ? {
                    name: val.name,
                    icon: L.icon({
                        ...icon_template,
                        iconUrl: val.icon
                    }),
                }  : null,
            })
            setPlotPlan({...plotPlan, selectedOptionB: eventValue});
        }
    }

    return (
        <div className="flex justify-between">

            {(plotType?.optionsA) ? 
                (plotType.optionsA.length === 1) ? 
                    (                    <div className="flex flex-col gap-1"><input type="checkbox" checked={plotPlan.selectedOptionA===0} onChange={(e) =>  e.target.checked ? onChange(0, Side.left, plotType.optionsA) : onChange(-1, Side.left, plotType.optionsA)} name={plotType.optionsA[0].name} />
                        <label className="ml-2">{plotType.optionsAName}</label></div>)
                    :
                    (
                        <div className="flex flex-col gap-1">
                            <h2 className="ml-2 text-lg">{plotType.optionsAName}</h2>
                            <select
                                onChange={(e) => onChange(e.target.value, Side.left, plotType.optionsA)}
                                className="bg-transparent outline outline-1 p-1"
                                value={plotPlan.selectedOptionA ? plotPlan.selectedOptionA : "Empty"}
                            >
                                <option>Empty</option>
                                {plotType.optionsA.map((resource, index) => <option key={index} value={index}>{resource.name}</option>)}
                            </select>
                        </div>
                    ) : (<></>)}

            {(plotType?.optionsB) ? 
                (plotType.optionsB.length === 1) ? 
                    (                    <div className="flex flex-col gap-1"><input type="checkbox" checked={plotPlan.selectedOptionB===0} onChange={(e) =>  e.target.checked ? onChange(0, Side.right, plotType.optionsB) : onChange(-1, Side.right, plotType.optionsB)} name={plotType.optionsB[0].name} />
                        <label className="ml-2">{plotType.optionsBName}</label></div>)
                    :(
                        <div className="flex flex-col gap-1">
                            <h2 className="ml-2 text-lg">{plotType.optionsBName}</h2>
                            <select
                                onChange={(e) => onChange(e.target.value, Side.right, plotType.optionsB)}
                                className="bg-transparent outline outline-1 p-1"
                                value={plotPlan.selectedOptionB ? plotPlan.selectedOptionB : "Empty"}

                            >
                                <option>Empty</option>
                                {plotType.optionsB.map((resource, index) => <option key={index} value={index}>{resource.name}</option>)}
                            </select>
                        </div>
                    ) : (<></>)}


            {(plotType?.upgrades.length > 0) ? (<div className="flex flex-col gap-1">
                <h2 className="ml-2 text-lg">Upgrades</h2>
                {plotType.upgrades.map((additionalOption, index) => <div key={index}>
                    <input type="checkbox" checked={plotPlan.selectedUpgrades.includes(index)} 
                        onChange={(e) =>  {
                            let upgrades;
                            e.target.checked ? 
                                upgrades = [...plotPlan.selectedUpgrades, index] : 
                                upgrades = plotPlan.selectedUpgrades.filter(value => value !== index);
                            setPlotPlan({...plotPlan, selectedUpgrades:upgrades })
                        }
                        }  name={additionalOption} />
                    <label className="ml-2">{additionalOption}</label>
                </div>)}
            </div>) : (<></>)}
            
        </div>
    )
}
