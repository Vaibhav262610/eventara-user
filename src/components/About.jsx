"use client"

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { PiLightbulb, PiRocket, PiUsers, PiChatCircleDots, PiGraph, PiClockCountdown } from "react-icons/pi";

const About = () => {
    useEffect(() => {
        gsap.fromTo(
            ".about-text",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );

        // Floating effect for icons
        gsap.to(".feature-icon", {
            y: -5,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "easeInOut"
        });
    }, []);

    return (
        <section className="relative w-full py-20 flex flex-col items-center bg-[#0A192F] text-white overflow-hidden">
            {/* Neon Gradient Background */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#112240] to-[#0A192F] opacity-90"></div>

            {/* Content */}
            <div className="relative max-w-5xl px-6 text-center">
                <h2 className="text-5xl font-bold text-[#00A991] about-text tracking-wide">
                    About EVENTRON
                </h2>
                <p className="mt-4 text-lg text-gray-300 about-text max-w-3xl mx-auto">
                    EVENTRON is a futuristic **Seamless Event Management System** designed for **hackathons, university events, and meetups**.
                    Experience **instant QR check-ins**, **real-time updates**, and **AI-powered event recommendations**—all in one place!
                </p>

                {/* Features Grid */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="relative group flex items-center gap-4 bg-[#112240] p-6 rounded-lg about-text shadow-md transition-all duration-300 hover:bg-[#00A991]/20 hover:scale-105">
                            <div className="text-4xl text-[#00A991] feature-icon transition-all duration-300 group-hover:text-[#64FFDA]">
                                {feature.icon}
                            </div>
                            <p className="text-lg text-gray-200">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Feature List
const features = [
    { icon: <PiRocket />, text: "Instant QR-Based Check-ins" },
    { icon: <PiChatCircleDots />, text: "Real-Time Chat & Notifications" },
    { icon: <PiGraph />, text: "Live Event Analytics" },
    { icon: <PiLightbulb />, text: "AI-Powered Event Suggestions" },
    { icon: <PiClockCountdown />, text: "Automated RSVP & Scheduling" },
    { icon: <PiUsers />, text: "Community & Collaboration" },
];

export default About;
