import React from 'react'
import Navbar from '../components/dashbord/navbar/Navbar.jsx'
import Footer from '../components/dashbord/footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function DashbordLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    
    </>

  )
}
