import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const[mail,setMail]=useState("");
  const[password,setPassword]=useState("");
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(mail,password);
  
    // Check if email or password is empty
    if (!mail.trim()) {
      toast.warn("Email is required");
      return;
    }
  
    if (!password.trim()) {
      toast.warn("Password is required");
      return;
    }

    try{
        axios.post("http://localhost:5000/login",
        {mail,password}
      )
      .then(res=>{
        console.log(res.data);
        if(res.data.msg === 'Login Successful'){
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId',res.data.userId);
          const role = res.data.role;
          localStorage.setItem('role', role);

          // Redirect based on role
          if (role === 'admin') {
              navigate('/admin'); // Redirect to UserRoutes' page
          } else if (role === 'user') {
              navigate('/'); // Redirect to AdminRoutes' page
          }
          // navigate("/")
        }else if(res.data === "User not found"){
          toast.error("User doesn't exist, please register yourself")
        } else {
          toast.error("Invalid Credential, please check your email or password")
          console.log("invalid credentials")
        }
      })
      .catch(e=>{
        console.log(e);
      })
      }catch(e){
        console.log(e);
      }
  }


  return (
    <>
      <ToastContainer/>
      <section>
        <div className="loginImage row vh-100 justify-content-center align-items-center">
          <div className="overlay h-100 w-100 d-flex flex-column justify-content-center align-items-center">
            <div className="text-center d-flex flex-column justify-content-center align-items-center ">
              <h2 className="d-inline p-3 text-white">LOGIN ACCOUNT</h2>
              <form onSubmit={handleSubmit} className="card px-4 pt-4 " style={{ width: "22rem" }}>
                <ul className="list-group list-group-flush w-auto">
                  <li className="list-group-item d-flex align-items-center p-3">
                    <FontAwesomeIcon icon={faUser} className="" />
                    <input
                      type="text"
                      className="form-control mx-3"
                      placeholder="enter your email"
                      onChange={(e)=>{setMail(e.target.value)}}
                    />
                  </li>
                  <li className="list-group-item d-flex flex-column text-end p-3">
                    <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    <input
                      type="password"
                      className="form-control mx-3"
                      placeholder="enter your password"
                      onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    </div>
                    <Link to="/forgotpassword" className="me-3">forgot password?</Link>
                  </li>
                    <div className="d-flex flex-column p-4 justify-content-center">
                    <button type="submit" className="btn btn-outline-dark">
                      Sign In
                    </button>
                      <Link to="/register" className="text-center">
                        Create an account !
                      </Link>
                    </div>
                 
                </ul>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
