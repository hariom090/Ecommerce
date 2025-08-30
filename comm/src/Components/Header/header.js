import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './header.css';
import logo from '../../Assets/Img/APSA-removebg-preview.png';
import SearchIcon from '../../Assets/Icons/search_icon.png';
import Select from "../SelectDrop/select";
import WishlistIcon from '../../Assets/Icons/wishlist.png';
import CartIcon from '../../Assets/Icons/shopping-cart.png';
import UserIcon from '../../Assets/Icons/user.png';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import HomeIcon from '@mui/icons-material/Home';
import { StoreContext } from "../../Context/storeContext";
import { AuthContext } from "../../Context/authContext.js";

const Header = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const navigate = useNavigate();
  const { cart, wishlist } = useContext(StoreContext);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleSignOut = () => {
    setIsOpenDropdown(false);
    logout();
    navigate("/login");
  };

  const [categories] = useState([
    'All Categories', 'Earings', 'Neck Chain', 'Finger Rings', 'Hair Clips',
    'Bracelets', 'Watches', 'Broches', 'Sling Bags', 'Wedding Bags',
    'Clutch', 'Wallets', 'Necklace', 'Kada', 'Belts'
  ]);

  // ✅ Check login status using tokens only
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   setIsLoggedIn(!!accessToken); 
  // }, []);

  // const handleSignOut = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   setIsOpenDropdown(false);
  //   setIsLoggedIn(false);
  //   navigate("/login");
  // };

  return (
    <div className="headerWrap fixed">
      <header>
        <div className='container-fluid py-3'>
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-sm-2 d-flex align-items-center">
              <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
              </Link>
            </div>

            {/* Search bar */}  
            <div className="col-sm-6">
              <div className="headerSearch d-flex align-items-center">
                <Select data={categories} placeholder='All Categories' />
                <div className="search">
                  <input type="text" placeholder="Search for items" />
                  <img src={SearchIcon} className="searchIcon" alt="Search" />
                </div>
              </div>
            </div>

            {/* Header Tabs */}
            <div className="col-sm-4 d-flex justify-content-end">
              <ClickAwayListener onClickAway={() => setIsOpenDropdown(false)}>
                <ul className="list list-inline mb-0 headerTabs d-flex gap-4">
                  <li>
                    <Link to="/" className="d-flex align-items-center gap-2">
                      <HomeIcon className="homeicon" />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="position-relative">
                    <Link to="/wishlist" className="d-flex align-items-center gap-2">
                      <img src={WishlistIcon} alt="Wishlist" />
                      <span>Wishlist</span>
                      {wishlist.length > 0 && <span className="badgeCount">{wishlist.length}</span>}
                    </Link>
                  </li>
                  <li className="position-relative">
                    <Link to="/cart" className="d-flex align-items-center gap-2">
                      <img src={CartIcon} alt="Cart" />
                      <span>Cart</span>
                      {cart.length > 0 && <span className="badgeCount">{cart.length}</span>}
                    </Link>
                  </li>
                  <li
                    className="d-flex align-items-center gap-2 position-relative"
                    onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                  >
                    <img src={UserIcon} alt="User" />
                    <span>Account</span>
                    {isOpenDropdown && (
                      <ul className="dropdownMenu">
                        <li>
                          <Button onClick={() => {
                            setIsOpenDropdown(false);
                            navigate(isLoggedIn ? "/account" : "/login");
                          }}>
                            <img src={UserIcon} alt="User" /> {isLoggedIn ? "My Account" : "Login"}
                          </Button>
                        </li>
                        {isLoggedIn && (
                          <>
                            <li>
                              <Button><FmdGoodIcon /> Order Tracking</Button>
                            </li>
                            <li>
                              <Button onClick={() => navigate("/wishlist")}>
                                <img src={WishlistIcon} alt="Wishlist" /> My Wishlist
                              </Button>
                            </li>
                            <li>
                              <Button><SettingsIcon /> Settings</Button>
                            </li>
                            <li>
                              <Button onClick={handleSignOut}>
                                <ExitToAppIcon /> Sign Out
                              </Button>
                            </li>
                          </>
                        )}
                      </ul>
                    )}
                  </li>
                </ul>
              </ClickAwayListener>
            </div>
          </div>
        </div>
      </header>
      <hr />
    </div>
  );
};

export default Header;
