import { useState } from "react";

import {
  MapContainer,
  ImageOverlay,
  LayersControl,
  Marker,
  Popup,
  LayerGroup,
} from "react-leaflet";
import L from "leaflet";

import PinSelector from "./PinSelector";
import Markers from "./Markers";
import SaveButton from "./SaveButton";
import PinButton from "./PinButton";
import Map from "../assets/map.png";
import IslandInfo from "./IslandInfo";

import {
  DroneList,
  gordoList,
  lockedDoorList,
  mapNodeList,
  Regions,
  resourcesList,
  teleportLineList,
  zeeRewardList,
} from "./Pins/index";

import { iconTemplate } from "../entities/Icon";

import "leaflet/dist/leaflet.css";

export default function Container() {
  const [selectedIcon, setSelectedIcon] = useState("");
  const [userMarkers, setUserMarkers] = useState(
    JSON.parse(localStorage.getItem("pins")) || []
  );
  const [showPins, setShowPins] = useState(true);
  const [showNote, setShowNote] = useState(false);

  const userMarkerList = userMarkers.map((marker) => {
    const listKey = marker.position.join("");
    const icon = new L.icon({
      ...iconTemplate,
      iconUrl: marker.icon,
    });

    const handleClick = () => {
      setSelectedIcon("");
      setUserMarkers(
        userMarkers.filter(
          (currentMarker) => !(currentMarker.position === marker.position)
        )
      );
    };

    return (
      <Marker key={listKey} position={marker.position} icon={icon}>
        <Popup>
          <button onClick={handleClick}>Remove</button>
        </Popup>
      </Marker>
    );
  });

  return (
    <div className="flex flex-row">
      <div
        className="note-container bg-slate-400/50"
        style={{ display: showNote ? "flex" : "none" }}
      >
        {showNote}
      </div>
      <PinSelector
        showPins={showPins}
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
      />
      <MapContainer
        center={[74.64, 143.57]}
        zoom={4}
        scrollWheelZoom={true}
        minZoom={-18}
        maxZoom={18}
        maxBounds={[
          [0, 0],
          [200, 200],
        ]}
        style={{ height: "100vh", width: "100%", zIndex: 1 }}
      >
        <Markers
          selectedIcon={selectedIcon}
          setUserMarkers={setUserMarkers}
          userMarkers={userMarkers}
        />

        <PinButton showPins={showPins} setShowPins={setShowPins} />

        <SaveButton userMarkers={userMarkers} />

        {showPins && selectedIcon !== "" ? (
          <div className="pl-1.5 pr-1.5 bg-white leaflet-bottom leaflet-left mb-3 ml-3 rounded border-2 border-solid border-[#c7c7c7]">
            <div className="flex items-center h-12">
              <span className="text-lg font-medium mr-3">Selected pin:</span>
              {selectedIcon && (
                <img
                  src={selectedIcon}
                  alt="Selected pin icon"
                  style={{ width: 40 }}
                />
              )}
            </div>
          </div>
        ) : null}

        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay checked name="Slime Gordos">
            <LayerGroup>{gordoList}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Map Nodes">
            <LayerGroup>{mapNodeList}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="7-Zee Rewards">
            <LayerGroup>{zeeRewardList}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Locked Doors">
            <LayerGroup>{lockedDoorList}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Research Drones">
            <LayerGroup>
              <DroneList setShowNote={setShowNote} />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Resources">
            <LayerGroup>{resourcesList}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Regions">
            <LayerGroup>
              <Regions />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Teleport Lines">
            <LayerGroup>{teleportLineList}</LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>

        {userMarkerList}

        <IslandInfo />

        <ImageOverlay
          url={Map}
          bounds={[
            [0, 0],
            [200, 200],
          ]}
          zIndex={10}
          scale={1}
        />
      </MapContainer>
    </div>
  );
}
