"use client";

import withAuth from "@/lib/withAuth";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeButton, setActiveButton] = useState("Discover");
    const [events, setEvents] = useState([]);  // State to store event data

    const buttons = ["Discover", "Events", "Builders"];

    const randomImages = [
        "https://devfolio.co/_next/image?url=%2Fbrand-blocks%2Fethdenver2025%2Fdiscover.png&w=1440&q=100",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREB7VXfX0d4Pu9GZhn0pCC-MovE3dG5Fwsdn_tanQHW7yGKBXu",
        "https://t3.ftcdn.net/jpg/03/27/84/86/360_F_327848677_rKdWq48QDo8apoN6kZlWa241HRlw5aWn.jpg",
    ];

    const getRandomImage = () => {
        return randomImages[Math.floor(Math.random() * randomImages.length)];
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/events/event-data");
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                } else {
                    console.error("Failed to fetch events:", response.status);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

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
                        onChange={handleSearchChange}
                        className="bg-transparent outline-none py-4 px-6 w-[60rem]"
                    />
                </div>
            </nav>

            {/* Main Event Cards */}
            {events.length > 0 ? (
                <div className="w-full flex flex-col items-center">
                    {events.map((event) => (
                        <div key={event._id} className="p-6 mt-12 flex gap-24 w-fit text-white rounded-lg shadow-md">
                            <img
                                src={getRandomImage()}  // Random image URL from the list
                                alt={event.name || "Event image"}
                                className="rounded-lg w-[50rem] h-[30rem] object-cover"
                            />
                            <div className="flex flex-col justify-evenly">
                                <h2 className="text-4xl text-gray-200 font-bold mt-4">{event.name}</h2>
                                <p className="text-gray-300 w-[20rem]">{event.description}</p>
                                <p className="mt-2 text-xl font-semibold">Location: {event.location}</p>
                                <Link href={`/event-dashboard/${event._id}`}>
                                    <button className="bg-blue-600 text-white h-16 px-8 font-light w-full rounded-lg mt-20">
                                        Go to dashboard
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full h-[60vh] flex flex-col justify-center items-center text-white font-thin">
                    <p>Loading...</p>
                </div>
            )}

        </div>
    );
};

export default withAuth(Page);
