import { AiOutlineSave } from "react-icons/ai";

const SaveButton = (props) => {
  const userMarkers = props.userMarkers;

  return (
    <div className="leaflet-top leaflet-left mt-32 ml-[10px] border-2 
      border-solid border-[#c7c7c7] w-[34px] h-[34] rounded">
      <div 
        className="flex justify-center items-center 
        p-1.5 bg-white rounded-sm pointer-events-auto hover:bg-gray-100" 
        onClick={() => {
          localStorage.setItem("pins", JSON.stringify(userMarkers));
        }}
      >
        <AiOutlineSave size={18} /> 
      </div>
    </div>
  );
}

export default SaveButton;
