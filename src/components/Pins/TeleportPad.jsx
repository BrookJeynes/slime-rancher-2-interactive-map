import React, { useState } from "react";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { iconTemplate, iconOpacity } from "../../entities/Icon";
import { handleChecked } from "../../utilities/handleChecked";

const TeleportPad = (props) => {
  const key = props.key_;
  const userChecked = props.userChecked;
  const teleportPads = props.data;

  const teleportPad = teleportPads[key];
  const listKey = teleportPad.position.join("");

  const [checked, setChecked] = useState(
    userChecked ? userChecked.some((userKey) => userKey === key) : false
  );

  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require("../../assets/icons/Pins/xMark.png"),
    className: `${checked && iconOpacity}`,
  });

  return (
    <Marker key={listKey} position={teleportPad.position} icon={icon}>
      <Popup>
        {teleportPad.name}
        <div className="mt-1">
          <label className="mr-1">Found:</label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => handleChecked(checked, setChecked, key)}
          />
        </div>
      </Popup>
    </Marker>
  );
};

export default TeleportPad;
