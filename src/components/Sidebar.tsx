import { useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CollectablesTracker from "./CollectablesTracker";
import { SidebarPins } from "./UserPins";
import IslandInfo from "./IslandInfo";
import { Pin } from "../types";

export default function Sidebar({
    selected_pin,
    setSelectedPin,
}: {
    selected_pin: Pin | undefined,
    setSelectedPin: React.Dispatch<React.SetStateAction<Pin | undefined>>
}) {
    const [show_sidebar, setShowSidebar] = useState(false);

    return (
        <div className="absoluter">
            <div
                className={`transition-all duration-500 fixed top-0 left-0 h-full bg-gray-800 text-white ${show_sidebar ? 'translate-x-0' : '-translate-x-full'} w-96 z-50`}
            >
                <div className="p-4">
                    <h1 className="text-2xl font-bold pb-4 text-center">Slime Rancher 2 Interactive Map</h1>

                    <hr className="mb-4" />

                    <CollectablesTracker />

                    <hr className="my-4" />

                    <SidebarPins selected_pin={selected_pin} setSelectedPin={setSelectedPin} />

                    <hr className="my-4" />

                    <IslandInfo />
                </div>
            </div>

            <button
                onClick={() => setShowSidebar(!show_sidebar)}
                className={`transition-all duration-500 fixed top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-md ${show_sidebar ? 'left-96' : 'left-0'} z-50`}
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
