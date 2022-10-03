import React from 'react';

import {
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet';

import { iconTemplate } from '../../entities/Icon';

const Resource = (props) => {
  const key = props.key_;
  const resources = props.data;

  const resource = resources[key];
  const listKey = resource.position.join('');

  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require(`../../assets/icons/${resource.image}`),
  });

  return (
    <Marker key={listKey} position={resource.position} icon={icon}>
      <Popup>
        {resource.name}
      </Popup>
    </Marker>
  );
}

export default Resource;
