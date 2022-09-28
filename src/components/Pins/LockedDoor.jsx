import React, { useState } from "react";

import {
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet';

import { iconTemplate, iconOpacity } from "../../entities/Icon"; 
import { handleChecked } from "../../utilities/handleChecked";

const LockedDoor = (props) => {
  const key = props.key_;
  const userChecked = props.userChecked;
  const lockedDoors = props.data;

  const lockedDoor = lockedDoors[key];
  const listKey = lockedDoor.position.join('');

  const [checked, setChecked] = useState(userChecked ? userChecked.some((userKey) => userKey === key) : false);

  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require(`../../assets/icons/${lockedDoor.image}`),
    className: `${checked && iconOpacity}`,
  });

  return (
    <Marker key={listKey} position={lockedDoor.position} icon={icon}>
      <Popup>
        {lockedDoor.name} - x{lockedDoor.amount} plort{lockedDoor.amount === 1 ? '' : 's'}
        <div className="mt-1">
            <label className="mr-1">Found:</label>
            <input type="checkbox" checked={checked} onChange={() => handleChecked(checked, setChecked, key)}  />
          </div>
      </Popup>
    </Marker>
  );
}

export default LockedDoor;
