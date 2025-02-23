"use client"

import About from '@/components/About'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Marquee from '@/components/Marquee'
import Sections from '@/components/Sections'
// import Team from '@/components/Team'
import Loader from '@/components/ui/Loader'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulating an async operation, e.g., fetching data
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after 3 seconds
    }, 3000); // Adjust the delay as needed
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <Marquee />
      <About />
      <Sections />
      {/* <Team /> */}
      <Footer />
    </>
  )
}

export default Home