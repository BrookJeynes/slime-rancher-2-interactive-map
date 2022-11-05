import React, { useState } from 'react';

const IslandInfo = () => {
  return (
    <div className="leaflet-bottom leaflet-right flex flex-col justify-between items-center p-4 bg-[#3CBCD5] border-solid border-2 border-[#3296AA] h-[25rem] w-[25rem] mr-5 mb-5 rounded-[1rem]">
      <h1 className="text-outline bg-gradient-to-r from-[#ED3DA7] to-[#BD1379] text-transparent bg-clip-text font-extrabold text-4xl">Ember Valley</h1>
      <div className="flex justify-around items-center p-2 w-full h-1/6 my-1">
        <div className="flex justify-center items-center px-2 w-1/3 h-[85%] rounded-[2rem] bg-[#EDED3B]">
          <span className="text-lg">Resources</span>
        </div>
        <div className="flex justify-center items-center px-2 w-1/3 h-[85%] rounded-[2rem] bg-[#82FCBF]">
          <span className="text-lg">Slimes</span>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center bg-[#B4E4E6] p-2 w-full h-full rounded-[1.3rem]">
        <div className="flex flex-col justify-between items-center bg-[#D2F0E6] w-full h-4/6 rounded-[1.3rem]">
        </div>
      </div>
    </div>
  );
}

export default IslandInfo;
