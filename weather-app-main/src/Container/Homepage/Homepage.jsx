import React from 'react'
import "./Homepage.css"
import {Navbar} from "../../Components"
import Weather from "../Weather/Weather"

const Homepage = () => {
  return (
    <>
    <div className="homepage min-h-screen min-w-full">
        <Navbar />
        <Weather />
    </div>
    </>
)
}

export default Homepage