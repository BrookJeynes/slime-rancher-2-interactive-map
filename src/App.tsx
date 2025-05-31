import { CurrentMapContext, MapType } from "./CurrentMapContext";
import L, { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { LocalStoragePin, Pin } from "./types";
import { useContext, useEffect, useState } from "react";
import { GordoIcons } from "./components/GordoIcon";
import { LockedDoorIcons } from "./components/LockedDoorIcon";
import { MapNodeIcons } from "./components/MapNodeIcon";
import { MapUserPins } from "./components/UserPins";
import { PlotPlanners } from "./components/planner/PlotPlanner";
import { ResearchDroneIcons } from "./components/ResearchDroneIcon";
import { ShadowDoorIcons } from "./components/ShadowDoorIcon";
import Sidebar from "./components/Sidebar";
import { StabilizingGateIcons } from "./components/StabilizingGateIcon";
import { TeleportLineIcons } from "./components/TeleportLineIcon";
import { TreasurePodIcons } from "./components/TreasurePodIcon";
import { icon_template } from "./globals";

// TODO: Ideally, we'd have this centered 0,0 and have the tilemap centered as well.
const map_center: { [key in MapType]: L.LatLngTuple } = {
    [MapType.overworld]: [30, 30],
    [MapType.labyrinth]: [-16, -60],
    [MapType.sr1]: [70, -80]
};

// TODO: This ties in with the `center` property.
const map_bounds: { [key in MapType]: L.LatLngBoundsExpression } = {
    [MapType.overworld]: [
        [-70, -230],
        [85, 50]
    ],
    [MapType.labyrinth]: [
        [200, -200],
        [-70, 60]
    ],
    [MapType.sr1]: [
        [100, -150],
        [20, 60]
    ]
};

function CursorCoordinates() {
    const { current_map } = useContext(CurrentMapContext);
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(0);
    const [centerCoordinates, setCenterCoordinates] = useState<[number, number] | null>(null);

    const map = useMap();

    useMapEvents({
        mousemove(e) {
            setCoordinates([e.latlng.lat, e.latlng.lng]);
        },
        zoomend(e) {
            setZoomLevel(e.target.getZoom());
        },
        moveend() {
            const center = map.getCenter();
            setCenterCoordinates([center.lat, center.lng]);
        }
    });

    useEffect(() => {
        const center = map.getCenter();
        setCenterCoordinates([center.lat, center.lng]);
    }, [map]);

    return (
        <div
            style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
                zIndex: 1000
            }}
        >
            {coordinates ? (
                <div>{`Lat: ${coordinates[0].toFixed(4)}, Lng: ${coordinates[1].toFixed(4)}`}</div>
            ) : (
                <div>Lat: ?, Lng: ?</div>
            )}
            <div>{`Zoom Level: ${zoomLevel}`}</div>
            {centerCoordinates && (
                <div>{`Center: Lat ${centerCoordinates[0].toFixed(4)}, Lng ${centerCoordinates[1].toFixed(4)}`}</div>
            )}
            <div>{`Map center: ${map_center[current_map]}, Map boundaries: ${map_bounds[current_map]}`}</div>
        </div>
    );
}

// it's here to help controlling the granularity of scroll wheel zooming (chatGPT suggestion tbh :D)
function ConfigureMapOptions() {
    const map = useMap();

    useEffect(() => {
        map.options.wheelPxPerZoomLevel = 240;
    }, [map]);

    return null;
}

/** Listens for changes to the `maxBounds` and `center` properties on the
  * `MapContainer` and updates them dynamically as direct modification is not
  * allowed.
  */
function MapUpdater({
    center,
    maxBounds
}: {
    center: LatLngExpression;
    maxBounds: LatLngBoundsExpression
}) {
    const map = useMap();

    useEffect(() => {
        map.setView(center);
    }, [center, map]);

    useEffect(() => {
        map.setMaxBounds(maxBounds);
    }, [maxBounds, map]);

    useEffect(() => {
        map.setZoom(4.5);
    }, [map]);

    return null;
}

function App() {
    const [show_log, setShowLog] = useState(false);
    const [current_log, setCurrentLog] = useState(<></>);
    const [selected_pin, setSelectedPin] = useState<Pin | undefined>(undefined);
    const [advanced_infos, setAdvancedInfos] = useState(false);

    useEffect(() => {
        if (selected_pin)
            document.body.classList.add("cursor-cell");
        else
            document.body.classList.remove("cursor-cell");
    }, []);

    let parsed_user_pins = [];
    try {
        parsed_user_pins = JSON.parse(localStorage.getItem("user_pins") ?? "[]") ?? [];
    } catch {
        window.alert("Failed to read user pins.");
        parsed_user_pins = [];
    }

    const [user_pins, setUserPins] = useState<LocalStoragePin[]>(parsed_user_pins);
    const { current_map } = useContext(CurrentMapContext);

    // TODO: Move to its own file.
    const user_pin_list = user_pins.filter((pin: LocalStoragePin) => {
        return pin.dimension === current_map ||
            // This is required to maintain backwards compatibility
            (pin.dimension === undefined && current_map === MapType.overworld);
    }).map((pin: LocalStoragePin) => {
        const key = `${pin.pos.x}${pin.pos.y}`;
        const icon = L.icon({
            ...icon_template,
            iconUrl: `icons/${pin.icon}`,
        });

        const handleClick = () => {
            const new_pins = user_pins.filter(
                (currentMarker) => currentMarker.pos !== pin.pos
            );
            // TODO: If the pin isn't reset, a new pin will be placed when 
            // pressing "Remove".
            setSelectedPin(undefined);
            setUserPins(new_pins);
            localStorage.setItem("user_pins", JSON.stringify(new_pins));
        };

        return (
            <Marker
                key={key}
                position={[pin.pos.x, pin.pos.y]}
                icon={icon}
            >
                <Popup>
                    <button className="border w-[5rem] mt-2 self-end" onClick={handleClick}>Remove</button>
                </Popup>
            </Marker>
        );
    });

    /// TODO(24-12-24): I dislike having to inject the background image but I'm
    // unsure how to work around this.
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
.leaflet-container {
    ${current_map === MapType.overworld || current_map === MapType.sr1 ? "background-image: url('/map_bg.png') !important; background-color: #005f84 !important;" : ""}
    ${current_map === MapType.labyrinth ? "background-color: #f8d0e3 !important;" : ""}
}
            `;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, [current_map]);

    return (
        <div>
            <div
                className="log-container bg-slate-400/50"
                style={{ display: show_log ? "flex" : "none" }}
            >
                {current_log}
            </div>

            <Sidebar
                selected_pin={selected_pin}
                setSelectedPin={setSelectedPin}
                user_pins={user_pins}
                setUserPins={setUserPins}
                advanced_infos={advanced_infos}
                setAdvancedInfos={setAdvancedInfos}
            />

            <MapContainer
                center={map_center[current_map]}
                zoom={3.5}
                maxZoom={6}
                minZoom={3}
                zoomSnap={0.5}
                zoomDelta={0.5}
                scrollWheelZoom={true}
                maxBounds={map_bounds[current_map]}
                style={{ height: "100vh", width: "100%", zIndex: 1 }}
            >
                <ConfigureMapOptions />
                {advanced_infos && <CursorCoordinates />}
                <MapUpdater center={map_center[current_map]} maxBounds={map_bounds[current_map]} />

                {selected_pin &&
                    <MapUserPins
                        selected_pin={selected_pin!}
                        user_pins={user_pins}
                        setUserPins={setUserPins}
                    />
                }

                <LayersControl position="topright" collapsed={false}>
                    <LayersControl.Overlay checked name="Slime Gordos">
                        <LayerGroup>{GordoIcons(current_map)}</LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Map Nodes">
                        <LayerGroup>{MapNodeIcons(current_map)}</LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Locked Doors">
                        <LayerGroup>{LockedDoorIcons(current_map)}</LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="7-Zee Rewards">
                        <LayerGroup>{TreasurePodIcons(current_map)}</LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Research Drones">
                        <LayerGroup>{ResearchDroneIcons(setShowLog, setCurrentLog, current_map)}</LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Teleport Lines">
                        {current_map === MapType.overworld && <LayerGroup>{TeleportLineIcons}</LayerGroup>}
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Plot Planner">
                        {current_map === MapType.overworld && <LayerGroup>{PlotPlanners}</LayerGroup>}
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Stabilizing Gates">
                        {current_map === MapType.labyrinth && <LayerGroup>{StabilizingGateIcons}</LayerGroup>}
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Shadow Doors">
                        {current_map === MapType.labyrinth && <LayerGroup>{ShadowDoorIcons}</LayerGroup>}
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="User Pins">
                        <LayerGroup>{user_pin_list}</LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
                <TileLayer
                    url={`${current_map}/{z}/{x}/{y}.png`}
                    noWrap={true}
                    maxZoom={6}
                    minZoom={3}
                />
            </MapContainer>
        </div >
    );
}

export default App;
