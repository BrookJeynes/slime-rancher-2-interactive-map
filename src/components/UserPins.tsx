import { useState } from "react";

import { pins } from "../data/pins";
import { LocalStoragePin, Pin } from "../types";

import { useMapEvents } from 'react-leaflet';

export function SidebarPins({
    selected_pin,
    setSelectedPin,
}: {
    selected_pin: Pin | undefined,
    setSelectedPin: React.Dispatch<React.SetStateAction<Pin | undefined>>
}) {
    const [selected_type, setSelectedType] = useState("Food");

    const types = [
        "Food",
        "Plorts",
        "Utility",
        "Resources",
        "Slimes",
    ];

    return (
        <div>
            <div className="flex justify-between mb-5 items-center">
                <div className="flex items-center">
                    {selected_pin && <img
                        src={`icons/${selected_pin.icon}`}
                        alt={`${selected_pin.icon} pin icon`}
                        className="w-7 mr-2"
                    />}

                    <h2 className="text-lg font-bold">User Pins</h2>
                </div>
                <select
                    value={selected_type}
                    onChange={event => setSelectedType(event.target.value)}
                    className="bg-transparent outline outline-1 p-1"
                >
                    {types.map((type: string) => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>

            <div className="flex flex-wrap gap-2">
                {
                    Object.keys(pins).map((key) => {
                        if (pins[key].type === selected_type) {
                            return <PinIcon key={key} pin={pins[key]} setSelectedPin={setSelectedPin} />
                        }

                        return null;
                    })
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
    const debug = process.env.NODE_ENV !== 'production';

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

    return null
}
