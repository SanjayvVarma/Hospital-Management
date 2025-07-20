import React from 'react';
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import logo from "/public/logo.png"
import "./footer.scss"

const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="footer__section footer__brand">
                    <img src={logo} alt="HMS Logo" className="footer__logo" />
                    <p>Your trusted partner for seamless healthcare operations and patient care.</p>
                </div>

                <div className="footer__section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/">Our Doctors</a></li>
                        <li><a href="/">Departments</a></li>
                        <li><a href="/appointments">Book Appointment</a></li>
                        <li><a href="/">Contact</a></li>
                    </ul>
                </div>

                <div className="footer__section">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="/">Help Center</a></li>
                        <li><a href="/">FAQs</a></li>
                        <li><a href="/">Privacy Policy</a></li>
                        <li><a href="/">Terms & Conditions</a></li>
                    </ul>
                </div>

                <div className="footer__section">
                    <h4>Contact Us</h4>
                    <p>📍 123 Health St, Wellness City, IN</p>
                    <p>📞 +91-9876543210</p>
                    <p>✉️ contact@hms.com</p>

                    <div className="social-icons">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaLinkedinIn /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <p>&copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;