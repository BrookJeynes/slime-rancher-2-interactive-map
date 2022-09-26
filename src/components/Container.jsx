import { useEffect, useState } from 'react';
import {
  MapContainer,
  ImageOverlay,
  LayersControl,
  Marker,
  Popup,
  LayerGroup,
} from 'react-leaflet'
import L from 'leaflet';

import PinSelector from './PinSelector';
import Markers from './Markers';
import SaveButton from './SaveButton';
import PinButton from './PinButton';
import Map from '../assets/map.png';

import { 
  gordos, 
  mapNodes,
  treasurePods, 
  researchDrones, 
  lockedDoors,
  resources,
} from "../data/index";

import 'leaflet/dist/leaflet.css';

const iconTemplate = {
  iconUrl: '',
  iconAnchor: [10, 20],
  popupAnchor: [5, -15],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [32, 32],
};

const gordoList = Object.keys(gordos).map(key => {
  const gordo = gordos[key];
  const listKey = gordo.name.toLowerCase().replace(' ', '');
  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require(`../assets/icons/Gordo/${gordo.image}`),
  });

  return (
    <Marker key={listKey} position={gordo.position} icon={icon}>
      <Popup>
        {gordo.name} - {gordo.food}
      </Popup>
    </Marker>
  );
});

const mapNodeList = Object.keys(mapNodes).map(key => {
  const mapNode = mapNodes[key];
  const listKey = mapNode.position.join('');
  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require('../assets/icons/iconMapNode.png'),
  });

  return (
    <Marker key={listKey} position={mapNode.position} icon={icon}>
      <Popup>
        {mapNode.name}
      </Popup>
    </Marker>
  );
});

const zeeRewardList = Object.keys(treasurePods).map(key => {
  const treasurePod = treasurePods[key];
  const listKey = treasurePod.position.join('');
  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require('../assets/icons/iconTreasurePod.png'),
  });

  return (
    <Marker key={listKey} position={treasurePod.position} icon={icon}>
      <Popup>
        {treasurePod.name} - {treasurePod.contents}
      </Popup>
    </Marker>
  );
});

const lockedDoorList = Object.keys(lockedDoors).map(key => {
  const lockedDoor = lockedDoors[key];
  const listKey = lockedDoor.position.join('');
  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require(`../assets/icons/${lockedDoor.image}`),
  });

  return (
    <Marker key={listKey} position={lockedDoor.position} icon={icon}>
      <Popup>
        {lockedDoor.name} - x{lockedDoor.amount} plort{lockedDoor.amount === 1 ? '' : 's'}
      </Popup>
    </Marker>
  );
});

const droneList = Object.keys(researchDrones).map(key => {
  const researchDrone = researchDrones[key];
  const listKey = researchDrone.position.join('');
  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require('../assets/icons/researchDroneFaceIcon.png'),
  });

  return (
    <Marker key={listKey} position={researchDrone.position} icon={icon}>
      <Popup>
        {researchDrone.name}
      </Popup>
    </Marker>
  );
});

const resourcesList = Object.keys(resources).map(key => {
  const resource = resources[key];
  const listKey = resource.position.join('');
  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require(`../assets/icons/${resource.image}`),
  });

  return (
    <Marker key={listKey} position={resource.position} icon={icon}>
      <Popup>
        {resource.name}
      </Popup>
    </Marker>
  );
});

export default function Container() {
  const [selectedIcon, setSelectedIcon] = useState('')
  const [userMarkers, setUserMarkers] = useState([]);
  const [showPins, setShowPins] = useState(true);

  const userMarkerList = userMarkers.map((marker) => {
    const listKey = marker.position.join('');
    const icon = new L.icon({
      ...iconTemplate,
      iconUrl: marker.icon,
    });

    const handleClick = () => {
      setSelectedIcon('');
      setUserMarkers(userMarkers.filter((currentMarker) => { return !(currentMarker.position === marker.position) } ))
    }

    return (
      <Marker key={listKey} position={marker.position} icon={icon}>
        <Popup>
          <button onClick={handleClick}>Remove</button>
        </Popup>
      </Marker>
    );
  });

  useEffect(() => {
    const userPins = JSON.parse(localStorage.getItem('pins'));

    if (userPins) {
      setUserMarkers(userPins);
    }
  }, []);

  return (
    <div className="flex flex-row">
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
        maxBounds={[[0, 0], [200, 200]]}
        style={{ height: '100vh', width: '100%', zIndex: 1 }}
      >
        <Markers
          selectedIcon={selectedIcon}
          setUserMarkers={setUserMarkers}
          userMarkers={userMarkers}
        />

        <PinButton showPins={showPins} setShowPins={setShowPins} />

        <SaveButton userMarkers={userMarkers} />

        {showPins && selectedIcon !== '' ? <div className="pl-1.5 pr-1.5 bg-white leaflet-bottom leaflet-left mb-3 ml-3 rounded border-2 border-solid border-[#c7c7c7]">
          <div className="flex items-center h-12">
            <span className="text-lg font-medium mr-3">Selected pin:</span>
            { selectedIcon && <img src={selectedIcon} alt="Selected pin icon" style={{width: 40}} /> }
          </div>
        </div> : null}

        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay checked name="Slime Gordos">
            <LayerGroup>
              {gordoList}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Map Nodes">
            <LayerGroup>
              {mapNodeList}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="7-Zee Rewards">
            <LayerGroup>
              {zeeRewardList}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Locked Doors">
            <LayerGroup>
              {lockedDoorList}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Research Drones">
            <LayerGroup>
              {droneList}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Resources">
            <LayerGroup>
              {resourcesList}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>

        {userMarkerList}

        <ImageOverlay
          url={Map}
          bounds={[[0,0], [200, 200]]}
          zIndex={10}
          scale={1}
        />
      </MapContainer>
    </div>
  );
}
