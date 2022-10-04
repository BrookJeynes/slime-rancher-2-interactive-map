import React, { useState } from 'react';

import {
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet';

import { iconTemplate, iconOpacity } from '../../entities/Icon';
import { handleChecked } from '../../utilities/handleChecked';

const Gordo = (props) => {
  const key = props.key_;
  const userChecked = props.userChecked;
  const gordos = props.data;

  const gordo = gordos[key];
  const listKey = gordo.name.toLowerCase().replace(' ', '');

  const [checked, setChecked] = useState(userChecked ? userChecked.some((userKey) => userKey === key) : false);

  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require(`../../assets/icons/Gordo/${gordo.image}`),
    className: `${checked && iconOpacity}`,
  });

  return (
    <Marker key={listKey} position={gordo.position} icon={icon}>
      <Popup>
        {gordo.name} - {gordo.food}
        <div className="mt-1">
          <label className="mr-1">Found:</label>
          <input type="checkbox" checked={checked} onChange={() => handleChecked(checked, setChecked, key)}  />
        </div>
      </Popup>
    </Marker>
  );
}

export default Gordo;
