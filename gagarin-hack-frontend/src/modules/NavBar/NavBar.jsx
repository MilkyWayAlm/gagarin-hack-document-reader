import React from 'react'

import Logo from "../../assets/logo.svg"
import feedBack from "../../assets/message.svg"

import "./styles/NavBar.css"

function NavBar() {
  return (
    <div className='navBar'>
        <div className='navBar-logo'>
            <img src={Logo} alt="Logo Company"/>
        </div>
        <div className='navBar-message'>
            <img src={feedBack} alt='feedBack'/>
        </div>
    </div>
  )
}

export default NavBar