import About from '@/components/About'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Marquee from '@/components/Marquee'
import Sections from '@/components/Sections'
import React from 'react'

const page = () => {
  return (
    <>
      <Header />
      <Marquee />
      <About />
      <Sections />
      <Footer />
    </>
  )
}

export default page