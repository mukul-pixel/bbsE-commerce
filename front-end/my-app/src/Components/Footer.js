import React from 'react'
// import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


export const Footer = () => {
    const phoneNumber = "+917727097954";
    const phoneNumber2 = "+919414269086";
    const email = "viivveek4@gmail.com";
  return (
    <>
      <div className="py-5 my-5">
        <div className='h-50'>.</div>
      </div>
      <footer className="footer bg-black text-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5>Our Company</h5>
              <hr className="border-4 w-25" />
              <ul className="list-unstyled">
                <li>
                  <span to="/" className="link text-decoration-none text-white">
                    About Us
                  </span>
                </li>
                <li>
                  <span
                    to="/about"
                    className="link text-decoration-none text-white"
                  >
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span
                    to="/category"
                    className="link text-decoration-none text-white"
                  >
                    Shipping & Return Policy
                  </span>
                </li>
                <li>
                  <span
                    to="/contact"
                    className="link text-decoration-none text-white"
                  >
                    Terms & Conditions
                  </span>
                </li>
                <li>
                  <span
                    to="/contact"
                    className="link text-decoration-none text-white"
                  >
                    Contact Us
                  </span>
                </li>
                <li>
                  <span
                    to="/contact"
                    className="link text-decoration-none text-white"
                  >
                    Blogs
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Categories</h5>
              <hr className="border-4 w-25" />
              <ul className="list-unstyled">
                <li>
                  <span to="/" className="link text-decoration-none text-white">
                    Embroidery Material
                  </span>
                </li>
                <li>
                  <span
                    to="/about"
                    className="link text-decoration-none text-white"
                  >
                    Embellishments
                  </span>
                </li>
                <li>
                  <span
                    to="/category"
                    className="link text-decoration-none text-white"
                  >
                    Tailoring Material
                  </span>
                </li>
                <li>
                  <span
                    to="/contact"
                    className="link text-decoration-none text-white"
                  >
                    Laces Borders
                  </span>
                </li>
                <li>
                  <span
                    to="/contact"
                    className="link text-decoration-none text-white"
                  >
                    Brooches
                  </span>
                </li>
                <li>
                  <span
                    to="/contact"
                    className="link text-decoration-none text-white"
                  >
                    Stones
                  </span>
                </li>
                <li>
                  <span
                    to="/contact"
                    className="link text-decoration-none text-white"
                  >
                    Patches
                  </span>
                </li>
                <li>
                  <span
                    to="/contact"
                    className="link text-decoration-none text-white"
                  >
                    Metal Buttons
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Quick Links</h5>
              <hr className="border-4 w-25" />
              <ul className="list-unstyled">
                <li>
                  <span to="/" className="link text-decoration-none text-white">
                    Home
                  </span>
                </li>
                <li>
                  <span
                    to="/about"
                    className="link text-decoration-none text-white"
                  >
                    About
                  </span>
                </li>
                <li>
                  <span
                    to="/category"
                    className="link text-decoration-none text-white"
                  >
                    Services
                  </span>
                </li>
                <li>
                  <span
                    to="/contact"
                    className="link text-decoration-none text-white"
                  >
                    Contact
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Contact Info.</h5>
              <hr className="border-4 w-25" />
              <address>
                <strong>Barmer Button Store</strong>
                <br />
                <FontAwesomeIcon className="me-1" icon={faLocationDot} />:
                <a title='location on map' className='text-decoration-none text-white ms-2' href="https://www.google.co.in/maps/place/Barmer+Button+Store/@25.7423954,71.3851502,17z/data=!3m1!4b1!4m6!3m5!1s0x39443b0014e6c903:0xd772092598a6a576!8m2!3d25.7423954!4d71.3877251!16s%2Fg%2F11y30dsw09?entry=ttu">
                  Sadar Bazaar, Behd. Purani Sabji Mandi, 344001, Barmer,
                  Rajasthan
                </a>
                <br />
                <FontAwesomeIcon className="me-1" icon={faPhone} />:
                <a
                  title="call:7727097954"
                  className="text-decoration-none text-white ms-2"
                  href={`tel:${phoneNumber}`}
                >
                  {phoneNumber}
                </a>
                ,
                <a
                  title="call:9414269086"
                  className="text-decoration-none text-white ms-2"
                  href={`tel:${phoneNumber2}`}
                >
                  {phoneNumber2}
                </a>
                <br />
                <FontAwesomeIcon className="me-1" icon={faEnvelope} />:
                <a
                  title='mail-viivveek4@gmail.com'
                  className="text-decoration-none text-white ms-2"
                  href={`mailto:${email}`}
                >
                  bbs123@gmail.com
                </a>
              </address>
            </div>
          </div>
          <hr className="border-4" />
          <div className="text-center">
            <p>&copy; 2024 Barmerbuttonstore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
