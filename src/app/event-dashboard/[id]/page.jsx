"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import withAuth from "@/lib/withAuth";
import { FaUser, FaGraduationCap, FaBolt, FaLink, FaPhone } from "react-icons/fa";
import Link from "next/link";

const EventDashboard = () => {
    const params = useParams();
    const id = params?.id;
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

    if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!event) return <p className="text-gray-400">No event found!</p>;

    return (
        <div className="flex justify-center items-center h-screen w-full p-6">
            {/* Left Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xl w-full mr-10">
                <div className="text-center mb-6">
                    <img src={'https://www.pngfind.com/pngs/m/685-6854994_react-logo-no-background-hd-png-download.png'} alt="Event Logo" className="mx-auto mb-6 w-16 h-16" />
                    <p className="mt-2 mb-8 text-xl text-gray-700">Submitting your application will share the following with <span className="font-bold text-blue-600">{event.name}</span> organizers</p>
                </div>
                <div className="space-y-4">
                    <InfoItem icon={<FaUser />} title="About" text="Your username, first name, last name, and gender." />
                    <InfoItem icon={<FaGraduationCap />} title="Education" text="Your institution, field of study, and graduation year." />
                    <InfoItem icon={<FaBolt />} title="Experience" text="Your skills." />
                    <InfoItem icon={<FaLink />} title="Links" text="Your online profile links." />
                    <InfoItem icon={<FaPhone />} title="Contact" text="Your city, email, and phone number." />
                </div>
                <Link href='/form-application'>
                    <button className="w-full bg-blue-600  text-white py-4 mt-6 rounded-lg hover:bg-blue-700">Continue to the application</button>
                </Link>
            </div>

            {/* Right Section */}
            <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-lg p-8 max-w-lg w-full border border-gray-700 text-white">
                <div className="border-t-4 border-blue-500 rounded-t-md px-6 pt-4 pb-2">
                    <h1 className="text-3xl font-extrabold text-center text-blue-400">{event.name}</h1>
                </div>
                <div className="mt-6 space-y-4 text-gray-300">
                    <p className="text-lg">{event.about}</p>
                    <div className="border-t border-gray-600 pt-4">
                        <h2 className="text-gray-400 text-lg font-semibold">📍 Location:</h2>
                        <p className="text-lg">{event.location}</p>
                    </div>
                    <div className="border-t border-gray-600 pt-4">
                        <h2 className="text-gray-400 text-lg font-semibold">🕒 Event Starts:</h2>
                        <p className="text-lg">{event.startTime || "Not Available"}</p>
                    </div>
                    <div className="border-t border-gray-600 pt-4">
                        <h2 className="text-gray-400 text-lg font-semibold">🛑 Event Ends:</h2>
                        <p className="text-lg">{event.endTime || "Not Available"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, title, text }) => (
    <div className="flex py-2 items-center space-x-3">
        <div className="bg-blue-600 text-white p-2 rounded-full">{icon}</div>
        <div>
            <h3 className="font-bold text-lg text-gray-700">{title}</h3>
            <p className="text-gray-500 text-sm">{text}</p>
        </div>
    </div>
);

export default withAuth(EventDashboard);
