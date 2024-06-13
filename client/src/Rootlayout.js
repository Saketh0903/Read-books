import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

function Rootlayout() {
  return (
    <div>
        <Navbar />
        <div className='w-[100%]'>
        <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Rootlayout