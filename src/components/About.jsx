"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MetaBalls from "./ui/MetaBalls";

const About = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            setMousePos({ x: clientX, y: clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <section className="relative bg-[#11181F] text-white h-screen flex justify-center items-center">
            <div className="flex flex-row justify-around w-full px-8 md:px-16">
                {/* Left Side - Text Content and Image */}
                <div className="md:w-1/2 space-y-6 text-left flex flex-col justify-center">
                    <h2 className="text-5xl md:text-6xl font-extrabold uppercase leading-tight">
                        Bringing <span className="text-[#c9f330]">Brands</span> To Life <br />
                        With Strategy <span className="text-[#c9f330]">& Design.</span>
                    </h2>

                    <p className="ml-16 font-light text-gray-300 text-lg leading-relaxed border-l-4 border-[#c9f330] pl-4">
                        We are one of the biggest agencies and have been helping our clients for
                        over 10 years to solve design challenges. We always provide the best
                        service to grow your company.
                    </p>

                    {/* 3D-style Image with Cropped Height */}
                    <div className="flex gap-24 ">
                        <motion.img
                            src="/image1.webp"
                            alt="Abstract 3D"
                            className="w-[80%] md:w-[700px] mt-12 h-[400px] md:h-[400px] object-cover rounded-lg shadow-lg"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        />
                        {/* Stats on the Left */}
                        <div className="flex flex-col mt-12">
                            <Stat number="10" label="Years Experience" />
                            <Stat number="55" label="Completed Projects" />
                            <Stat number="200+" label="Happy Clients" />
                        </div>
                    </div>
                </div>

                {/* Right Side - MetaBalls */}
                <div className="flex justify-center items-center">
                    <MetaBalls
                        color="#ffffff"
                        cursorBallColor="#ffffff"
                        cursorBallSize={2}
                        ballCount={15}
                        animationSize={30}
                        enableMouseInteraction={true}
                        hoverSmoothness={0.05}
                        clumpFactor={1}
                        speed={0.3}
                    />
                </div>
            </div>
        </section>
    );
};

// Stat Component
const Stat = ({ number, label }) => (
    <motion.div
        className="flex flex-col w-72 flex-wrap text-right items-start text-[#c9f330] text-3xl font-extrabold"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
    >
        <span className="text-7xl font-black">{number}</span>
        <span className="nav flex-wrap text-white text-sm tracking-widest font-light ">{label}</span>
    </motion.div>
);

export default About;
