import React from 'react'
import { NavLink } from 'react-router-dom';
import './CSS/header.css'
import logo from '../Images/logo.png'
export default function header() {
  return (
    <div className="header">
        <img className='logo' src={logo} />
        <NavLink className='header_text' to="/red_magic">Home
            </NavLink>
        <NavLink className='header_text' to="/red_magic/about">About Us
        </NavLink>
        <NavLink className='header_text' to="/red_magic/news">News
        </NavLink>
        <NavLink className='header_text' to="/red_magic/contact">Contact
        </NavLink>
    </div>
)
}