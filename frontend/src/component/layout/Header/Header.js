import React, { Fragment, useState } from "react";
// import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.jpg";
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";
import {ImCross } from "react-icons/im";
import {FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

// const Header = () =>{
//   return (
//     <ReactNavbar
//       logo = {logo}
//       // Setting burger
//       burgerColorHover="#6D9886" // This is to change the color of burger menu button at the of hover
//       navColor1= "white" //This is to set the color of first nav section -- background

//       // Setting logo
//       logoWidth= "22vmax" //To set the width of Logo
//       logoHoverSize= "10px" //To set the drop-shadow blur at the time of hover
//       logoHoverColor= "#4a6c5e" //To set the drop-shadow Color at the time of hover

//       // Setting the link
//       link1Color= "rgba(35, 35, 35, 0.8)" // To set link Color
//       link1ColorHover= "#4a6c5e" // To set link color at the time of hover
//       link1Size= "1.5vmax" // To set link Size
//       link1Margin= "3.5vmax" // To set Margin of the link

//       // To set the Text of the Link
//       link1Text= "Home" 
//       link2Text= "Products" 
//       link3Text= "Contact" 
//       link4Text= "About" 
//       // To set the Url of the Link
//       profileIconUrl= "/login"
//       link1Url= "/" 
//       link2Url= "/products" 
//       link3Url= "/contact"
//       link4Url= "/about"

//       // To set Justify Content of nav section
//       nav1justifyContent= "flex-end" 
//       nav2justifyContent= "flex-end" 
//       nav3justifyContent= "flex-start" 
//       nav4justifyContent= "flex-start" 

//       // Show icons
//       // Profile icon
//       profileIcon = {true}
//       ProfileIconElement = {MdAccountCircle}
//       profileIconColorHover= "#4a6c5e"
//       profileIconColor= "rgba(35, 35, 35, 0.8)"
//       // Search icon
//       searchIcon = {true}
//       SearchIconElement = {MdSearch}
//       searchIconColorHover= "#4a6c5e"
//       searchIconColor= "rgba(35, 35, 35, 0.8)"
//       // Cart icon
//       cartIcon = {true}
//       CartIconElement = {MdAddShoppingCart}
//       cartIconColorHover= "#4a6c5e"
//       cartIconColor= "rgba(35, 35, 35, 0.8)"
//       cartIconMargin= "1vmax"
    
//     />
//   )
// };

const Header = () =>{
  const [mobile, setMobile] = useState(true)
  return (
    <Fragment>
          <nav className="navbar">
            <div className="c_container">
            <Link to='/'><img src={logo} alt="logo" className="logo"/></Link>
              
              <ul className= {mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
                <Link to='/'><li>Home</li></Link>
                <Link to='/products'><li>Products</li></Link>
                <Link to='/orders'><li>Order</li></Link>
                <Link to='/about'><li>About</li></Link>
                <Link to='/contact'><li>Contact</li></Link>
              </ul>
              <ul className="nav-links nav-right" >
                <Link to='/search'><li><MdSearch/></li></Link>
                <Link to='/cart'><li><MdAddShoppingCart/></li></Link>
                <Link to='/account'><li><MdAccountCircle/></li></Link>
              </ul>
              <button className="mobile-menu-icon" onClick={() => setMobile(!mobile)}>
                {mobile ? <ImCross/> : < FaBars/>}
              </button>
            </div>
          </nav>
    </Fragment>
  )
};


export default Header;
