import React from 'react'
import "./Navbar.css"
import {logo} from "../../assets"

const Navbar = () => {
  return (
    <>
    <div className="logo h-[10vh] flex items-center ml-2">
      <img src={logo} alt="logo" className='w-[12em]'/>
    </div>
    </>
  )
}

export default Navbar