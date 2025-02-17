"use client"

import React, { useEffect } from 'react';
import GridDistortion from './ui/GridDistortion';
import RotatingText from './ui/RotatingText';
import { FaArrowRightLong } from "react-icons/fa6";
import { PiCube, PiCode, PiGraph, PiLightbulb, PiUsers, PiRocket, PiGlobeHemisphereWest } from "react-icons/pi";
import { gsap } from 'gsap';

const Header = () => {
    useEffect(() => {
        // Floating animation for icons
        gsap.to('.floating-icon', {
            y: -10,
            opacity: 1,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "easeInOut",
            stagger: 0.3
        });

        // Hover animation
        document.querySelectorAll('.floating-icon').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.5,
                    rotation: 10,
                    duration: 0.3,
                    ease: "power3.out"
                });
            });

            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power3.out"
                });
            });
        });

    }, []);

    return (
        <div className='w-full h-[100vh] flex flex-col relative justify-center items-center overflow-hidden'>

            {/* ✅ Interactive Grid Background */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
                <GridDistortion
                    imageSrc="https://picsum.photos/1920/1080?grayscale"
                    grid={10}
                    mouse={0.1}
                    strength={0.10}
                    relaxation={0.9}
                    className="w-full h-full opacity-15"
                />
            </div>

            {/* ✅ Floating & Animated Icons with Interactive Hover */}
            <div className='absolute top-[10%] left-[15%] floating-icon'>
                <PiCube className="text-[#00A991] text-6xl opacity-50" />
            </div>
            <div className='absolute top-[20%] right-[10%] floating-icon'>
                <PiCode className="text-[#FF6363] text-6xl opacity-50" />
            </div>
            <div className='absolute bottom-[25%] left-[10%] floating-icon'>
                <PiGraph className="text-[#FFD700] text-6xl opacity-50" />
            </div>
            <div className='absolute bottom-[15%] right-[20%] floating-icon'>
                <PiLightbulb className="text-[#34D399] text-6xl opacity-50" />
            </div>
            <div className='absolute top-[45%] left-[30%] floating-icon'>
                <PiUsers className="text-[#4F46E5] text-6xl opacity-50" />
            </div>
            <div className='absolute top-[55%] right-[25%] floating-icon'>
                <PiRocket className="text-[#FF8700] text-6xl opacity-50" />
            </div>
            <div className='absolute bottom-[10%] right-[10%] floating-icon'>
                <PiGlobeHemisphereWest className="text-[#E6007A] text-6xl opacity-50" />
            </div>

            {/* ✅ Centered Text */}
            <div className='relative text-center flex flex-col items-center leading-[5rem] pointer-events-none'>
                <h1 className='text-white text-[5rem] font-light flex items-center gap-4'>
                    Think, plan <PiLightbulb className="text-[#34D399] text-5xl opacity-80 animate-pulse" /> and track
                </h1>
                <h2 className='text-white/50 text-[4rem] font-light flex items-center gap-4'>
                    all in <span className='text-white font-bold'>one</span> place <PiGlobeHemisphereWest className="text-[#E6007A] text-5xl opacity-80 animate-pulse" />
                </h2>
                <RotatingText
                    texts={['Events', 'Hackathons', 'Innovations', 'Cultural']}
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
            <div className='mt-12 flex items-center gap-3 pointer-events-auto relative z-10'>
                <button className='flex items-center gap-4 bg-[#93d6e1] text-xl py-4 px-8 rounded-full text-black cursor-pointer hover:bg-[#6cb3c1] transition-all duration-200'>
                    <h1>Join Now</h1>
                    <FaArrowRightLong />
                </button>
            </div>
        </div>
    )
}

export default Header;
