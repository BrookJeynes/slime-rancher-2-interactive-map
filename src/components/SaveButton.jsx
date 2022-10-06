import { useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';

const SaveButton = (props) => {
  const [animate, setAnimate] = useState(false);
  const userMarkers = props.userMarkers;

  const classes = {
    container: `leaflet-top leaflet-left mt-32 ml-[10px] border-2 border-solid
      border-[#c7c7c7] w-[34px] h-[34] rounded save-icon-transition`,
    actionDiv: `flex justify-center items-center p-1.5 rounded-sm
      pointer-events-auto`,
  };

  const handleSave = () => {
    setAnimate(true);

    localStorage.setItem('pins', JSON.stringify(userMarkers));

    setTimeout(() => {
      setAnimate(false);
    }, 400);
  };

  return (
    <div className={`${classes.container} ${animate ? 'save-icon-background' : 'bg-white hover:bg-gray-100'}`}>
      <div className={classes.actionDiv} onClick={handleSave}>
        <AiOutlineSave size={18} />
      </div>
    </div>
  );
}

export default SaveButton;
