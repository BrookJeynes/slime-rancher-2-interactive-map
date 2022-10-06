import React from "react";

import { Polyline } from "react-leaflet";

const TeleportLines = (props) => {
  const key = props.key_;
  const teleportLines = props.data;

  const teleportLine = teleportLines[key];
  const listKey = teleportLine.positions.join("");

  const pathOptions = {
    color: "white",
    weight: "5",
    dashArray: "2, 10",
    dashOffset: "0",
  };

  return (
    <Polyline
      key={listKey}
      pathOptions={pathOptions}
      positions={teleportLine.positions}
    ></Polyline>
  );
};

export default TeleportLines;
