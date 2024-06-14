import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import logoImage from '../../src/images/dcd1ad97-eb2e-4bdf-afb2-aa66482dd1d3.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { About } from './About';
import { NavLink, useNavigate } from 'react-router-dom';
import { Contact } from './Contact';
import { Products } from './Products';



export const Navbars = () => {
  const [isLogin, setIsLogin] = useState(false);
  let navigate = useNavigate();
  // const token = localStorage.getItem('token');

   useEffect((handleLogout) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      const newUser = localStorage.getItem('role');
      const newUserId = localStorage.getItem('userId');
      if (newToken !== token || newUser !== user || newUserId !== userId) {
        setIsLogin(false);
        handleLogout();
        navigate("/login");
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    setIsLogin(false);
    navigate("/login");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <img
            src={logoImage}
            height="40"
            className="d-inline-block align-top ms-3"
            alt="Your Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto">
            <NavLink
              className="text-decoration-none text-black mt-2 mx-3"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="text-decoration-none text-black mt-2 mx-3"
              to="/about"
              element={<About />}
            >
              About
            </NavLink>
            <NavLink 
            className="text-decoration-none text-black mt-2 mx-3"
            to="/products"
            element={<Products/>}
            >Products</NavLink> 
            <NavLink
              className="text-decoration-none text-black mt-2 mx-3"
              to="/contact"
              element={<Contact />}
            >
              Contact
            </NavLink>
            <a
              className="text-decoration-none text-black mt-2 mx-3"
              href='#services'
            >
              Services
            </a>
          </Nav>
          <form className="d-flex mx-auto me-md-3 my-md-0 my-2">
            <input
              className="form-control w-md-auto w-50 my-md-2 my-0 me-md-3 mx-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{fontSize:"small"}}
            />
            <button
              className="btn my-md-2 my-0 me-md-3 me-1"
              type="submit"
              style={{fontSize:"small"}}
            >
              Search
            </button>
            {isLogin ? (
  <>
    <button onClick={handleLogout} style={{fontSize:"small"}} className="btn theme-btn my-md-2 my-0 me-md-3 ">
      Logout
    </button>
  </>
) : (
  <>
    <button onClick={handleLogout} style={{fontSize:"small"}} className="btn theme-btn my-md-2 my-0 me-md-3">
      Login
    </button>
  </>
)}
          </form>
          <div className='my-md-1 my-3'>
            <NavLink
      to="/profile"
      title="Profile"
      className="px-3 py-1 mt-2 text-black"
    >
      <FontAwesomeIcon style={{ height: "22" }} icon={faUser} />
    </NavLink>
    {/* <NavLink to="/cart" title="Cart" className="px-3 py-1 mt-2 text-black">
      <FontAwesomeIcon style={{ height: "22" }} icon={faShoppingCart} />
    </NavLink> */}
    <a
              title="Find Us At"
              className="px-3 py-1 mt-2 text-black"
              href="https://www.google.co.in/maps/place/Barmer+Button+Store/@25.7423954,71.3851502,17z/data=!3m1!4b1!4m6!3m5!1s0x39443b0014e6c903:0xd772092598a6a576!8m2!3d25.7423954!4d71.3877251!16s%2Fg%2F11y30dsw09?entry=ttu"
            >
              <FontAwesomeIcon style={{ height: "22" }} icon={faLocationDot} />
            </a>
            </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
