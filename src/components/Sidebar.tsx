import { useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiFillDiscord, AiFillGithub } from "react-icons/ai";

import CollectablesTracker from "./CollectablesTracker";
import { SidebarPins } from "./UserPins";
import IslandInfo from "./IslandInfo";
import { Pin } from "../types";
import { discord_link, github_link } from "../globals";

export default function Sidebar({
    selected_pin,
    setSelectedPin,
}: {
    selected_pin: Pin | undefined,
    setSelectedPin: React.Dispatch<React.SetStateAction<Pin | undefined>>
}) {
    const [show_sidebar, setShowSidebar] = useState(false);

    return (
        <div className="absolute">
            <div
                className={`transition-all duration-500 fixed top-0 left-0 h-full bg-gradient-to-br from-blue-950 to-indigo-950 text-white border-r-solid border-r-[1px] ${show_sidebar ? "translate-x-0" : "-translate-x-full"} w-2/3 md:w-1/4 z-50 overflow-scroll`}
            >
                <div className="flex flex-col gap-5 px-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold pt-4 text-center">Slime Rancher 2 Interactive Map</h1>
                        <div className="flex justify-center gap-4">
                            <AiFillDiscord
                                size={25}
                                onClick={() => window.open(discord_link)}
                                className="hover:cursor-pointer"
                            />
                            <AiFillGithub
                                size={25}
                                onClick={() => window.open(github_link)}
                                className="hover:cursor-pointer"
                            />

                        </div>
                    </div>

                    <hr />

                    <CollectablesTracker />

                    <hr />

                    <SidebarPins selected_pin={selected_pin} setSelectedPin={setSelectedPin} />

                    <hr />

                    <IslandInfo />
                </div>
            </div>

            <button
                onClick={() => setShowSidebar(!show_sidebar)}
                className={`transition-all duration-500 fixed top-1/2 -translate-y-1/2 bg-gradient-to-l from-blue-950 to-indigo-950 text-white p-2 border-solid border-[1px] border-l-0 rounded-r-md ${show_sidebar ? "left-2/3 md:left-1/4" : "left-0"} z-50`}
            >
                {show_sidebar ? (
                    <FaChevronLeft
                        size={25}
                    />
                ) : (
                    <FaChevronRight
                        size={25}
                    />
                )}
            </button>
        </div>
    );
}
