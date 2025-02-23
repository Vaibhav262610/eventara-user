import React from "react";
import { ArrowDownRight } from "lucide-react"; // Importing arrow icon
import Magnet from "./ui/Magnet";

const Footer = () => {
    return (
        <footer className="bg-[#111d25] text-white py-16 px-8 md:px-20">
            <div className=" mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Text Section */}
                <div className="text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase">
                        ANY <span className="text-[#c9f330]">QUESTION</span> FOR US?
                    </h2>
                    <p className="text-gray-300 mt-2">
                        We will be happy and will answer any questions you want to ask us.
                    </p>
                </div>

                {/* Arrow Button */}
                <div className="mt-6 md:mt-0">
                    <Magnet padding={50} disabled={false} magnetStrength={5}>
                        <button className="bg-[#c9f330] w-20 h-20 flex items-center justify-center rounded-full transition hover:scale-110">
                            {/* <p>Star React Bits on GitHub!</p> */}
                            <ArrowDownRight size={32} className="text-black" />
                        </button>
                    </Magnet>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-10 border-t border-gray-500 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm pt-5">
                <p>Copyright © 2025 EVENTRON. All rights reserved.</p>
                <p>Designed & Developed By <span className="font-black">Vaibhav Rajpoot 💖 </span></p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition">
                        Terms of Use
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
