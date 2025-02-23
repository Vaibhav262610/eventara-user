"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { jwtDecode } from "jwt-decode";
import { Menu } from "lucide-react";

gsap.registerPlugin(Draggable);

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const logoRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);

        const checkAuthToken = () => {
            const token = localStorage.getItem("authToken") || getCookie("authToken");
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (decoded.exp < currentTime) {
                        console.warn("Token expired! Reloading page...");
                        localStorage.removeItem("authToken");
                        document.cookie = "authToken=; path=/; max-age=0;";
                        setTimeout(() => window.location.reload(), 2000);
                    } else {
                        setIsLoggedIn(true);
                    }
                } catch (error) {
                    console.error("Invalid token:", error);
                    localStorage.removeItem("authToken");
                    document.cookie = "authToken=; path=/; max-age=0;";
                }
            }
        };

        checkAuthToken();

        Draggable.create(logoRef.current, {
            type: "x,y",
            inertia: true,
            onRelease: function () {
                gsap.to(this.target, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
            },
        });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: "power2.out" });
        } else {
            gsap.to(menuRef.current, { x: "100%", duration: 0.5, ease: "power2.in" });
        }
    }, [menuOpen]);

    const getCookie = (name) => {
        if (typeof document === "undefined") return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
        return null;
    };

    return (
        <div className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${isScrolled ? "bg-[#0a0a0a] shadow-lg" : "bg-transparent"}`}>
            <div className="flex w-full justify-between items-center py-5 px-4 md:px-10 lg:px-20">
                <Link href="/">
                    <h1 ref={logoRef} className="text-3xl sm:text-4xl font-black text-white cursor-grab">
                        Eventara.
                    </h1>
                </Link>
                <div className="hidden sm:flex items-center gap-8 sm:gap-6 text-[#d1d1d1] text-sm sm:text-lg">
                    <Link href="/discover" className="hover:text-white duration-200">Events</Link>
                    <Link href="/about" className="hover:text-white duration-200">About</Link>
                    <Link href="/community" className="hover:text-white duration-200">Community</Link>
                    {isLoggedIn && <Link href="/profile" className="hover:text-white duration-200">Profile</Link>}
                    <Link href="https://eventara-organizer.vercel.app" className="hover:text-white duration-200">Create</Link>
                </div>
                <div className="text-xl font-semibold gap-4 md:gap-12 flex">
                    {isLoggedIn ? (
                        <>

                            <Link href="/profile">
                                <button className="text-[#d1d1d1] border-2 px-5 rounded-lg hover:bg-[#d1d1d1] hover:text-black duration-200 py-2 border-[#d1d1d1]">
                                    Profile
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>

                            <Link href="/login">
                                <button className="text-[#d1d1d1] border-2 px-5 rounded-lg hover:bg-[#d1d1d1] hover:text-black duration-200 py-2 border-[#d1d1d1]">
                                    Sign In
                                </button>
                            </Link>
                        </>
                    )}
                    <div className="sm:hidden flex items-center">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Full-screen sliding menu */}
            <div ref={menuRef} className="fixed top-0 right-0 h-screen w-full bg-black text-white flex flex-col items-center justify-center space-y-8 transform translate-x-full">
                <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white text-2xl">×</button>
                <Link href="/discover" onClick={() => setMenuOpen(false)} className="text-2xl">Events</Link>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="text-2xl">About</Link>
                <Link href="/community" onClick={() => setMenuOpen(false)} className="text-2xl">Community</Link>
                {isLoggedIn && <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-2xl">Profile</Link>}
                <Link href="https://eventara-organizer.vercel.app" onClick={() => setMenuOpen(false)} className="text-2xl">Create</Link>
                {!isLoggedIn && <Link href="/login" onClick={() => setMenuOpen(false)} className="text-2xl">Sign In</Link>}
            </div>
        </div>
    );
};

export default Navbar;