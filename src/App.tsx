import { useState } from "react";

import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import L from "leaflet";

import { GordoIcons } from "./components/GordoIcon";
import { LockedDoorIcons } from "./components/LockedDoorIcon";
import { MapNodeIcons } from "./components/MapNodeIcon";
import { TreasurePodIcons } from "./components/TreasurePodIcon";
import { ResearchDroneIcons } from "./components/ResearchDroneIcon";
import { TeleportLineIcons } from "./components/TeleportLineIcon";
import Sidebar from "./components/Sidebar";
import { icon_template } from "./globals";
import { LocalStoragePin, Pin } from "./types";
import { MapUserPins } from "./components/UserPins";
import * as mapinfo from "./data/mapinfo";

// largest zoom has a units-per-pixel = 128.
// Then, account for how map png size is 25600x25600 pixels but in-game map size is 6400x6400 units.
const scaleFactor = (1 / mapinfo.unitsPerPixel) * (mapinfo.mapWidthPx / mapinfo.gameMapWidthUnits);

// The map png is centered around 0,0 on the in-game map.
// However, because gdal2tiles readjusts it to be the next largest power of 2, we must account for the origin not truly being centered.
// Also, 128 is the center of tile (256 px / 2) at zoom 0 of course.
const centerOffset = (mapinfo.tileSize / 2) * (mapinfo.gameMapWidthUnits / 2**Math.ceil(Math.log2(mapinfo.gameMapWidthUnits)));  // ex. 2**ceil(log2(25600)) = 2**15 = 32768

const ScaledSimpleCRS = L.extend({}, L.CRS.Simple, {
    // like (a*x + b, c*y + d)
    // Compute a and c coefficients so that tile 0/0/0 is from [0, 0] to [mapHeight, mapWidth]
    // Compute b and d coefficients to shift the origin (0,0)
    transformation: new L.Transformation(scaleFactor, centerOffset, scaleFactor, centerOffset)
});

function App() {
    const [show_log, setShowLog] = useState(false);
    const [current_log, setCurrentLog] = useState(<></>);
    const [selected_pin, setSelectedPin] = useState<Pin | undefined>(undefined);
    const [user_pins, setUserPins] = useState<LocalStoragePin[]>(
        JSON.parse(localStorage.getItem("user_pins") ?? "[]") ?? []
    );

    // TODO: Move to its own file.
    const user_pin_list = user_pins.map((pin: LocalStoragePin) => {
        const key = `${pin.pos.x}${pin.pos.y}`;
        const icon = L.icon({
            ...icon_template,
            iconUrl: `icons/${pin.icon}`,
        });

        const handleClick = () => {
            const new_pins = user_pins.filter(
                (currentMarker) => !(currentMarker.pos === pin.pos)
            );
            // TODO: If the pin isn't reset, a new pin will be placed when 
            // pressing "Remove".
            setSelectedPin(undefined);
            setUserPins(new_pins)
            localStorage.setItem("user_pins", JSON.stringify(new_pins));
        };

        return (
            <Marker
                key={key}
                position={[pin.pos.x, pin.pos.y]}
                icon={icon}
            >
                <Popup>
                    <button onClick={handleClick}>Remove</button>
                </Popup>
            </Marker>
        );
    });

    return (
        <div>
            <div
                className="log-container bg-slate-400/50"
                style={{ display: show_log ? "flex" : "none" }}
            >
                {current_log}
            </div>

            <Sidebar selected_pin={selected_pin} setSelectedPin={setSelectedPin} />

            <MapContainer
                crs={ScaledSimpleCRS}
                center={[0, 0]}
                zoom={3.5}
                zoomControl={false}
                scrollWheelZoom={true}
                maxZoom={7}
                minZoom={3}
                maxBounds={[
                    [mapinfo.gameMapBounds.y[0], mapinfo.gameMapBounds.x[0]],
                    [mapinfo.gameMapBounds.y[1], mapinfo.gameMapBounds.x[1]]
                ]}
                style={{ height: "100vh", width: "100%", zIndex: 1 }}
            >
                {selected_pin &&
                    <MapUserPins
                        selected_pin={selected_pin!}
                        user_pins={user_pins}
                        setUserPins={setUserPins}
                    />
                }

                <LayersControl position="topright" collapsed={false}>
                    <LayersControl.Overlay checked name="Slime Gordos">
                        <LayerGroup>{GordoIcons}</LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Map Nodes">
                        <LayerGroup>{MapNodeIcons}</LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Locked Doors">
                        <LayerGroup>{LockedDoorIcons}</LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="7-Zee Rewards">
                        <LayerGroup>{TreasurePodIcons}</LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Research Drones">
                        <LayerGroup>{ResearchDroneIcons(setShowLog, setCurrentLog)}</LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Teleport Lines">
                        <LayerGroup>{TeleportLineIcons}</LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="User Pins">
                        <LayerGroup>{user_pin_list}</LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>

                <TileLayer url="map/{z}/{x}/{y}.png" noWrap={true} tileSize={256} />
            </MapContainer>
        </div >
    )
}

export default App
