import React, { useState } from "react";

import {
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet';

import { iconTemplate } from "../../entities/Icon"; 
import { handleChecked } from "../../utilities/handleChecked";

const ZeeReward = (props) => {
  const key = props.key_;
  const userChecked = props.userChecked;
  const treasurePods = props.data;

  const treasurePod = treasurePods[key];
  const listKey = treasurePod.position.join('');
 
  const [checked, setChecked] = useState(userChecked ? userChecked.some((userKey) => userKey === key) : false);

  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require('../../assets/icons/iconTreasurePod.png'),
    className: `${checked && "opacity-75"}`,
  });

  return (
    <Marker key={listKey} position={treasurePod.position} icon={icon} style={{opacity: 0.5}}>
      <Popup>
        <div className="flex flex-col">
          {treasurePod.name} - {treasurePod.contents}
          <div className="mt-1">
            <label className="mr-1">Found:</label>
            <input type="checkbox" checked={checked} onChange={() => handleChecked(checked, setChecked, key)}  />
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default ZeeReward;
