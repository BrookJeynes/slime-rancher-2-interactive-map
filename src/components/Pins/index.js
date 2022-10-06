import {
  gordos,
  lockedDoors,
  mapNodes,
  regions,
  researchDrones,
  resources,
  teleportLines,
  teleportPads,
  treasurePods,
} from "../../data/index";

import Drone from "./Drone";
import Gordo from "./Gordo";
import LockedDoor from "./LockedDoor";
import MapNode from "./MapNode";
import Region from "./Region";
import Resource from "./Resource";
import TeleportLine from "./TeleportLine";
import TeleportPad from "./TeleportPad";
import ZeeReward from "./ZeeReward";

const userChecked = JSON.parse(localStorage.getItem("checked"));

const gordoList = Object.keys(gordos).map((key) => {
  return <Gordo key={key} key_={key} userChecked={userChecked} data={gordos} />;
});

const zeeRewardList = Object.keys(treasurePods).map((key) => {
  return (
    <ZeeReward
      key={key}
      key_={key}
      userChecked={userChecked}
      data={treasurePods}
    />
  );
});

const lockedDoorList = Object.keys(lockedDoors).map((key) => {
  return (
    <LockedDoor
      key={key}
      key_={key}
      userChecked={userChecked}
      data={lockedDoors}
    />
  );
});

const DroneList = ({ setShowNote }) => {
  return Object.keys(researchDrones).map((key) => {
    return (
      <Drone
        key={key}
        key_={key}
        userChecked={userChecked}
        data={researchDrones}
        setShowNote={setShowNote}
      />
    );
  });
};

const resourcesList = Object.keys(resources).map((key) => {
  return <Resource key={key} key_={key} data={resources} />;
});

const mapNodeList = Object.keys(mapNodes).map((key) => {
  return (
    <MapNode key={key} key_={key} userChecked={userChecked} data={mapNodes} />
  );
});

const Regions = () => {
  return Object.keys(regions).map((key) => {
    return <Region key={key} key_={key} data={regions} />;
  });
};

const teleportLineList = Object.keys(teleportLines).map((key) => {
  return <TeleportLine key={key} key_={key} data={teleportLines} />;
});

const teleportPadList = Object.keys(teleportPads).map((key) => {
  return <TeleportPad key={key} key_={key} data={teleportPads} />;
});

export {
  DroneList,
  gordoList,
  lockedDoorList,
  mapNodeList,
  Regions,
  resourcesList,
  teleportLineList,
  teleportPadList,
  zeeRewardList,
};
