import { AiFillDiscord, AiFillGithub } from "react-icons/ai";
import { ClearUserPinsButton, ExportUserPinsButton, ImportUserPinsButton, SidebarPins } from "./UserPins";
import { ExportUserDataButton, ImportUserDataButton } from "./UserData";
import { FaChevronRight, FaMoon, FaSun } from "react-icons/fa";
import { LocalStoragePin, Pin } from "../types";
import React, { useEffect, useState } from "react";
import { discord_link, github_link } from "../globals";
import CollectablesTracker from "./CollectablesTracker";
import IslandInfo from "./IslandInfo";

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
    user_pins,
    setUserPins,
}: {
    selected_pin: Pin | undefined,
    setSelectedPin: React.Dispatch<React.SetStateAction<Pin | undefined>>
    user_pins: LocalStoragePin[],
    setUserPins: React.Dispatch<React.SetStateAction<LocalStoragePin[]>>
}) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [darkMode, setDarkMode] = useState(getOriginalTheme());

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

    return (
        <div className="absolute">
            <div
                className={`bg-sidebar transition-all duration-500 fixed top-0 left-0 h-full border-r-solid border-r-[1px] ${showSidebar ? "translate-x-0" : "-translate-x-full"} w-2/3 md:w-1/4 z-50 overflow-x-auto`}
            >
                <div className="flex flex-col gap-5 px-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold pt-4 text-center">Slime Rancher 2 Interactive Map</h1>
                        <div className="flex justify-center gap-4">
                            {darkMode ?
                                <FaMoon
                                    size={25}
                                    onClick={() => toggleDarkMode()}
                                    className="cursor-pointer"
                                    name="Switch to light mode"
                                />
                                :
                                <FaSun
                                    size={25}
                                    onClick={() => toggleDarkMode()}
                                    className="cursor-pointer"
                                    name="Switch to dark mode"
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

                    <div className="flex flex-col md:flex-row justify-between gap-4 lg:gap-6 mb-4">
                        <ExportUserPinsButton user_pins={user_pins} />
                        <ImportUserPinsButton setUserPins={setUserPins} />
                        <ClearUserPinsButton setUserPins={setUserPins} />
                    </div>

                    <hr />

                    <div className="flex flex-col md:flex-row justify-between gap-4 lg:gap-6 mb-4">
                        <ExportUserDataButton />
                        <ImportUserDataButton />
                    </div>
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
