"use client";

import React, { useEffect } from "react";
import GridDistortion from "./ui/GridDistortion";
import RotatingText from "./ui/RotatingText";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiLightbulb, PiGlobeHemisphereWest } from "react-icons/pi";
import { gsap } from "gsap";
import Magnet from "./ui/Magnet";

const Header = () => {
    useEffect(() => {
        gsap.to(".floating-icon", {
            y: -10,
            opacity: 1,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "easeInOut",
            stagger: 0.3,
        });
    }, []);

    return (
        <div className="relative w-full h-[100vh] flex flex-col justify-center items-center overflow-hidden bg-[#121b22]">

            {/* ✅ Wider Dot Background Pattern */}
            <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_2px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

            {/* ✅ Centered Text */}
            <div className="relative text-center flex flex-col items-center leading-[5rem] nav">
                <h1 className="text-white text-[5rem] font-light flex items-center gap-4">
                    Think, plan{" "}
                    <PiLightbulb className="text-[#34D399] text-5xl opacity-80 animate-pulse" />{" "}
                    and track
                </h1>
                <h2 className="text-white/50 text-[4rem] font-light flex items-center gap-4">
                    all in{" "}
                    <span className="text-[#c9f330] font-bold">one</span> place{" "}
                    <PiGlobeHemisphereWest className="text-[#E6007A] text-5xl opacity-80 animate-pulse" />
                </h2>
                <RotatingText
                    texts={["Events", "Hackathons", "Innovations", "Cultural"]}
                    mainClassName="px-12 bg-white text-black w-fit font-semibold mt-5 text-6xl overflow-hidden py-2 justify-center rounded-lg"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                />
            </div>

            {/* ✅ Call-to-Action Button */}
            <div className="mt-12 flex items-center gap-3 relative z-10">
                <Magnet padding={1000} disabled={false} magnetStrength={40}>
                    <button className="flex items-center gap-4 bg-[#93d6e1] text-xl py-4 px-8 rounded-full text-black cursor-pointer hover:bg-[#6cb3c1] transition-all duration-200">
                        <h1 className="font-bold">Join Now</h1>
                        <FaArrowRightLong />
                    </button>
                </Magnet>
            </div>
        </div>
    );
};

export default Header;
