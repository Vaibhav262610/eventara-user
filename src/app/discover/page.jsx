"use client"

import React, { useState } from "react";

const page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeButton, setActiveButton] = useState("Discover");

    const buttons = ["Discover", "Events", "Builders"];
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="p-6 font-sans  min-h-screen">
            {/* Navigation Bar */}
            <nav className="flex justify-center gap-20 mt-32 flex-col items-center  p-4 rounded-lg ">
                <div className="flex text-xl font-semibold ">
                    {buttons.map((btn) => (
                        <button
                            key={btn}
                            onClick={() => setActiveButton(btn)}
                            className={`py-2 rounded-md px-5 ${activeButton === btn
                                ? "text-white bg-blue-600"
                                : "text-blue-600 bg-transparent"
                                }`}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
                <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-md">
                    <input
                        type="text"
                        placeholder="Type to begin search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="bg-transparent outline-none py-4 px-6 w-[60rem]"
                    />
                </div>
            </nav>

            {/* Main Event Card */}
            <div className="w-full flex flex-col   items-center">
                <div className=" p-6 mt-12 flex gap-24 w-fit   text-white rounded-lg shadow-md">
                    <img
                        src="https://devfolio.co/_next/image?url=%2Fbrand-blocks%2Fethdenver2025%2Fdiscover.png&w=1440&q=100" // Replace with actual image path
                        alt="ETHDenver 2025"
                        className="rounded-lg w-[50rem] h-[30rem] object-cover"
                    />
                    <div className="flex flex-col justify-evenly">
                        <h2 className="text-4xl text-gray-200  font-bold mt-4">ETHDenver 2025</h2>
                        <p className="text-gray-300 w-[20rem] ">Largest and Longest Running #BUIDLathon in the World 🦄 🦬 ⛰️</p>
                        <div className="flex flex-col leading-5">
                            <p className="mt-2 text-xl font-semibold">Happening: </p>
                            <p className="mt-2 text-[#34D399] font-semibold">Denver, United States </p>
                        </div>
                        <div className="mt-4 flex justify-between items-start flex-col text-left">
                            <p className="text-blue-200 text-2xl">Applications close in <br /><span className="text-blue-300">4d:15h:30m</span> </p>
                            <button className="bg-blue-600 text-white h-16 nav font-light w-full rounded-lg mt-20">Go to dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
