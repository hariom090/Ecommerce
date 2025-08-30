import React from "react";
import { Link } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import AddCallIcon from '@mui/icons-material/AddCall';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

import './footer.css';
import Order from '../../Assets/Img/order.png';
import Price from '../../Assets/Img/best-offer.png';
import FreeShipping from '../../Assets/Img/free-shipping.png';
import Assortment from '../../Assets/Img/networking.png';
import EasyReturn from '../../Assets/Img/return.png';
import logo from '../../Assets/Img/APSA-removebg-preview.png';

const Footer = () => {
    return (
        <div className="footerWrap">
            {/* Top Feature Section */}
            <div className="footerBox">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="box d-flex align-items-center w-100">
                                <span><img src={Order} alt="Best Prices" /></span>
                                <div className="info">
                                    <h4>Best Prices & Offers</h4>
                                    <p>Orders Rs.150 or more</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box d-flex align-items-center w-100">
                                <span><img src={FreeShipping} alt="Free Shipping" /></span>
                                <div className="info">
                                    <h4>Free Delivery</h4>
                                    <p>On orders of 400 or more</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box d-flex align-items-center w-100">
                                <span><img src={Price} alt="Great Deals" /></span>
                                <div className="info">
                                    <h4>Great Daily Deals</h4>
                                    <p>When you sign up</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box d-flex align-items-center w-100">
                                <span><img src={Assortment} alt="Wide Assortment" /></span>
                                <div className="info">
                                    <h4>Wide Assortment</h4>
                                    <p>Mega discounts</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box d-flex align-items-center w-100">
                                <span><img src={EasyReturn} alt="Easy Returns" /></span>
                                <div className="info">
                                    <h4>Easy Returns</h4>
                                    <p>Within 15 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <footer>
                <div className="container-fluid">
                    <div className="row">
                        {/* Contact Info */}
                        <div className="col-md-3 part1">
                            <Link to='/'><img src={logo} alt="Logo" className="footer-logo" /></Link>
                            <p className="mt-3">Awesome accessories website template</p>
                            <p><AddLocationIcon /> <strong>Address:</strong> Borivali West, Mumbai, Maharashtra, India</p>
                            <p><AddCallIcon /> <strong>Call Us:</strong> +91 8694617847</p>
                            <p><EmailIcon /> <strong>Email:</strong> suthatkncwd@gmail.com</p>
                            <p><AccessTimeIcon /> <strong>Timing:</strong> 10:00am - 10:00pm, Mon - Sat</p>
                        </div>

                        {/* Useful Links */}
                        <div className="col-md-6 part2">
                            <div className="row">
                                <div className="col">
                                    <h3>Company</h3>
                                    <ul className="footer-list">
                                        <li><Link to="/about">About Us</Link></li>
                                        <li><Link to="/delivery">Delivery Information</Link></li>
                                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                        <li><Link to="/terms">Terms & Conditions</Link></li>
                                        <li><Link to="/contact">Contact Us</Link></li>
                                        <li><Link to="/support">Support Center</Link></li>
                                        <li><Link to="/careers">Careers</Link></li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <h3>Customer Service</h3>
                                    <ul className="footer-list">
                                        <li><Link to="/help">Help Center</Link></li>
                                        <li><Link to="/returns">Returns</Link></li>
                                        <li><Link to="/track-order">Track Order</Link></li>
                                        <li><Link to="/shipping">Shipping</Link></li>
                                        <li><Link to="/faqs">FAQs</Link></li>
                                        <li><Link to="/report-issue">Report Issue</Link></li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <h3>Quick Links</h3>
                                    <ul className="footer-list">
                                        <li><Link to="/new-arrivals">New Arrivals</Link></li>
                                        <li><Link to="/best-sellers">Best Sellers</Link></li>
                                        <li><Link to="/discounts">Discounts</Link></li>
                                        <li><Link to="/gift-cards">Gift Cards</Link></li>
                                        <li><Link to="/blog">Blog</Link></li>
                                        <li><Link to="/contact-support">Contact Support</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Subscribe Section */}
                        <div className="col-md-3 part3">
                            <h3>Subscribe</h3>
                            <p>Get updates about our latest shop and special offers.</p>
                            <input type="email" placeholder="Enter your email" className="footer-input" />
                            <button className="footer-btn">Subscribe</button>
                        </div>
                    </div>

                    {/* Footer Bottom Strip */}
                    <div className="row lastStrip mt-4">
                        <div className="col-md-3">
                            <p>© 2025 Kalash-ecommerce website. All rights reserved.</p>
                        </div>
                        <div className="col-md-6 text-center">
                            <div className="phNo d-flex justify-content-center align-items-center">
                                <span><SupportAgentIcon /></span>
                                <div className="info ml-3">
                                    <h3 className="text-g mb-0">9214816535</h3>
                                    <p className="mb-0">24/7 Support Center</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 foll text-end">
                            <div className="d-flex align-items-center justify-content-end">
                                <h5 className="me-2">Follow Us</h5>
                                <ul className="list list-inline mb-0">
                                    <li className="list-inline-item"><Link to="#"><InstagramIcon /></Link></li>
                                    <li className="list-inline-item"><Link to="#"><FacebookIcon /></Link></li>
                                    <li className="list-inline-item"><Link to="#"><XIcon /></Link></li>
                                    <li className="list-inline-item"><Link to="#"><YouTubeIcon /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
