import About from '@/components/About'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Marquee from '@/components/Marquee'
import Sections from '@/components/Sections'
import Team from '@/components/Team'
import React from 'react'

const page = () => {
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

export default page