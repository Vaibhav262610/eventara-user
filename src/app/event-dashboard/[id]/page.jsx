"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import withAuth from "@/lib/withAuth";

const EventDashboard = () => {
    const params = useParams(); // Ensure params is defined
    const id = params?.id; // Extract ID safely
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            console.log("Fetching event with ID:", id);
            try {
                const response = await fetch(`/api/events/${id}`);

                if (!response.ok) {
                    throw new Error(`Event not found! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched event:", data);
                setEvent(data);
            } catch (error) {
                console.error("Error fetching event:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) return <div className="flex justify-center flex-col items-center h-screen bg-[#121b22]/10">
        <img
            className="w-42 h-42 select-none    "
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMng0bjlnb3Z1Zmo1N3kxcmoyemw0M3MwNGs3amszemdjbjJtM2FydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/6KKKVerzrhjRrClNKt/giphy.gif"
            alt="Loading..."
        />
        <p className="mt-4 nav font-thin text-3xl text-white">
            Loading...
        </p>
    </div>;
    if (error) return <p>Error: {error}</p>;
    if (!event) return <p>No event found!</p>;

    return (
        <div className="flex justify-center items-center w-full h-screen text-white nav font-thin flex-col">
            <h1>{event.name}</h1>
            <p>{event.about}</p>
            <p>Location: {event.location}</p>
        </div>
    );
};

export default withAuth(EventDashboard);
