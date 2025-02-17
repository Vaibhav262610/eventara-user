"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const marqueeData = [
    "Hackathon", "Cultural Fest", "Tech Talks", "Workshops", "Webinars",
    "Startup Pitch", "Game Jam", "Networking Night", "AI Summit", "Open Mic"
];

const Marquee = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;

        gsap.to(marquee.querySelectorAll(".marquee-track"), {
            xPercent: (i) => (i % 2 === 0 ? -50 : 50), // Alternating scroll directions
            ease: "power1.out",
            scrollTrigger: {
                trigger: marquee,
                start: "top bottom",
                end: "bottom top",
                scrub: 2, // Slow & smooth
            },
        });
    }, []);

    return (
        <div ref={marqueeRef} className="bg-[#111d25] overflow-hidden py-12">
            {/* First Row - Moves Left */}
            <div className="marquee-track flex space-x-10 whitespace-nowrap text-5xl font-extrabold text-[#c9f330] uppercase">
                {Array(20).fill(marqueeData).flat().map((text, index) => (
                    <span key={index} className="flex items-center gap-4">
                        {text} <span className="text-white text-4xl">✦</span>
                    </span>
                ))}
            </div>

            {/* Second Row - Moves Right (Now properly filled) */}
            <div className="marquee-track flex space-x-10 whitespace-nowrap text-5xl font-extrabold text-[#c9f330] uppercase mt-4">
                {Array(20).fill(marqueeData).flat().map((text, index) => (
                    <span key={index} className="flex items-center gap-4">
                        {text} <span className="text-white text-4xl">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
