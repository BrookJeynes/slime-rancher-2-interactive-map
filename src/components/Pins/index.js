import { 
  gordos,
  mapNodes,
  treasurePods, 
  researchDrones, 
  lockedDoors,
  resources,
} from "../../data/index";

import Gordo from "./Gordo";
import MapNode from "./MapNode";
import Drone from "./Drone";
import LockedDoor from "./LockedDoor";
import Resource from "./Resource";
import ZeeReward from "./ZeeReward";

const userChecked = JSON.parse(localStorage.getItem("checked"));

const gordoList = Object.keys(gordos).map(key => {
  return (
    <Gordo key_={key} userChecked={userChecked} data={gordos} />
  );
});

const zeeRewardList = Object.keys(treasurePods).map(key => {
  return (
    <ZeeReward key_={key} userChecked={userChecked} data={treasurePods} />
  );
});

const lockedDoorList = Object.keys(lockedDoors).map(key => {
  return (
    <LockedDoor key_={key} userChecked={userChecked} data={lockedDoors} />
  );
});

const droneList = Object.keys(researchDrones).map(key => {
  return (
    <Drone key_={key} userChecked={userChecked} data={researchDrones} />
  );
});

const resourcesList = Object.keys(resources).map(key => {
  return (
    <Resource key_={key} data={resources} />
  );
});

const mapNodeList = Object.keys(mapNodes).map(key => {
  return (
    <MapNode key_={key} userChecked={userChecked} data={mapNodes} />
  );
});

export { gordoList, zeeRewardList, lockedDoorList, droneList, resourcesList, mapNodeList };
