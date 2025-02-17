"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar } from "react-icons/fa6"; // Example Icon

gsap.registerPlugin(ScrollTrigger);

const marqueeData = [
    "EVENTS", "HACKATHONS", "INNOVATIONS", "CULTURAL",
    "CONNECT", "CREATE", "COLLABORATE", "INSPIRE"
];

const Marquee = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;

        gsap.to(marquee.querySelectorAll(".marquee-track"), {
            xPercent: (i) => (i % 2 === 0 ? -50 : 50), // Alternate directions
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: marquee,
                start: "top bottom",
                end: "bottom top",
                scrub: 2, // Slower & smoother
            },
        });
    }, []);

    return (
        <div ref={marqueeRef} className="bg-[#17242d] overflow-hidden py-10">
            {/* First Row (Left Direction) */}
            <motion.div className="marquee-track flex space-x-10 whitespace-nowrap text-4xl font-bold text-[#c9f330]">
                {Array(10).fill(marqueeData).flat().map((text, index) => (
                    <span key={index} className="flex items-center gap-3">
                        {text} <FaStar className="text-[#facc15]" />
                    </span>
                ))}
            </motion.div>

            {/* Second Row (Right Direction) */}
            <motion.div className="marquee-track flex space-x-10 whitespace-nowrap text-4xl font-bold text-[#34D399] mt-5">
                {Array(10).fill(marqueeData.reverse()).flat().map((text, index) => (
                    <span key={index} className="flex items-center gap-3">
                        {text} <FaStar className="text-[#facc15]" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
