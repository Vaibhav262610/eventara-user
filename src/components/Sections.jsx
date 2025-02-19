import React from 'react';
import FlowingMenu from './ui/FlowingMenu';

const demoItems = [
    {
        link: '#',
        text: 'Organize',
        para: "Seamlessly plan and manage events, from corporate conferences to private gatherings. Our platform provides all the tools you need for a successful event.",
        image: 'https://picsum.photos/600/400?random=1'
    },
    {
        link: '#',
        text: 'Join',
        para: "Join exciting events, connect with like-minded individuals, and explore opportunities to engage in workshops, meetups, and festivals.",
        image: 'https://picsum.photos/600/400?random=2'
    },
    {
        link: '#',
        text: 'About',
        para: "Eventara is dedicated to making event management seamless and effective. Discover our vision, mission, and how we revolutionize event experiences.",
        image: 'https://picsum.photos/600/400?random=3'
    },
    {
        link: '#',
        text: 'Team',
        para: "Meet the brilliant minds behind Eventara. Our experienced and passionate team works tirelessly to create unforgettable events.",
        image: 'https://picsum.photos/600/400?random=4'
    }
];

const Sections = () => {
    return (
        <div style={{ height: '100vh', position: 'relative' }}>
            <FlowingMenu items={demoItems} />
        </div>
    );
};

export default Sections;
