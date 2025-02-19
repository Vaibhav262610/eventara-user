"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const logoRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);

        // Check if authToken is present in localStorage or cookies
        const token = localStorage.getItem("authToken") || document.cookie.includes("authToken=");
        setIsLoggedIn(!!token);

        // Make logo draggable
        Draggable.create(logoRef.current, {
            type: "x,y",
            inertia: true,
            onRelease: function () {
                gsap.to(this.target, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
            },
        });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${isScrolled ? "bg-[#0a0a0a] shadow-lg" : "bg-transparent"}`}>
            <div className="flex w-full justify-evenly items-center py-5">
                <Link href="/">
                    <h1 ref={logoRef} className="text-4xl font-black text-white cursor-grab">
                        Eventara.
                    </h1>
                </Link>
                {isLoggedIn ? <div className="flex text-[#d1d1d1] ml-12 gap-8 text-lg">
                    <Link href="/events" className="relative hover:text-white/80 mt-3 duration-200 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#d1d1d1] after:transition-all after:duration-300 hover:after:w-full">
                        <h2>Events</h2>
                    </Link>
                    <Link href="/about" className="relative hover:text-white/80 mt-3 duration-200 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#d1d1d1] after:transition-all after:duration-300 hover:after:w-full">
                        <h2>About</h2>
                    </Link>
                    <Link href="/discover" className="relative hover:text-white/80 mt-3 duration-200 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#d1d1d1] after:transition-all after:duration-300 hover:after:w-full">
                        <h2>Discover</h2>
                    </Link>
                    <Link href="/community" className="relative hover:text-white/80 mt-3 duration-200 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#d1d1d1] after:transition-all after:duration-300 hover:after:w-full">
                        <h2>Community</h2>
                    </Link>
                </div> : <div className="flex text-[#d1d1d1] ml-12 gap-8 text-lg">
                    <Link href="/events" className="relative hover:text-white/80 mt-3 duration-200 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#d1d1d1] after:transition-all after:duration-300 hover:after:w-full">
                        <h2>Events</h2>
                    </Link>
                    <Link href="/about" className="relative hover:text-white/80 mt-3 duration-200 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#d1d1d1] after:transition-all after:duration-300 hover:after:w-full">
                        <h2>About</h2>
                    </Link>
                    <Link href="/community" className="relative hover:text-white/80 mt-3 duration-200 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#d1d1d1] after:transition-all after:duration-300 hover:after:w-full">
                        <h2>Community</h2>
                    </Link>
                </div>}
                <div className="text-xl font-semibold gap-12 flex">
                    {isLoggedIn ? (
                        <>
                            <Link href="https://org.eventara.vercel.app">
                                <button className="relative text-[#d1d1d1] mt-3 duration-200 hover:text-[#d1d1d1] pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#d1d1d1] after:transition-all after:duration-300 hover:after:w-full">
                                    Organize an Event
                                </button>
                            </Link>
                            <Link href="/profile">
                                <button className="text-[#d1d1d1] border-2 px-5 rounded-lg hover:bg-[#d1d1d1] hover:text-black duration-200 py-2 border-[#d1d1d1]">
                                    Profile
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <button className="relative text-[#d1d1d1] mt-3 duration-200 hover:text-[#d1d1d1] pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#d1d1d1] after:transition-all after:duration-300 hover:after:w-full">
                                Organize an Event
                            </button>
                            <Link href="/login">
                                <button className="text-[#d1d1d1] border-2 px-5 rounded-lg hover:bg-[#d1d1d1] hover:text-black duration-200 py-2 border-[#d1d1d1]">
                                    Sign In
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
