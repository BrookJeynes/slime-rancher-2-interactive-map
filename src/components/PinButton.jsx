import { BsPinAngleFill } from "react-icons/bs";

const PinButton = (props) => {
  const { showPins, setShowPins } = props;

  return (
    <div className="leaflet-top leaflet-left mt-20 ml-[10px] border-2 
      border-solid border-[#c7c7c7] w-[34px] h-[34] rounded">
      <div 
        className="flex justify-center items-center 
        p-2 bg-white rounded-sm pointer-events-auto hover:bg-gray-100" 
        onClick={() => {
          setShowPins(!showPins);
        }}
      >
        <BsPinAngleFill /> 
      </div>
    </div>
  )
}

export default PinButton;
