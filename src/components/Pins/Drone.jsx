import React, { useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import {
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet';

import { iconTemplate, iconOpacity } from '../../entities/Icon';
import { handleChecked } from '../../utilities/handleChecked';

const Drone = (props) => {
  const key = props.key_;
  const researchDrones = props.data;
  const { setShowNote, userChecked } = props;

  const researchDrone = researchDrones[key];
  const listKey = researchDrone.position.join('');

  const [checked, setChecked] = useState(userChecked ? userChecked.some((userKey) => userKey === key) : false);

  const icon = new L.icon({
    ...iconTemplate,
    iconUrl: require('../../assets/icons/researchDroneFaceIcon.png'),
    className: `${checked && iconOpacity}`,
  });

  const Log = () => {
    const [showArchived, setShowArchived] = useState(false);

    const handleClick = () => {
      setShowNote(false);
      setShowArchived(false);
    };

    const handleToggle = () => setShowArchived(!showArchived);

    const textArray = !showArchived ? researchDrone.log : researchDrone.archive;

    return (
      <div className={`${!showArchived ? "border-[#0ba0fb] text-white" : "border-[#58faa4] text-[#58faa4]"} max-w-fit note`}>
        <div className="flex flex-col mb-7">
          <div className="flex justify-between items-center mb-7">
            <span className="font-medium text-2xl">Accessing GG.{ !showArchived ? "Log" : "Archive" }:</span>
            <AiOutlineClose onClick={handleClick} size={25} className="log-close" />
          </div>
          <div>
            {textArray.map((text) => <p className="text-lg monospace-font">{text}</p>)}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="text-base rounded bg-white py-1 px-2 text-black" onClick={handleToggle}>
            { !showArchived ? "Access Archive" : "Access Log" }
          </button>
        </div>
      </div>
    );
  };

  const handleShowNote = () => {
    setShowNote(typeof showNote === 'function' ? false : <Log />);
  };

  return (
    <Marker key={listKey} position={researchDrone.position} icon={icon}>
      <Popup>
        {researchDrone.name}
        <div className="flex justify-between items-center mt-2">
          <div className="mr-2">
            <label className="mr-1">Found:</label>
            <input type="checkbox" checked={checked} onChange={() => handleChecked(checked, setChecked, key)}  />
          </div>
          <button className="rounded bg-gray-100 border w-[5rem]" onClick={handleShowNote}>Access Log</button>
        </div>
      </Popup>
    </Marker>
  );
}

export default Drone;
