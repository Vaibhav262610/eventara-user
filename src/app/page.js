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
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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