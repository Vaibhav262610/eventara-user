import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col h-screen w-full justify-center items-center'>
            <h1 className='nav text-white font-thin text-4xl '>Made by : <span className='text-blue-400'>Vaibhav Rajpoot</span></h1>
            <div className='text-white flex gap-3'>
                <p className='nav font-thin'>Learn More About him here</p>
                <Link href='https://vaibhavrajpoot.vercel.app' target='_blank' className='text-yellow-400 font-thin nav'>Click Here</Link>
            </div>
            <div className='flex gap-5 mt-12'>
                <Link href='https://github.com/Vaibhav262610' target='_blank' className='text-gray-400 font-thin nav'>Github</Link>
                <Link href='https://www.linkedin.com/in/vaibhavrajpoot/' target='_blank' className='text-blue-600 font-thin nav'>LinkedIn</Link>
            </div>
        </div>
    )
}

export default page