import { useContext, useEffect, useState } from "react";

import { Marker, Popup } from "react-leaflet"
import L from "leaflet";

import { ResearchDrone } from "../types";
import { icon_template, icon_opacity, research_drone_ls_key } from "../globals";
import { research_drones } from "../data/research_drones";
import { handleChecked } from "../util";

import { AiOutlineClose } from 'react-icons/ai';
import { FoundContext } from "../FoundContext";

export function ResearchDroneIcon({
    research_drone,
    setShowLog,
    setCurrentLog,
}: {
    research_drone: ResearchDrone,
    setShowLog: React.Dispatch<React.SetStateAction<boolean>>
    setCurrentLog: React.Dispatch<React.SetStateAction<JSX.Element>>
}) {
    const key = `${research_drone.name.toLowerCase().replace(" ", "")}${research_drone.pos.x}${research_drone.pos.y}`;
    const { found, setFound } = useContext(FoundContext);

    const [checked, setChecked] = useState(
        found.research_drones ? found.research_drones.some((k: string) => k === key) : false
    );

    useEffect(() => {
        if (checked) {
            setFound({
                ...found,
                research_drones: [...found.research_drones, key],
            });
        } else {
            setFound({
                ...found,
                research_drones: [...found.research_drones.filter((item: string) => item !== key)]
            });
        }
    }, [checked]);

    const icon = L.icon({
        ...icon_template,
        iconUrl: "/icons/researchDroneFaceIcon.png",
        className: `${checked && icon_opacity}`
    });

    return (
        <Marker key={key} position={[research_drone.pos.x, research_drone.pos.y]} icon={icon}>
            <Popup>
                {research_drone.name}
                <div className="flex justify-between items-center mt-2">
                    <div className="mr-2">
                        <label className="mr-1">Found:</label>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleChecked(research_drone_ls_key, key, checked, setChecked)}
                        />
                    </div>
                    <button
                        className="rounded bg-gray-100 border w-[5rem]"
                        onClick={() => {
                            setShowLog(true)
                            setCurrentLog(<Log research_drone={research_drone} setShowLog={setShowLog} />)
                        }}
                    >
                        Access Log
                    </button>
                </div>
            </Popup>
        </Marker>
    );
}

export function Log({
    research_drone,
    setShowLog,
}: {
    research_drone: ResearchDrone,
    setShowLog: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const [showArchived, setShowArchived] = useState(false);

    const textArray = !showArchived ? research_drone.log : research_drone.archive;

    return (
        <div className={`${!showArchived ? "border-[#0ba0fb] text-white" : "border-[#58faa4] text-[#58faa4]"} max-w-fit log`}>
            <div className="flex flex-col mb-7">
                <div className="flex justify-between items-center mb-7">
                    <span className="font-medium text-2xl">Accessing GG.{!showArchived ? "Log" : "Archive"}:</span>
                    <AiOutlineClose
                        onClick={() => setShowLog(false)}
                        size={25}
                        className="log-close"
                    />
                </div>
                <div>
                    {textArray.map((text: string) => <p className="text-lg monospace-font">{text}</p>)}
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    className="text-base rounded bg-white py-1 px-2 text-black"
                    onClick={() => setShowArchived(!showArchived)}
                >
                    {!showArchived ? "Access Archive" : "Access Log"}
                </button>
            </div>
        </div>
    );
}

export function ResearchDroneIcons(
    setShowLog: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentLog: React.Dispatch<React.SetStateAction<JSX.Element>>,
) {
    return Object.values(research_drones).map((research_drone: ResearchDrone) => {
        return <ResearchDroneIcon
            research_drone={research_drone}
            setShowLog={setShowLog}
            setCurrentLog={setCurrentLog}
        />;
    })
}

