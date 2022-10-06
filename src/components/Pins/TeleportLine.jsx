import React from "react";

import '@elfalem/leaflet-curve'
import L from "leaflet";
import { useMap } from 'react-leaflet/hooks'

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


  // Math taken from https://ryancatalani.medium.com/creating-consistently-curved-lines-on-leaflet-b59bc03fa9dc
  // Might need to adjust it to our needs or manually calculate the middle point from the in-game map
  var latlngs = [];

  var latlng1 = teleportLine.positions[0],
  latlng2 = teleportLine.positions[1]

  var offsetX = latlng2[1] - latlng1[1],
  offsetY = latlng2[0] - latlng1[0];

  var r = Math.sqrt( Math.pow(offsetX, 2) + Math.pow(offsetY, 2) ),
  theta = Math.atan2(offsetY, offsetX);

  var thetaOffset = (3.14/10);

  var r2 = (r/2)/(Math.cos(thetaOffset)),
  theta2 = theta + thetaOffset;

  var midpointX = (r2 * Math.cos(theta2)) + latlng1[1],
  midpointY = (r2 * Math.sin(theta2)) + latlng1[0];

  var midpointLatLng = [midpointY, midpointX];

  latlngs.push(latlng1, midpointLatLng, latlng2);

  const map = useMap()

  L.curve(
    [
      'M', latlng1,
      'Q', midpointLatLng,
      latlng2
    ], pathOptions).addTo(map);

  // Probably doesn't need to be a component anymore due to it being added to the map via .addTo()
  return (
  <></>
  );
};

export default TeleportLines;
