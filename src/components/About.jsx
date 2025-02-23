"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MetaBalls from "./ui/MetaBalls";
import { IconCloud } from "@/components/magicui/icon-cloud";

const About = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Define slugs globally so they are accessible
    const slugs = [
        "typescript", "javascript", "dart", "java", "react", "flutter", "android",
        "html5", "css3", "nodedotjs", "express", "nextdotjs", "prisma", "amazonaws",
        "postgresql", "firebase", "nginx", "vercel", "testinglibrary", "jest",
        "cypress", "docker", "git", "jira", "github", "gitlab",
        "visualstudiocode", "androidstudio", "sonarqube", "figma",
    ];

    // Create image URLs for IconCloud
    const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);

    return (
        <section className="relative bg-[#11181F] text-white h-screen flex justify-center items-center">
            <div className="flex flex-col md:flex-row justify-around w-full px-8 md:px-16">
                {/* Left Side - Text Content and Image */}
                <div className="md:w-1/2 space-y-6 text-left flex flex-col justify-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-tight">
                        Elevate Your <span className="text-[#c9f330]">Event Experience </span>
                        With <span className="text-[#c9f330]">Eventara</span>
                    </h2>

                    <p className="ml-16 font-light text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed border-l-4 border-[#c9f330] pl-4">
                        <strong>Eventara</strong> transforms the way you plan and manage events. Whether it's a <strong>hackathon, cultural fest, or networking night</strong>,
                        our platform ensures smooth coordination, automated check-ins, and real-time engagement.
                    </p>

                    <p className="ml-16 font-light text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed border-l-4 border-[#c9f330] pl-4">
                        Designed for organizers, attendees, and speakers alike, Eventara enhances interactions,
                        maximizes participation, and simplifies event logistics—all in one place.
                    </p>

                    {/* 3D-style Image with Cropped Height */}
                    <div className="flex md:flex-row flex-col gap-16 sm:gap-24 md:gap-24">
                        <motion.img
                            src="/image1.webp"
                            alt="Eventara Showcase"
                            className="w-full sm:w-[80%] md:w-[700px] mt-12 h-[300px] sm:h-[400px] md:h-[400px] object-cover rounded-lg shadow-lg"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        />
                        {/* Stats on the Left */}
                        <div className="flex flex-col mt-12">
                            <Stat number="100+" label="Events Hosted" />
                            <Stat number="5000+" label="Active Users" />
                            <Stat number="50+" label="Partners & Sponsors" />
                        </div>
                    </div>
                </div>

                {/* Right Side - MetaBalls & IconCloud */}
                <div className="mb-24 ml-24 hidden md:block">
                    <div className="relative flex size-full items-center justify-center overflow-hidden">
                        <IconCloud images={images} />
                    </div>
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
        <span className="nav flex-wrap text-white text-sm tracking-widest font-light">{label}</span>
    </motion.div>
);

export default About;
