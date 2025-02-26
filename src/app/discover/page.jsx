"use client";

import withAuth from "@/lib/withAuth";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeButton, setActiveButton] = useState("Discover");
    const [events, setEvents] = useState([]);
    const [isClient, setIsClient] = useState(false);  // Track client-side render
    const [randomImages, setRandomImages] = useState({}); // Store random images for each event

    const buttons = ["Discover", "Events", "Builders"];

    useEffect(() => {
        setIsClient(true); // Indicate that we're on the client

        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/events/event-data");
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);

                    // Generate random images AFTER component mounts
                    const images = {};
                    data.forEach(event => {
                        images[event._id] = imageUrls[Math.floor(Math.random() * imageUrls.length)];
                    });
                    setRandomImages(images);
                } else {
                    console.error("Failed to fetch events:", response.status);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    // Filter events based on search query
    // Filter events based on search query
    const filteredEvents = events.filter(event =>
        event.name && event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    // Don't render anything until the client is loaded
    if (!isClient) {
        return null;
    }

    return (
        <div className="p-6 font-sans min-h-screen">
            {/* Navigation Bar */}
            <nav className="flex justify-center gap-20 mt-32 flex-col items-center p-4 rounded-lg">
                <div className="flex text-xl font-semibold">
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
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent outline-none py-4 px-6 w-[60rem]"
                    />
                </div>
            </nav>

            {/* Main Event Cards */}
            {filteredEvents.length > 0 ? (
                <div className="w-full flex flex-wrap justify-center gap-6 mt-12">
                    {filteredEvents.map((event) => (
                        <div key={event._id} className="bg-none shadow-lg rounded-lg p-6 max-w-[40rem] border border-white/10 cursor-pointer hover:border hover:border-blue-700 duration-200">
                            <h2 className="text-2xl font-thin text-blue-700 nav">{event.name}</h2>
                            <p className="text-gray-300">Hackathon</p>
                            <div className="mt-12 flex flex-col font-bold">
                                <span className="text-xl font-black text-gray-300">THEME</span>
                                <div className="mt-2 inline-block text-gray-500 rounded-full text-xs">NO RESTRICTIONS</div>
                            </div>
                            <div className="mt-12 items-center font-bold justify-start flex gap-[5rem]">
                                <span className="text-gray-300 rounded-full text-sm">OFFLINE</span>
                                <span className="text-gray-300 rounded-full text-sm">OPEN</span>
                                <span className="text-gray-300 rounded-full text-sm">STARTS 01/03/25</span>
                                <Link href={`/event-dashboard/${event._id}`}>
                                    <button className="bg-blue-600 hover:bg-blue-700 duration-200 text-white px-7 py-3 font-semibold rounded-lg">Apply now</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full h-[60vh] flex flex-col justify-center items-center text-white font-thin">
                    <p>{searchQuery ? "No matching events found." : "Loading..."}</p>
                </div>
            )}
        </div>
    );
};

export default withAuth(Page);
