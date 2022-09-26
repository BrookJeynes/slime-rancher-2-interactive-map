import React, { useState, useEffect } from 'react';
import './App.css';

import Map from "./assets/map.png"

import {
  MapContainer,
  ImageOverlay,
  LayersControl,
  Marker,
  Popup,
  LayerGroup,
} from 'react-leaflet'
import L from 'leaflet';

// Data
import { 
  gordos, 
  mapNodes,
  pins, 
  treasurePods, 
  researchDrones, 
  lockedDoors,
  resources,
} from "./data/index";

import Markers from "./components/Markers";
import Copyright from "./components/Copyright";
import SaveButton from "./components/SaveButton";
import PinButton from "./components/PinButton";

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
        { Object.keys(pins).map((key, index) => pins[key].type == type && <Pin key={index} pin={pins[key]} setSelectedIcon={setSelectedIcon} />) }
      </div>
    </div>
  );
}

const PinSelector = (props) => {
  const { showPins, setSelectedIcon } = props;
  const [selectedType, setSelectedType] = useState("Food");

  const types = [
    "Food",
    "Plorts", 
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
          { types.map((type, key) => <option key={key} value={type}>{type}</option>)}
        </select>
      </div>
      <div className="flex">
        { types.map((type, key) => selectedType == type && <PlortsSelect key={key} type={type} setSelectedIcon={setSelectedIcon} />) }
      </div>
    </div>
  )
}

const App = () => {
  const center = [50, 150];
  const [selectedIcon, setSelectedIcon] = useState()
  const [userMarkers, setUserMarkers] = useState([]);
  const [showPins, setShowPins] = useState(true);

  const iconTemplate = {
    iconUrl: "",
    iconAnchor: [10, 20],
    popupAnchor: [5, -15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [32, 32],
  }

  useEffect(() => {
    const userPins = JSON.parse(localStorage.getItem('pins'));
    
    if (userPins) {
      setUserMarkers(userPins)
    }
  }, [])

  return (
    <div className="flex flex-col">
      <Copyright />

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
          <Markers
            selectedIcon={selectedIcon}
            setUserMarkers={setUserMarkers}
            userMarkers={userMarkers}
            />

          <div className="leaflet-bottom leaflet-right mr-[4.5rem]">
            <span className="text-base">Made with love by Chooky {"<3"}</span>
          </div>

          <PinButton 
            showPins={showPins}
            setShowPins={setShowPins}
            />

          <SaveButton
            userMarkers={userMarkers}
            />          

          {/* Selected icon */}
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
                    ...iconTemplate,
                    iconUrl: require(`${gordo.image}`),
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
                    ...iconTemplate,
                    iconUrl: require('./assets/icons/iconMapNode.png'),
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
                    ...iconTemplate,
                    iconUrl: require('./assets/icons/iconTreasurePod.png'),
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
              <LayerGroup>
                { Object.keys(lockedDoors).map(key => {
                  const lockedDoor = lockedDoors[key];

                  const icon = new L.icon({
                    ...iconTemplate,
                    iconUrl: require(`${lockedDoor.image}`),
                  })

                  return (
                    <Marker position={lockedDoor.position} icon={icon}>
                      <Popup>
                        {lockedDoor.name} - x{lockedDoor.amount} plort(s)
                      </Popup>
                    </Marker>
                  )
                })}
              </LayerGroup> 
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Research Drones">
              <LayerGroup>
                { Object.keys(researchDrones).map(key => {
                  const researchDrone = researchDrones[key];

                  const icon = new L.icon({
                    ...iconTemplate,
                    iconUrl: require('./assets/icons/researchDroneFaceIcon.png'),
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
            <LayersControl.Overlay name="Resource Locations">
              <LayerGroup>
                { Object.keys(resources).map(key => {
                  const resource = resources[key];

                  const icon = new L.icon({
                    ...iconTemplate,
                    iconUrl: require(`${resource.image}`), 
                  })

                  return (
                    <Marker position={resource.position} icon={icon}>
                      <Popup>
                        {resource.name}
                      </Popup>
                    </Marker>
                  )
                })}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>

          { userMarkers.map(marker => {
            const icon = new L.icon({
              ...iconTemplate,
              iconUrl: require(`${marker.icon}`),
            })

            return (
              <Marker position={marker.position} icon={icon}>
                <Popup>
                  <button 
                    onClick={() => {
                      setSelectedIcon();
                      setUserMarkers(userMarkers.filter(currentMarker => { return !(currentMarker.position == marker.position) } ))
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
