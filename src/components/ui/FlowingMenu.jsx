"use client"

import React from 'react';
import { gsap } from 'gsap';
import Magnet from './Magnet';
import { ArrowDownRight } from 'lucide-react';

function FlowingMenu({ items = [] }) {
    return (
        <div className="w-full h-full overflow-hidden">
            <nav className="flex flex-col h-full m-0 p-0">
                {items.map((item, idx) => (
                    <MenuItem key={idx} {...item} />
                ))}
            </nav>
        </div>
    );
}

function MenuItem({ link, text, para, image }) {
    const itemRef = React.useRef(null);
    const marqueeRef = React.useRef(null);
    const marqueeInnerRef = React.useRef(null);

    const animationDefaults = { duration: 0.6, ease: 'expo' };

    const findClosestEdge = (mouseX, mouseY, width, height) => {
        const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
        const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    const handleMouseEnter = (ev) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );

        gsap.timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
    };

    const handleMouseLeave = (ev) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );

        gsap.timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
            .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' });
    };

    const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
        <React.Fragment key={idx}>
            <span className="text-[#060606] nav uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]">
                {text}
            </span>
            <div
                className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            />
        </React.Fragment>
    ));

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="flex-1 cursor-pointer items-center justify-around w-full  flex relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]" ref={itemRef}>
            <a
                className="flex  items-center justify-center h-full relative cursor-pointer uppercase no-underline font-light text-[#ffffffb4] text-[4vh] hover:text-[#060606] focus:text-white focus-visible:text-[#060606]  nav  "
                href={link}
            >
                {text}<span className='text-[#c9f330]'>.</span>
            </a>
            <h1 className='text-white  w-96 text-left'>{para}</h1>
            <div className="mt-6 md:mt-0">
                <Magnet padding={50} disabled={false} magnetStrength={5}>
                    <button className="border  text-white w-28 h-28 flex items-center justify-center rounded-full transition hover:scale-110">
                        {/* <p>Star React Bits on GitHub!</p> */}
                        <ArrowDownRight size={56} className="" />
                    </button>
                </Magnet>
            </div>
            <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
                ref={marqueeRef}
            >
                <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
                    <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
                        {repeatedMarqueeContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlowingMenu;

// Note: this is also needed
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       translate: {
//         '101': '101%',
//       },
//       keyframes: {
//         marquee: {
//           'from': { transform: 'translateX(0%)' },
//           'to': { transform: 'translateX(-50%)' }
//         }
//       },
//       animation: {
//         marquee: 'marquee 15s linear infinite'
//       }
//     }
//   },
//   plugins: [],
// };