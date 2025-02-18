import React from 'react'
import FlowingMenu from './ui/FlowingMenu';

const Sections = () => {
    const demoItems = [
        { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
        { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
        { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
        { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
    ];
    return (
        <div style={{ height: '600px', position: 'relative' }}>
            <FlowingMenu items={demoItems} />
        </div>
    )
}

export default Sections