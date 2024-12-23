import { LocalStoragePin, Pin, PinTitle } from "../types";
import React, { useState } from "react";
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
                    className="bg-blue-900 outline outline-1 p-1"
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
            }];
            setUserPins(new_pins);
            localStorage.setItem("user_pins", JSON.stringify(new_pins));
        },
    });

    return null;
}
