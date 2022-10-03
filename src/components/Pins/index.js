import {
  gordos,
  mapNodes,
  treasurePods,
  researchDrones,
  lockedDoors,
  resources,
} from '../../data/index';

import Gordo from './Gordo';
import MapNode from './MapNode';
import Drone from './Drone';
import LockedDoor from './LockedDoor';
import Resource from './Resource';
import ZeeReward from './ZeeReward';

const userChecked = JSON.parse(localStorage.getItem('checked'));

const gordoList = Object.keys(gordos).map(key => {
  return (
    <Gordo key={key} key_={key} userChecked={userChecked} data={gordos} />
  );
});

const zeeRewardList = Object.keys(treasurePods).map(key => {
  return (
    <ZeeReward key={key} key_={key} userChecked={userChecked} data={treasurePods} />
  );
});

const lockedDoorList = Object.keys(lockedDoors).map(key => {
  return (
    <LockedDoor key={key} key_={key} userChecked={userChecked} data={lockedDoors} />
  );
});

const DroneList = ({ setShowNote }) => {
  return (
    Object.keys(researchDrones).map(key => {
      return (
        <Drone
          key={key}
          key_={key}
          userChecked={userChecked}
          data={researchDrones}
          setShowNote={setShowNote}
        />
      );
    })
  );
};

const resourcesList = Object.keys(resources).map(key => {
  return (
    <Resource key={key} key_={key} data={resources} />
  );
});

const mapNodeList = Object.keys(mapNodes).map(key => {
  return (
    <MapNode key={key} key_={key} userChecked={userChecked} data={mapNodes} />
  );
});

export { gordoList, zeeRewardList, lockedDoorList, DroneList, resourcesList, mapNodeList };
