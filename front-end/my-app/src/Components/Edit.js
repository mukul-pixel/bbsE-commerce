import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Edit = () => {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({});
    const [loginError,setLoginError] = useState("");
    const[name,setName] = useState(formData.name);
    const[mail,setMail] = useState(formData.mail);
    const[location,setLocations] = useState(formData.location);
    const[contact,setContact] = useState(formData.contact);
    const[imageSrc,setImageSrc] = useState(formData.imageSrc);
    let userId = localStorage.getItem('userId');

    
      useEffect((userId) => {
        const fetchUserData = async (userId) => {
          try {
            const response = await axios.get(`https://bbse-commerce.onrender.com/profile?userId=${userId}`);
            const userData = response.data;
            if(!userData.error){
              setFormData(userData);
              setName(userData.name);
              setMail(userData.mail);
              setLocations(userData.location);
              setContact(userData.contact);
              setImageSrc(userData.imageSrc);
            }else{
              setLoginError("nodata");
            }
      
          } catch (err) {
            console.error("Error fetching user data:", err);
          }
        };
        fetchUserData(userId);
      }, []);

      const handleFileChange =(e)=>{ 
        const file = e.target.files[0];
        const reader = new FileReader();
    
      reader.onload = () => {
        setImageSrc(reader.result);
      };
    
      if (file) {
        reader.readAsDataURL(file);
      }
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log({name,mail,contact,location,imageSrc,userId});
        try{
            const response = await axios.put("https://bbse-commerce.onrender.com/edit", {
            name,
            mail,
            location,
            contact,
            imageSrc,
            userId
        });

        console.log("User data updated successfully:",response);
        navigate("/profile");

        } catch (error) {

        console.error("Error updating user data:", error.response.error);
  }
        }
  return (
    <>
    <div className='d-none'>{loginError}</div>
    <div className='row bg-black p-4'>
        <div className='col-md-6 text-white'>
            <h3>PERSONAL</h3>
            <p>Add a permanent address where you can receive mail.</p>
        </div>
        <form className='col-md-6'>
            <div className='row w-full gap-3'>
                <div className='col-md-3 col-12 p-md-1 p-5 '>
                    <img className='h-100 w-100 p-md-1 p-5 rounded-3'src={imageSrc} alt='profilePhoto'></img>
                </div>
                <div className='col-md-7 col-12'>
                    <div className='borders rounded-3 h-100 w-100 d-flex justify-content-center align-items-center'>
                    <input type='file' accept="image/*" onChange={handleFileChange} name="profileImage" ></input>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-10 text-white mt-3'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' value={name}  onChange={(e) => setName(e.target.value)} className='form-control text-black' placeholder='name'></input>
                </div>
            </div>
            <div className='col-md-10 text-white mt-3'>
                    <label htmlFor='mail'>E-mail</label>
                    <input type='mail' value={mail}  onChange={(e) => setMail(e.target.value)} className='form-control text-black' placeholder='mail@gmail.com'></input>
                </div>
            <div className='col-md-10 text-white mt-3'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' value={location}  onChange={(e) => setLocations(e.target.value)} className='form-control text-black' placeholder='location'></input>
                </div>
            <div className='col-md-10 text-white mt-3'>
                    <label htmlFor='contact'>Contact Info</label>
                    <input type='number' value={contact} onChange={(e) => setContact(e.target.value)} className='form-control text-black' placeholder='contact'></input>
                </div>
            <hr className="border-3 hrTag" />

            <NavLink to='/profile' type='button' onClick={handleSubmit} className="btn btn-primary">SAVE</NavLink>
        </form>
    </div>
    </>
  )
}
