import { useState } from 'react';
import { pins } from '../data/index';

export const Pin = (props) => {
  const { pin, setSelectedIcon } = props;
  const imageSource = require(`../assets/icons/${pin.icon}`);

  const handlePinClick = (e) => {
    setSelectedIcon(require(`../assets/icons/${e.target.name}`))
  };

  return (
    <div onClick={handlePinClick}>
      <img src={imageSource} name={pin.icon} alt={`${pin.icon} pin icon`} style={{ width: 40 }} />
    </div>
  );
}

function PinList(props) {
  const { setSelectedIcon, type } = props;

  const list = Object.keys(pins).map((key) => {
    const listKey = key.toLowerCase().replace(' ', '');

    if (pins[key].type === type) {
      return <Pin key={listKey} pin={pins[key]} setSelectedIcon={setSelectedIcon} />
    }

    return null;
  });

  return (
    <div className="flex flex-col p-3 w-full">
      <span>Pins</span>
        {list}
    </div>
  );
}


export default function PinSelector(props) {
  const { showPins, setSelectedIcon } = props;
  const [selectedType, setSelectedType] = useState('Food');

  const types = [
    'Food',
    'Plorts',
    'Utility',
    'Resources',
  ];

  const typeList = types.map((type) => <option key={type} value={type}>{type}</option>);
  const plortsList = types.map((type) => {
    const listKey = type.toLowerCase().replace(' ', '');

    if (selectedType === type) {
      return <PinList key={listKey} type={type} setSelectedIcon={setSelectedIcon} />;
    }

    return null;
  });

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className={`flex flex-col items-start bg-white drop-shadow-lg ${!showPins && "hidden"} pins overflow-y-scroll min-w-fit`}>
      <div className="flex flex-col justify-between p-3 w-full 50">
        <span className="text-xl">User pins</span>
      </div>
      <div className="flex flex-col my-3 p-3 w-full">
        Category
        <select value={selectedType} onChange={handleChange}>
          {typeList}
        </select>
      </div>
      {plortsList}
    </div>
  );
}
