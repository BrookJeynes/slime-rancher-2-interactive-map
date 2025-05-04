import { LocalStoragePin, Pin, PinTitle } from "../types";
import React, { useContext, useEffect, useState } from "react";
import { CurrentMapContext } from "../CurrentMapContext";
import { FaQuestionCircle } from "react-icons/fa";
import { pins } from "../data/pins";
import { useMapEvents } from "react-leaflet";

export function SidebarPins({
    selected_pin,
    setSelectedPin,
}: {
    selected_pin: Pin | undefined,
    setSelectedPin: React.Dispatch<React.SetStateAction<Pin | undefined>>
}) {
    const [selected_type, setSelectedType] = useState<PinTitle>("Food");

    const types: PinTitle[] = [
        "Food",
        "Plorts",
        "Utility",
        "Resources",
        "Slimes",
        "Gordos",
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between mb-5 md:items-center">
                <div className="flex items-center">
                    <h2 className="text-lg font-bold">User Pins</h2>
                </div>
                <select
                    value={selected_type}
                    onChange={event => setSelectedType(event.target.value as PinTitle)}
                    className="cursor-pointer bg-btn outline outline-1 p-1"
                >
                    {types.map((type: string) => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-0 space-x-3 mb-5 md:items-center">
                <h2>Selected icon to pin:</h2>


                {
                    selected_pin ?
                        <img
                            src={`icons/${selected_pin.icon}`}
                            alt={`${selected_pin.icon} pin icon`}
                            className="w-7 mr-2"
                        /> :
                        <div className="tooltip">
                            <FaQuestionCircle size={25} />
                            <span className="tooltiptext">Click on the icon below that you want to pin</span>
                        </div>
                }
            </div>


            <div className="flex flex-wrap gap-2">
                {
                    pins[selected_type as PinTitle].map((key: Pin) =>
                        <PinIcon
                            key={key.name}
                            pin={key}
                            setSelectedPin={setSelectedPin}
                        />
                    )
                }
            </div>
        </div>
    );
}

function PinIcon({
    pin,
    setSelectedPin,
}: {
    pin: Pin,
    setSelectedPin: React.Dispatch<React.SetStateAction<Pin | undefined>>,
}) {
    const key = pin.name.toLowerCase().replace(" ", "");

    return (
        <div
            key={key}
            onClick={() => setSelectedPin(pin)}
        >
            <img
                title={pin.type}
                src={`icons/${pin.icon}`}
                alt={`${pin.icon} pin icon`}
                style={{ width: 40 }}
            />
        </div>
    );
}


export function MapUserPins({
    selected_pin,
    user_pins,
    setUserPins,
}: {
    selected_pin: Pin,
    user_pins: LocalStoragePin[],
    setUserPins: React.Dispatch<React.SetStateAction<LocalStoragePin[]>>,
}) {
    const { current_map } = useContext(CurrentMapContext);
    const debug = process.env.NODE_ENV !== "production";

    useMapEvents({
        click(e) {
            if (debug) {
                console.log(e.latlng.lat, e.latlng.lng);
            }

            const new_pins = [...user_pins, {
                icon: selected_pin.icon,
                pos: {
                    x: e.latlng.lat,
                    y: e.latlng.lng,
                },
                dimension: current_map,
            } as LocalStoragePin];
            setUserPins(new_pins);
            localStorage.setItem("user_pins", JSON.stringify(new_pins));
        },
    });

    return null;
}

export function ExportUserPinsButton({
    user_pins
}: {
    user_pins: LocalStoragePin[]
}) {
    const pins_json = localStorage.getItem("user_pins") ?? "";
    let pins_json_file = new Blob([pins_json], { type: "application/json" });

    useEffect(() => {
        const pins_json = localStorage.getItem("user_pins") ?? "";
        pins_json_file = new Blob([pins_json], { type: "application/json" });
    }, [user_pins]);

    return (
        <button className="bg-btn w-full outline outline-1 p-1">
            <a
                download="user_pins.json"
                target="_blank"
                rel="noreferrer"
                href={URL.createObjectURL(pins_json_file)}
            >
                Export Pins
            </a>
        </button>
    );
}

export function ImportUserPinsButton({
    setUserPins
}: {
    setUserPins: React.Dispatch<React.SetStateAction<LocalStoragePin[]>>
}) {
    return (
        <label
            htmlFor="user_pin_upload"
            className="flex justify-center items-center w-full cursor-pointer bg-btn outline outline-1 p-1 text-center"
        >
            <span>Import Pins</span>
            <input
                type="file"
                accept=".json"
                id="user_pin_upload"
                className="hidden"
                onChange={(event) => {
                    const file = (event.target.files ?? [])[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const pins_json = e.target?.result as string;
                        if (window.confirm("This will overwrite your current pins. Are you sure you want to continue?")) {
                            try {
                                const parsed_pins = JSON.parse(pins_json);

                                if (!Array.isArray(parsed_pins)) {
                                    throw new Error("Invalid user pins format. Not an array.");
                                }

                                if (!parsed_pins.every(pin =>
                                    typeof pin === "object" &&
                                    pin !== null &&
                                    typeof pin.icon === "string" &&
                                    pin.pos && typeof pin.pos === "object" &&
                                    typeof pin.pos.x === "number" &&
                                    typeof pin.pos.y === "number"
                                )) {
                                    throw new Error("Invalid user pins format. Malformed data.");
                                }

                                localStorage.setItem("user_pins", pins_json);
                                setUserPins(parsed_pins);
                            } catch (err) {
                                console.error(`error: failed to parse user pins JSON file - ${err}`);
                                window.alert("Failed to parse user pins. Please ensure you uploaded a properly formed JSON file.");
                            }
                        }
                    };
                    reader.onerror = () => {
                        console.error("error: failed to read user pins.");
                    };

                    reader.readAsText(file);
                }}
            />
        </label>
    );
}

export function ClearUserPinsButton({
    setUserPins
}: {
    setUserPins: React.Dispatch<React.SetStateAction<LocalStoragePin[]>>
}) {
    return (
        <button
            className="bg-btn btn-red p-1 w-full outline outline-1"
            onClick={() => {
                if (!window.confirm("Are you sure you want to clear your current pins? There is no way to undo this. Ensure you export your pins if you want to keep them.")) return;
                setUserPins([]);
                localStorage.setItem("user_pins", JSON.stringify([]));
            }}>
            Clear Pins
        </button>
    );
}
