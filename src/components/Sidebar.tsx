import { AiFillDiscord, AiFillGithub } from "react-icons/ai";
import { CurrentMapContext, MapType } from "../CurrentMapContext";
import { DataSet, GenericDataButton } from "./manager/userData";
import { FaChevronRight, FaMoon, FaSun } from "react-icons/fa";
import { discord_link, github_link } from "../globals";
import { useContext, useEffect, useState } from "react";
import CollectablesTracker from "./CollectablesTracker";
import IslandInfo from "./IslandInfo";
import { Pin } from "../types";
import { SidebarPins } from "./UserPins";


function getOriginalTheme() {
    const userPreference = localStorage.getItem("darkMode");
    if (userPreference === null) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return userPreference === "true";
}

export default function Sidebar({
    selected_pin,
    setSelectedPin,
}: {
    selected_pin: Pin | undefined,
    setSelectedPin: React.Dispatch<React.SetStateAction<Pin | undefined>>,
}) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [darkMode, setDarkMode] = useState(getOriginalTheme());
    const [selectedDataset, setSelectedDataset] = useState<DataSet[]>([]);
    const { current_map } = useContext(CurrentMapContext);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => {
            const newDarkMode = !prevDarkMode;

            if (newDarkMode) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("darkMode", "true");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("darkMode", "false");
            }

            return newDarkMode;
        });
    };

    const toggleDataset = (dataset: DataSet, checked: boolean) => {
        if (checked)
            setSelectedDataset((prev) => [...prev, dataset]);
        else
            setSelectedDataset((prev) => prev.filter((item) => item !== dataset));
    };

    return (
        <div className="absolute">
            <div
                className={`bg-sidebar ${current_map === MapType.sr1 && "sr1"} transition-all duration-500 fixed top-0 left-0 h-full border-r-solid border-r-[1px] ${showSidebar ? "translate-x-0" : "-translate-x-full"} w-2/3 md:w-1/4 z-50 overflow-x-auto`}
            >
                <div className="relative flex flex-col gap-5 px-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold pt-4 text-center">Slime Rancher {current_map !== MapType.sr1 && "2 "}Interactive Map</h1>
                        <div className="flex justify-center gap-4">
                            {darkMode ?
                                <FaMoon
                                    size={25}
                                    onClick={() => toggleDarkMode()}
                                    className="cursor-pointer"
                                    title="Switch to light mode"
                                />
                                :
                                <FaSun
                                    size={25}
                                    onClick={() => toggleDarkMode()}
                                    className="cursor-pointer"
                                    title="Switch to dark mode"
                                />
                            }

                            <AiFillDiscord
                                size={25}
                                onClick={() => window.open(discord_link)}
                                className="cursor-pointer"
                            />
                            <AiFillGithub
                                size={25}
                                onClick={() => window.open(github_link)}
                                className="cursor-pointer"
                            />

                        </div>
                    </div>

                    <hr />

                    <CollectablesTracker />

                    <hr />

                    <SidebarPins selected_pin={selected_pin} setSelectedPin={setSelectedPin} />

                    <hr />

                    <IslandInfo />

                    <hr />

                    <div>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between mb-1 md:items-center">
                            <h2 className="text-lg font-bold">Plot Planner</h2>
                        </div>
                        <div className="flex flex-wrap md:items-center">
                            <h2>You can click on any plot on the map to start planning!</h2>
                        </div>
                    </div>

                    <hr />

                    <div>
                        <input type="checkbox" id="dataset-plots" value={DataSet.Plots} onChange={(e) => toggleDataset(DataSet.Plots, e.target.checked)} />
                        <label htmlFor="dataset-plots" className="ml-2">Plot Plans</label>
                    </div>
                    <div>
                        <input type="checkbox" id="dataset-pins" value={DataSet.Pins} onChange={(e) => toggleDataset(DataSet.Pins, e.target.checked)} />
                        <label htmlFor="dataset-pins" className="ml-2">User Pins</label>
                    </div>
                    <div>
                        <input type="checkbox" id="dataset-found" value={DataSet.Found} onChange={(e) => toggleDataset(DataSet.Found, e.target.checked)} />
                        <label htmlFor="dataset-found" className="ml-2">Found Collectables</label>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-4 lg:gap-6 mb-4">
                        <GenericDataButton dataset={selectedDataset} action="export" label="Export Selected" />
                        <GenericDataButton dataset={selectedDataset} action="import" label="Import Selected" />
                        <GenericDataButton dataset={selectedDataset} action="clear" label="Clear Selected" />
                    </div>

                    <hr />


                </div>
            </div>

            <button
                onClick={() => setShowSidebar(!showSidebar)}
                className={`bg-sidebar transition-all duration-500 fixed top-1/2 -translate-y-1/2 p-2 border-solid border-[1px] border-l-0 rounded-r-md ${showSidebar ? "left-2/3 md:left-1/4" : "left-0"} z-50`}
            >
                <FaChevronRight
                    size={25}
                    className={`transition-all ease-in-out duration-500 ${showSidebar ? "rotate-180" : ""}`}
                />
            </button>
        </div>
    );
}
