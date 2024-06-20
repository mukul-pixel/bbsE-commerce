import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faBagShopping,
  // faTruckFast,
  // faWallet,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImage from "../../src/images/dcd1ad97-eb2e-4bdf-afb2-aa66482dd1d3.svg";
import axios from "axios";

export const AdminNavbar = ({ children }) => {
  let sidebarOpen = true;
  let navigate = useNavigate();
  const [formData,setFormData] = useState({});
  
  useEffect(() => {
    let userId = localStorage.getItem('userId');
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(`https://bbse-commerce.onrender.com/profile?userId=${userId}`);
        const userData = response.data;
        if(!userData.error){
          setFormData(userData);
        }
  
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData(userId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate("/login");
  };
  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };
  return (
    <>
      <div className="row p-0">
        <span
          id="bdSidebar"
          className={`col-md-3 col-sm-6  d-flex flex-column flex-shrink-0 p-3 ${
            sidebarOpen ? "bg-black h-100" : ""
          } text-white offcanvas-md offcanvas-start`}
        >
          <Link to="/" className="navbar-brand">
            <img src={logoImage} height="40" className="ms-3" alt="Your Logo" />
            <span className="px-2">BBS SHOP</span>
          </Link>
          <hr />
          <ul className="mynav nav nav-pills flex-column mb-auto py-3">
            <li className="nav-item mb-2 px-2">
              <details>
                <summary className="mb-1">
                  <FontAwesomeIcon className="px-2" icon={faUser} />
                  User
                </summary>
                <ul className="mb-2">
                  {/* Dropdown menu items */}
                  <li>
                    <Link to="/viewuser" className="text-light text-decoration-none">
                      View User
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="nav-item mb-2 px-2">
              <details>
                <summary className="mb-1">
                  <FontAwesomeIcon className="px-2" icon={faBagShopping} />
                  Product
                </summary>
                <ul className="mb-2">
                  {/* Dropdown menu items */}
                  <li>
                    <NavLink
                      to="/addProduct"
                      className="text-light text-decoration-none"
                    >
                      Add Product
                    </NavLink>
                  </li>
                  <li>
                    <Link to="/viewproduct" className="text-light text-decoration-none">
                      View Product
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="nav-item mb-2 px-2">
              <details>
                <summary className="mb-1">
                  <FontAwesomeIcon className="px-2" icon={faBagShopping} />
                  Enquiries
                </summary>
                <ul className="mb-2">
                  {/* Dropdown menu items */}
                  <li>
                    <NavLink
                      to="/enquiries"
                      className="text-light text-decoration-none"
                    >
                      view enquiry
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            {/* <li className="nav-item mb-2 px-2">
              <details>
                <summary className="mb-1">
                  <FontAwesomeIcon className="px-2" icon={faTruckFast} />
                  Orders
                </summary>
                <ul className="mb-2 list-unstyled">
                  <li className="nav-item ms-2 px-2">
                    <details>
                      <summary className="mb-1">Online Orders</summary>
                      <ul className="mb-2">
                  <li className="nav-item mb-2 px-2">
                    <Link href="#" className="text-light text-decoration-none">
                      New
                    </Link>
                  </li>
                  <li className="nav-item mb-2 px-2">
                    <Link href="#" className="text-light text-decoration-none">
                      Processed
                    </Link>
                  </li>
                  <li className="nav-item mb-2 px-2">
                    <Link href="#" className="text-light text-decoration-none">
                      Shipped
                    </Link>
                  </li>
                </ul>
                      </details>
                  </li>
                  <li className="nav-item ms-2 mb-2 px-2">
                    <details>
                      <summary className="mb-1">
                      Offline Orders
                      </summary>
                      <ul>
                        <li className="nav-item mb-2 px-2">Create Order</li>
                        <li className="nav-item mb-2 px-2">View Order</li>
                      </ul>
                    </details>
                    </li>
                </ul>
              </details>
            </li>
            <li className="nav-item mb-2 px-2">
              <details>
                <summary className="mb-1">
                  <FontAwesomeIcon className="px-2" icon={faWallet} />
                  Transaction
                </summary>
                <ul className="mb-2">
                  <li>
                    <Link href="#" className="text-light text-decoration-none">
                      View Transaction
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-light text-decoration-none">
                      Latest Transaction
                    </Link>
                  </li>
                </ul>
              </details>
            </li> */}
            <li className="nav-item mb-2 px-2">
              <details>
                <summary className="mb-1">
                  <FontAwesomeIcon className="px-2" icon={faLandmark} />
                  Account
                </summary>
                <ul className="mb-2">
                  {/* Dropdown menu items */}
                  <li>
                    <button onClick={handleLogout}  className="bg-black text-white border-0">
                      Logout
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
          <div className="py-md-5 my-md-5"></div>
          <div className="py-md-5 my-md-5"></div>
          <hr />
          <div className="text-center">
            <span>{formData.name}</span>
          </div>
        </span>
        <div
          className={`col-md-9 col-12 p-0 ms-md-0 ms-2 bg-light ${
            sidebarOpen ? "" : "d-none"
          }`}
        >
          <div className="p-2 d-md-none d-flex text-white bg-black">
            <Link
              href="#"
              className="text-white"
              data-bs-toggle="offcanvas"
              data-bs-target="#bdSidebar"
            >
              <FontAwesomeIcon className="ms-3" icon={faBars} />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
