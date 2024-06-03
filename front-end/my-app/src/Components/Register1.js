import React, { useState } from 'react'
import logoimg from "../images/logo2.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
    let [name,setName] = useState("");//hold the current value
    let [nameError,setNameError] = useState("");//error after validation
    let [mail,setMail] = useState("");
    let [mailError,setMailError] = useState("");
    let [contact,setContact] = useState("");
    let [contactError,setContactError] = useState("");
    let [password,setPassword] = useState("");
    let [passwordError,setPasswordError] = useState("");

    const navigate = useNavigate();

    //validation function for every field 

    //name
    const nameValidation = (value)=>{
      if(!value.trim()){
        setNameError("name is required !");
      }else if(value.length<2){
        setNameError("name should contain more than 2 characters");
      }else if(value.length>50){
        setNameError("name should not exceed 50 characters");
      }else{
        setNameError("");
      }
    }

    //mail
    const mailValidation = (value)=>{
      if(!value.trim()){
        setMailError("email is required !");
      }else if (!/\S+@\S+\.\S+/.test(value)) {
        setMailError("Please enter a valid email address");
      }else {
        setMailError("");
      }
    }

    //contact
    const contactValidation = (value)=>{
      if(!value.trim()){
        setContactError("contact number is required !");
      }else if(value[0]<=5){
        setContactError("contact number should start with 6 or greater number")
      }else if(value.length<10){
        setContactError("contact number should have 10 numbers")
      }else if(value.length>10){
        setContactError("contact number should not have more than 10 numbers")
      }else{
        setContactError("");
      }
    }

    //password
    const passwordValidation = (value)=>{
      if (!value.trim()) {
        setPasswordError("Password is required");
      } else if (!/\d/.test(value)) {
        setPasswordError("Password should contain at least one digit");
      } else if (!/[a-zA-Z]/.test(value)) {
        setPasswordError("Password should contain at least one letter");
      } else if (value.length < 8) {
        setPasswordError("Password should be at least 8 characters long");
      } else {
        setPasswordError("");
      }
    }


    //onChange handling functions for every field

    //name
    const handleNameChange = (e)=>{
      setName(e.target.value);
      nameValidation(e.target.value);
    }

    //mail
    const handleMailChange = (e)=>{
      setMail(e.target.value);
      mailValidation(e.target.value);
    }

    //contact
    const handleContactChange = (e)=>{
      setContact(e.target.value);
      contactValidation(e.target.value);
    }

    //password
    const handlePasswordChange = (e)=>{
      setPassword(e.target.value);
      passwordValidation(e.target.value);
    }

    //dynamic validation- we need to use axios post and backend too

    const backend = (formData) => {
      const { name, mail, contact, password } = formData;
    
      axios.post("https://bbse-commerce.onrender.com/register", { name, mail, contact, password })
        .then(result => {
          if (result.data.message === "exists") {
            toast.error('User Already Exists. Please login.');
          }else if (result.status === 201){
            toast.success('User registered successfully');
              localStorage.setItem('token', result.data.token);
              localStorage.setItem('userId',result.data.userId);
              navigate("/");
          } else {
            toast.error('An error occurred while registering. Please try again later.');
          }
        })
        .catch(error => {
          toast.error('An error occurred while registering. Please try again later.');
          console.error("Error registering user:", error);
        });
    }
    const handleSubmit = (e)=>{
      e.preventDefault();

      // Validate form fields
      nameValidation(name);
      passwordValidation(password);
      mailValidation(mail);
      contactValidation(contact);

      // Check for any validation errors or empty fields
      if (
        nameError ||
        passwordError ||
        mailError ||
        contactError ||
        !name.trim() ||
        !mail.trim() ||
        !contact.trim() ||
        !password.trim()
      ) {
        toast.error("Please fix all errors and fill in all fields");
        return;
      }

      // If no errors, proceed with form submission
      const formData = { name, mail, contact, password };
      backend(formData);
    }
  return (
    <>
    <ToastContainer />
    <section className="h-100 bg-black">
    <div className="row d-flex justify-content-center align-items-center p-md-5 p-3 h-100">
      <div className="col p-md-5">
        <div className="card h-auto w-auto card-registration p-md-5">
          <div className="row g-0" style={{height:"50%"}}>
            <div className="col-xl-6 d-none d-xl-block">
              <img src={logoimg}
                alt="Sample" className="img-fluid"
                style={{borderTopLeftRadius: ".25rem", borderBottomLeftRadius: ".25rem", height:"100%" }}/>
            </div>
            <form className="col-xl-6 py-3 px-md-5 border" onSubmit={handleSubmit}>
              <div className="card-body p-md-5 text-black">
                <h3 className="mb-5 text-uppercase">Sign Up</h3>

                <div className="mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label fs-6" htmlFor="form3Example1m">Full name</label>
                      {/* <input type="text" id="form3Example1m" className="form-control form-control-lg fs-6" /> */}
                      <input type='text'autoComplete='OFF' className={`form-control form-control-lg fs-6  ${nameError ? 'error' : ''}`} style={{ boxShadow: nameError ? '0px 0px 0px 2px rgba(255, 0, 0, 0.3)' : 'none' , border: nameError ? '1px solid rgba(255, 0, 0, 0.3)' : '' ,transition: 'box-shadow 0.3s, border-color 0.3s' }} onChange={handleNameChange}/>
                      {nameError?<p className='text-danger'>{nameError}</p>:<p></p>}
                    </div>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label  fs-6" htmlFor="form3Example97">Email ID</label>
                  {/* <input type="email" id="form3Example97" className="form-control form-control-lg  fs-6" /> */}
                  <input type='text' autoComplete='OFF' className={`form-control form-control-lg  fs-6 ${mailError ? 'error' : ''}`} style={{ boxShadow: mailError ? '0px 0px 0px 2px rgba(255, 0, 0, 0.3)' : 'none' , border: mailError ? '1px solid rgba(255, 0, 0, 0.3)' : '' }}  onChange={handleMailChange} />
        {mailError?<p className='text-danger'>{mailError}</p>:<p></p>}
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label fs-6" htmlFor="form3Example90">Contact number</label>
                  {/* <input type="number" id="form3Example90" className="form-control form-control-lg fs-6" /> */}
                  <input type='number' autoComplete='OFF' className={`form-control form-control-lg fs-6 ${contactError ? 'error' : ''}`} style={{ boxShadow: contactError ? '0px 0px 0px 2px rgba(255, 0, 0, 0.3)' : 'none' , border: contactError ? '1px solid rgba(255, 0, 0, 0.3)' : '' }} onChange={handleContactChange} />
        {contactError?<p className='text-danger'>{contactError}</p>:<p></p>}
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label fs-6" htmlFor="form3Example97">Password</label>
                  {/* <input type="password" id="form3Example97" className="form-control form-control-lg fs-6" /> */}
                  <input type='password'autoComplete='OFF' className={`form-control form-control-lg fs-6 ${passwordError ? 'error' : ''}`} style={{ boxShadow: passwordError ? '0px 0px 0px 2px rgba(255, 0, 0, 0.3)' : 'none' , border: passwordError ? '1px solid rgba(255, 0, 0, 0.3)' : '' }} onChange={handlePasswordChange}/>
        {passwordError?<p className='text-danger'>{passwordError}</p>:<p></p>}
                </div>

                <div className="d-flex justify-content-center pt-3">
                  <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-dark btn-lg fs-6">Register</button>
                </div>
                <div className='d-flex justify-content-center p-3'>
                Already have an account ?
                <Link to='/login'>Click here!</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</section>
    </>
  )
}
