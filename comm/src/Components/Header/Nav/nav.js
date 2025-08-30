import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GridViewIcon from "@mui/icons-material/GridView";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const Nav = () => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    return (
        <div className="nav d-flex align-items-center ">
            <div className="container-fluid">
                <div className="row w-100 position-relative">
                    {/* Left: Category Button */}
                    <div className="col-sm-3 part1 d-flex align-items-center">
                        <Button className="bg-g text-white catTab">
                            <GridViewIcon />
                            &nbsp;Browse All Categories
                            <ExpandMoreIcon />
                        </Button>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="col-sm-7 part2 position-static">
                        <nav>
                            <ul className="list list-inline mb-0">
                                <li className="list-inline-item">
                                    <Button> <Link to="/">Home</Link></Button>
                                </li>
                                <li className="list-inline-item">
                                    <Button><Link to="/about">About</Link></Button>
                                </li>
                             <li className="list-inline-item position-static megli">
  <div>
    <Button>Mega Mart <ExpandMoreIcon /></Button>
    <div className="dropdownMenu megaDrop w-100">
      <div className="row">
        {/* Hair Accessories */}
        <div className="col">
          <h4 className="text-g">Hair Accessories</h4>
          <ul>
            <li><Link to="/products/clips">Hair Clips</Link></li>
            <li><Link to="/products/bands">Head Bands</Link></li>
            <li><Link to="/products/scrunchies">Scrunchies</Link></li>
            <li><Link to="/products/pins">Bobby Pins</Link></li>
            <li><Link to="/products/combs">Hair Combs</Link></li>
          </ul>
        </div>

        {/* Bags */}
        <div className="col">
          <h4 className="text-g">Bags</h4>
          <ul>
            <li><Link to="/products/handbags">Handbags</Link></li>
            <li><Link to="/products/slings">Sling Bags</Link></li>
            <li><Link to="/products/totes">Tote Bags</Link></li>
            <li><Link to="/products/backpacks">Backpacks</Link></li>
            <li><Link to="/products/wallets">Wallets</Link></li>
          </ul>
        </div>

        {/* Traditional Bags */}
        <div className="col">
          <h4 className="text-g">Traditional Bags</h4>
          <ul>
            <li><Link to="/products/potli">Potli Bags</Link></li>
            <li><Link to="/products/jhola">Jhola Bags</Link></li>
            <li><Link to="/products/embroidery">Embroidered Bags</Link></li>
            <li><Link to="/products/mirrorwork">Mirror Work Bags</Link></li>
            <li><Link to="/products/banjara">Banjara Bags</Link></li>
          </ul>
        </div>

        {/* Necklaces */}
        <div className="col">
          <h4 className="text-g">Necklaces</h4>
          <ul>
            <li><Link to="/products/oxidised">Oxidised Necklaces</Link></li>
            <li><Link to="/products/beaded">Beaded Necklaces</Link></li>
            <li><Link to="/products/pendants">Pendant Necklaces</Link></li>
            <li><Link to="/products/choker">Choker Sets</Link></li>
            <li><Link to="/products/traditional">Traditional Necklaces</Link></li>
          </ul>
        </div>

        {/* Kada */}
        <div className="col">
          <h4 className="text-g">Kada</h4>
          <ul>
            <li><Link to="/products/gold-plated">Gold Plated Kada</Link></li>
            <li><Link to="/products/silver">Silver Kada</Link></li>
            <li><Link to="/products/wooden">Wooden Kada</Link></li>
            <li><Link to="/products/metal">Metal Kada</Link></li>
            <li><Link to="/products/mirror">Mirror Work Kada</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</li>


                                <li className="list-inline-item">
                                    <Button><Link to="/shop">Shop</Link></Button>
                                </li>
                                <li className="list-inline-item">
                                    <Button><Link to="/contact">Contact</Link></Button>
                                </li>

                                {/* Pages Dropdown */}
                                <li className="list-inline-item dropdown position-relative">
                                    <ClickAwayListener onClickAway={() => setIsOpenDropdown(false)}>
                                        <div>
                                            <Button onClick={() => setIsOpenDropdown(prev => !prev)}>
                                                Pages <ExpandMoreIcon />
                                            </Button>
                                            {isOpenDropdown && (
                                                <div className="dropdownMenu">
                                                    <ul>
                                                        <li><Link to="/about"><Button>About</Button></Link></li>
                                                        <li><Link to="/contact"><Button>Contact Us</Button></Link></li>
                                                        <li><Link to="/pages"><Button>Pages</Button></Link></li>
                                                        <li><Link to="/account"><Button>My Account</Button></Link></li>
                                                        <li><Link to="/login"><Button>Login</Button></Link></li>
                                                        <li><Link to="/register"><Button>Register</Button></Link></li>
                                                        <li><Link to="/forgot"><Button>Forgot Password</Button></Link></li>
                                                        <li><Link to="/reset"><Button>Reset Password</Button></Link></li>
                                                        <li><Link to="/terms"><Button>Terms of Services</Button></Link></li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </ClickAwayListener>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Right: Phone Info */}
                    <div className="col-sm-2 part3 d-flex align-items-center justify-content-end">
                        <div className="phNo d-flex align-items-center">
                            <span><LocalPhoneIcon /></span>
                            <div className="info ml-3">
                                <h3 className="text-g mb-0">9022462473</h3>
                                <p className="mb-0">24/7 Support Center</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nav;
