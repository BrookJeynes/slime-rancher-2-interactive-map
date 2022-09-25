import React, { useState } from 'react';
import './App.css';

import Map from "./assets/map.png"

import { BsPinAngleFill } from "react-icons/bs";

import {
  MapContainer,
  ImageOverlay,
  LayersControl,
  Marker,
  Popup,
  LayerGroup,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet';

// Data
import { gordos } from "./data/gordos";
import { mapNodes } from "./data/mapNodes";
import { pins } from "./data/pins"
import { treasurePods } from "./data/treasurePods";
import { researchDrones } from "./data/researchDrones";

// Here due to dynamic require statement not working in other files
export const Pin = (props) => {
  const pin = props.pin

  const handlePinClick = (e) => {
    props.setSelectedIcon(e.target.name)
  }

  return (
    <div onClick={handlePinClick}>
      <img src={require(`${pin.icon}`)} name={pin.icon} style={{width: 40}} /> 
    </div>
  )
}

const PlortsSelect = (props) => {
  const type = props.type;
  const setSelectedIcon = props.setSelectedIcon;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start my-1" onClick={() => setOpen(!open)}>
      <span>Icons:</span>
      <div className="flex flex-col">
        { Object.keys(pins).map(key => pins[key].type == type && <Pin pin={pins[key]} setSelectedIcon={setSelectedIcon} />) }
      </div>
    </div>
  );
}

const PinSelector = (props) => {
  const { showPins, setSelectedIcon } = props;
  const [selectedType, setSelectedType] = useState("Food");

  const types = [
    "Food",
    "Plort",
    "Utility",
    "Resources",
  ]

  return (
    <div className={`flex flex-col items-start p-3 bg-white drop-shadow-lg ${showPins && "hidden"}`}>
      <div className="flex flex-col justify-between w-full">
        <span className="font-bold text-lg">Pins</span>
      </div>
      <div className="flex flex-col my-3">
        Category:
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          { types.map(type => <option value={type}>{type}</option>)}
        </select>
      </div>
      <div className="flex">
        { types.map(type => selectedType == type && <PlortsSelect type={type} setSelectedIcon={setSelectedIcon} />) }
      </div>
    </div>
  )
}

const Copyright = () => {
  return (
    <div className="p-2">
      <span className="font-bold text-md">
        ⚠️ All assets used within this project are owned solely by Monomi Park. 
        This project is just for fun and to help the community, no money is being made off this project ⚠️
      </span>
    </div>
  )
}

const App = () => {
  const center = [50, 150];
  const [selectedIcon, setSelectedIcon] = useState()
  const [userMarkers, setUserMarkers] = useState([]);
  const [showPins, setShowPins] = useState(true);
  // Used to print coorindates of click
  const debug = false;

  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        if (debug) {
          console.log(e.latlng.lat, e.latlng.lng)
        }

        if (selectedIcon) {
          setUserMarkers([...userMarkers, {
            icon: selectedIcon,
            position: [e.latlng.lat, e.latlng.lng]
          }])
        } 
      },            
    })

    return null 
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <Copyright />
      </div>

      <div className="flex flex-row">
        <PinSelector
          showPins={showPins}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          />

        <MapContainer 
          center={center} 
          zoom={3} 
          scrollWheelZoom={false}
          minZoom={-18}
          maxZoom={18}
          maxBounds={[[0, 0], [200, 200]]}
          style={{ height: "100vh", width: "100%" }}
        >
          <Markers />

          <div className="leaflet-top leaflet-left mt-20 ml-[10px] border-2 
                border-solid border-[#c7c7c7] w-[34px] h-[34] rounded">
            <div 
              className="flex justify-center items-center 
                p-2 bg-white rounded-sm pointer-events-auto hover:bg-gray-100" 
              onClick={() => {
                setShowPins(!showPins);
              }}
            >
              <BsPinAngleFill /> 
            </div>
          </div>

          <div className="leaflet-bottom leaflet-left mb-3 ml-3">
            <div className="flex items-center h-12">
              <span className="text-lg font-medium mr-3">Selected:</span> 
              { selectedIcon && <img src={require(`${selectedIcon}`)} style={{width: 40}} /> } 
            </div>
          </div>

          <LayersControl position="topright" collapsed={false}>
            <LayersControl.Overlay name="Slime Gordo's">
              <LayerGroup>
                { Object.keys(gordos).map(key => {
                  const gordo = gordos[key];

                  const icon = new L.icon({
                    iconUrl: require(`${gordo.image}`),
                    iconAnchor: [10, 20],
                    popupAnchor: [5, -15],
                    shadowUrl: null,
                    shadowSize: null,
                    shadowAnchor: null,
                    iconSize: [32, 32],
                  })

                  return (
                    <Marker position={gordo.position} icon={icon}>
                      <Popup>
                        {gordo.name} - {gordo.food}
                      </Popup>
                    </Marker>
                  )
                })}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Map Nodes">
              <LayerGroup>
                { Object.keys(mapNodes).map(key => {
                  const mapNode = mapNodes[key];

                  const icon = new L.icon({
                    iconUrl: require('./assets/icons/iconMapNode.png'),
                    iconAnchor: [10, 20],
                    popupAnchor: [5, -15],
                    shadowUrl: null,
                    shadowSize: null,
                    shadowAnchor: null,
                    iconSize: [32, 32],
                  })

                  return (
                    <Marker position={mapNode.position} icon={icon}>
                      <Popup>
                        {mapNode.name}
                      </Popup>
                    </Marker>
                  )
                })}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="7-Zee Rewards">
              <LayerGroup>
                { Object.keys(treasurePods).map(key => {
                  const treasurePod = treasurePods[key];

                  const icon = new L.icon({
                    iconUrl: require('./assets/icons/iconTreasurePod.png'),
                    iconAnchor: [10, 20],
                    popupAnchor: [5, -15],
                    shadowUrl: null,
                    shadowSize: null,
                    shadowAnchor: null,
                    iconSize: [32, 32],
                  })

                  return (
                    <Marker position={treasurePod.position} icon={icon}>
                      <Popup>
                        {treasurePod.name} - {treasurePod.contents}
                      </Popup>
                    </Marker>
                  )
                })}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Locked Doors">
              <Marker position={[0,0]}>
              </Marker>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Research Drones">
              <LayerGroup>
                { Object.keys(researchDrones).map(key => {
                  const researchDrone = researchDrones[key];

                  const icon = new L.icon({
                    iconUrl: require('./assets/icons/researchDroneFaceIcon.png'),
                    iconAnchor: [10, 20],
                    popupAnchor: [5, -15],
                    shadowUrl: null,
                    shadowSize: null,
                    shadowAnchor: null,
                    iconSize: [32, 32],
                  })

                  return (
                    <Marker position={researchDrone.position} icon={icon}>
                      <Popup>
                        {researchDrone.name}
                      </Popup>
                    </Marker>
                  )
                })}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>

          { userMarkers.map(marker => {
            const icon = new L.icon({
              iconUrl: require(`${marker.icon}`),
              iconAnchor: [10, 20],
              popupAnchor: [5, -15],
              shadowUrl: null,
              shadowSize: null,
              shadowAnchor: null,
              iconSize: [32, 32],
            })

            return (
              <Marker position={marker.position} icon={icon}>
                <Popup>
                  <button 
                    onClick={() => {
                      setSelectedIcon();
                      setUserMarkers(userMarkers.filter(el => { return !(el.position == marker.position) } ))
                    }
                  }
                  >Remove</button>
                </Popup>
              </Marker>
            )
          })}

          <ImageOverlay
            url={Map}
            bounds={[[0,0], [200, 200]]}
            opacity={0.8}
            zIndex={10}
            scale={1}
          >
          </ImageOverlay>
        </MapContainer> 
      </div>
    </div>
  );
}

export default App;
