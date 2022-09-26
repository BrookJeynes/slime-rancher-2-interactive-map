import React, { useState } from "react";

import {
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet';

import { iconTemplate } from "../../entities/Icon"; 
import { handleChecked } from "../../utilities/handleChecked";

const MapNode = (props) => {
  const key = props.key_;
  const userChecked = props.userChecked;
  const mapNodes = props.data;

  const mapNode = mapNodes[key];
  const listKey = mapNode.position.join('');

  const [checked, setChecked] = useState(userChecked ? userChecked.some((userKey) => userKey === key) : false);

  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require('../../assets/icons/iconMapNode.png'),
    className: `${checked && "opacity-75"}`,
  });

  return (
    <Marker key={listKey} position={mapNode.position} icon={icon}>
      <Popup>
        {mapNode.name}
        <div className="mt-1">
          <label className="mr-1">Found:</label>
          <input type="checkbox" checked={checked} onChange={() => handleChecked(checked, setChecked, key)}  />
        </div>
      </Popup>
    </Marker>
  );
}

export default MapNode;
