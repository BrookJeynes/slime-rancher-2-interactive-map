import React, { useState } from "react";

import {
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet';

import { iconTemplate, iconOpacity } from "../../entities/Icon"; 
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
    className: `${checked && iconOpacity}`,
  });

  return (
    <Marker key={listKey} position={treasurePod.position} icon={icon} style={{opacity: 0.5}}>
      <Popup>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="my-1 flex items-center">
              <input type="checkbox" checked={checked} onChange={() => handleChecked(checked, setChecked, key)}  />
              <span className="ml-1 font-medium">{treasurePod.name}</span>
            </div>
            { treasurePod.required && <span>{treasurePod.required} required</span> }
          </div>
          <hr />
          <span className="mt-1"><span className="font-medium">Contents:</span> {treasurePod.contents}</span>
          <span><span className="font-medium">Description:</span> {treasurePod.description}</span>
          <span className="mb-1"><span className="font-medium">Location:</span> <a href={treasurePod.embedd} target="_blank" rel="noreferrer noopener">Video showcase</a> by TrophyTom</span>
        </div>
      </Popup>
    </Marker>
  )
}

export default ZeeReward;
