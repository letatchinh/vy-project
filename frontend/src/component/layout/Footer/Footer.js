import React from 'react';
// import paypalPayment from "../../../images/paypal_logo.png";
import visaPayment from "../../../images/visa_logo.png";
import "./Footer.css";
import logo from "../../../images/logo.jpg";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>Payment by</h4>
            <p>Purchase with payment method</p>
            <img src={visaPayment} alt="visaMethod" />
        </div>
        <div className="midFooter">
            <Link to='/'><img src={logo} alt="logo" className="logo"/></Link>
            <p>High Quality is our first priority</p>
            <p>Copyright 2022 &copy; ViTi Candles</p>

        </div>
        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="https://www.facebook.com/vy.pham239">Instagram</a>
            <a href="https://www.facebook.com/vy.pham239">Youtube</a>
        </div>
    </footer>
  )
}

export default Footer