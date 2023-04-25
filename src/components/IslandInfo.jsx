import React, { useState } from 'react';
import { BsArrowLeft, BsArrowRight, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import "leaflet/dist/leaflet.css";

const IslandInfo = () => {
    const islands = {
        "Ember Valley": {
            resources: [
                require("../assets/icons/Resources/iconCraftSilkySand.png"),
                require("../assets/icons/Resources/iconCraftLavaDust.png"),
                require("../assets/icons/Resources/iconCraftRadiantOre.png"),
                require("../assets/icons/Resources/iconCraftPrimordyOil.png"),
                require("../assets/icons/Resources/iconCraftLavaDust.png"),
                require("../assets/icons/Resources/iconCraftBuzzWax.png"),
                require("../assets/icons/Resources/iconCraftStrangeDiamond.png"),
            ],
            slimes: [
                require("../assets/icons/Slimes/iconSlimePink.png"),
                require("../assets/icons/Slimes/iconSlimePhosphor.png"),
                require("../assets/icons/Slimes/iconSlimeTabby.png"),
                require("../assets/icons/Slimes/iconSlimeAngler.png"),
                require("../assets/icons/Slimes/iconSlimeRock.png"),
                require("../assets/icons/Slimes/iconSlimeBatty.png"),
                require("../assets/icons/Slimes/iconSlimeRingtail.png"),
                require("../assets/icons/Slimes/iconSlimeBoom.png"),
                require("../assets/icons/Slimes/iconSlimePuddle.png"),
                require("../assets/icons/Slimes/iconSlimeCrystal.png"),
                require("../assets/icons/Slimes/iconSlimeFire.png"),
                require("../assets/icons/Slimes/iconSlimeCotton.png"),
            ],
        },
        "Rainbow Fields": {
            resources: [
                require("../assets/icons/Resources/iconCraftJellyStone.png"),
                require("../assets/icons/Resources/iconCraftDeepBrine.png"),
                require("../assets/icons/Resources/iconCraftStrangeDiamond.png"),
            ],
            slimes: [
                require("../assets/icons/Slimes/iconSlimePink.png"),
                require("../assets/icons/Slimes/iconSlimePhosphor.png"),
                require("../assets/icons/Slimes/iconSlimeCotton.png"),
                require("../assets/icons/Slimes/iconSlimeTabby.png"),
            ],
        },
        "Starlight Strand": {
            resources: [
                require("../assets/icons/Resources/iconCraftRadiantOre.png"),
                require("../assets/icons/Resources/iconCraftSilkySand.png"),
                require("../assets/icons/Resources/iconCraftWildHoney.png"),
                require("../assets/icons/Resources/iconCraftBuzzWax.png"),
                require("../assets/icons/Resources/iconCraftStrangeDiamond.png"),
            ],
            slimes: [
                require("../assets/icons/Slimes/iconSlimePink.png"),
                require("../assets/icons/Slimes/iconSlimePhosphor.png"),
                require("../assets/icons/Slimes/iconSlimeCotton.png"),
                require("../assets/icons/Slimes/iconSlimeAngler.png"),
                require("../assets/icons/Slimes/iconSlimeRock.png"),
                require("../assets/icons/Slimes/iconSlimeFlutter.png"),
                require("../assets/icons/Slimes/iconSlimeRingtail.png"),
                require("../assets/icons/Slimes/iconSlimeHoney.png"),
                require("../assets/icons/Slimes/iconSlimeHunter.png"),
            ],
        },
        "Powderfall Bluffs": {
            resources: [
                require("../assets/icons/Resources/iconCraftSlimeFossil.png"),
                require("../assets/icons/Resources/iconCraftPerfectSnowflake.png"),
                require("../assets/icons/Resources/iconCraftSunSap.png"),
                require("../assets/icons/Resources/iconCraftSnowball.png"),
            ],
            slimes: [
                require("../assets/icons/Slimes/iconSlimeSaber.png"),
                require("../assets/icons/Slimes/iconSlimeCotton.png"),
                require("../assets/icons/Slimes/iconSlimePink.png"),
                require("../assets/icons/Slimes/iconSlimePhosphor.png"),
            ],
        },
    }
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);
    const [resourceSlimeSwitcher, setResourceSlimeSwitcher] = useState(true);

    return (
        <div className="island-info-container">
            {show ?
                <div className="flex flex-col justify-between items-center py-4 px-4 pb-0 bg-[#3CBCD5] border-solid border-2 border-[#3296AA] h-96 w-96 mr-5 mb-5 rounded-md">
                    <div className="flex justify-between items-center w-full pointer-events-auto">
                        <button onClick={() => {
                            setIndex((index - 1) % 4)
                        }}>
                            <BsArrowLeft size={24} />
                        </button>
                        <h1 className="text-outline bg-gradient-to-r from-[#ED3DA7] to-[#BD1379] text-transparent bg-clip-text font-extrabold text-4xl">{Object.keys(islands)[Math.abs(index) % Object.keys(islands).length]}</h1>
                        <button onClick={() => {
                            setIndex((index + 1) % 4)
                        }}>
                            <BsArrowRight size={24} />
                        </button>
                    </div>
                    <div className="flex justify-around items-center p-2 w-full h-1/6 my-1">
                        <button onClick={() => setResourceSlimeSwitcher(true)} className={`flex justify-center items-center px-2 w-1/3 h-[85%] rounded-[2rem] ${resourceSlimeSwitcher ? "bg-[#EDED3B]" : "bg-[#82FCBF]"}`}>
                            <span className="text-lg">Resources</span>
                        </button>
                        <button onClick={() => setResourceSlimeSwitcher(false)} className={`flex justify-center items-center px-2 w-1/3 h-[85%] rounded-[2rem] ${!resourceSlimeSwitcher ? "bg-[#EDED3B]" : "bg-[#82FCBF]"}`}>
                            <span className="text-lg">Slimes</span>
                        </button>
                    </div>
                    <div className="h-full p-2 bg-[#D2F0E6] rounded-[1.3rem] w-full">
                        <div className="flex flex-wrap">
                        {
                            resourceSlimeSwitcher ?
                                islands[Object.keys(islands)[Math.abs(index)]]
                                    .resources.map(resource =>
                                        <img src={resource} alt={resource} className="w-[3rem] mx-1" />
                                    )
                                :
                                islands[Object.keys(islands)[Math.abs(index)]]
                                    .slimes.map(slime =>
                                        <img src={slime} alt={slime} className="w-[3rem] mx-2" />
                                    )
                        }
                        </div>
                    </div>
                    <button
                        className="flex text-lg justify-between items-center h-8 w-96 p-4 mt-2 rounded"
                        onClick={() => setShow(!show)}
                    >
                        Island information <span>{show ? <BsChevronDown /> : <BsChevronUp />}</span>
                    </button>
                </div>
                :
                <button
                    className="flex text-lg justify-between items-center bg-[#3CBCD5] border-solid border-2 border-[#3296AA] h-8 w-96 mr-5 p-4 mb-5 rounded-md"
                    onClick={() => setShow(!show)}
                >
                    Island information <span>{show ? <BsChevronDown /> : <BsChevronUp />}</span>
                </button>
            }
        </div>
    );
}

export default IslandInfo;
