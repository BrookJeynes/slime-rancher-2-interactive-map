import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import {
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet';

import { iconTemplate, iconOpacity } from "../../entities/Icon"; 
import { handleChecked } from "../../utilities/handleChecked";

const Drone = (props) => {
  const key = props.key_;
  const userChecked = props.userChecked;
  const researchDrones = props.data;
  
  const researchDrone = researchDrones[key];
  const listKey = researchDrone.position.join('');

  const [checked, setChecked] = useState(userChecked ? userChecked.some((userKey) => userKey === key) : false);
  const [showNote, setShowNote] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require('../../assets/icons/researchDroneFaceIcon.png'),
    className: `${checked && iconOpacity}`,
  });

  return (
    <Marker key={listKey} position={researchDrone.position} icon={icon}>
      <Popup>
        {researchDrone.name}
        <div className="flex justify-between items-center mt-2">
          <div className="mr-2">
            <label className="mr-1">Found:</label>
            <input type="checkbox" checked={checked} onChange={() => handleChecked(checked, setChecked, key)}  />
          </div>
          <button className="rounded bg-gray-100 border w-[5rem]" onClick={() => setShowNote(true)}>Access Log</button>
        </div>
      </Popup>

      { showNote && 
        <div className={`leaflet-bottom leaflet-right ${!showArchived ? "border-[#0ba0fb] text-white" : "border-[#58faa4] text-[#58faa4]"} note`}>
          <div className="flex flex-col mb-7">
            <div className="flex justify-between items-center mb-7">
              <span className="font-medium text-2xl">Accessing GG.{ !showArchived ? "Log" : "Archive" }:</span>
              <AiOutlineClose onClick={() => {setShowNote(false); setShowArchived(false)}} size={25} />
            </div>
            <div>
              <pre className="text-lg">{ !showArchived ? researchDrone.log : researchDrone.archive}</pre>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="text-base rounded bg-white py-1 px-2 text-black" onClick={() => setShowArchived(!showArchived)}>{ !showArchived ? "Access Archive" : "Access Log" }</button>
          </div>
        </div>
      }
    </Marker>
  );
}

export default Drone;
