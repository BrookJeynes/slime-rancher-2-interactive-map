import React from "react";

import { Polyline } from "react-leaflet"
import { default as bezierSpline } from "@turf/bezier-spline";
import * as helpers from "@turf/helpers";

const TeleportLines = (props) => {
  const key = props.key_;
  const teleportLines = props.data;

  const teleportLine = teleportLines[key];
  const listKey = teleportLine.positions.join("");

  const pathOptions = {
    color: "white",
    weight: "4",
    dashArray: "1, 8",
    dashOffset: "0",
  };

  const line = helpers.lineString([teleportLine.positions[0], teleportLine.midpoint, teleportLine.positions[1]])

  return (
    <Polyline
      key={listKey}
      pathOptions={pathOptions}
      positions={bezierSpline(line).geometry.coordinates}
    ></Polyline>
  )
};

export default TeleportLines;
