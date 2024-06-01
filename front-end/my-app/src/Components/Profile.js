import React , {useState,useEffect} from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export const Profile = () => {
    const [formData,setFormData] = useState({});
  const [loginError,setLoginError] = useState("");
  let userId = localStorage.getItem('userId');

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/profile?userId=${userId}`);
      const userData = response.data;
      if(!userData.error){
        setFormData(userData);
      }else{
        setLoginError("nodata");
      }
      // console.log(userData);

    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };
  useEffect(() => {
    fetchUserData(userId);
  }, []);
  return (
    <>
      {Object.keys(formData).length === 0?
      (<div className='parent d-flex justify-content-center vh-100'>
      <div className='child fs-3'>Please login yourself to see the profile section !</div>
    </div>):(<div className="container emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4 p-md-2 p-4 justify-content-center text-center">
              <div className="profile-img w-75 h-75 mx-auto mx-md-3">
                <img
                  className='h-100 w-100 rounded-circle'
                  src={formData.imageSrc ? (formData.imageSrc) : ("https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?w=185&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7")}
                  alt=""
                />
                {/* <div className="file btn btn-lg btn-primary">
                  <span style={{width:"1rem"}}>Change Photo</span>
                  <input type="file" name="file" />
                </div> */}
              </div>
            </div>
            <div className="col-md-6 h-auto mt-3">
              <div className="profile-head text-md-start">
                <h5>{formData.name}</h5>
                <h6>{formData.location?formData.location:""}</h6>
              </div>
            </div>
            <div className="col-md-2 mt-3">
            <NavLink to="/edit">
                <input
                type="button"
                className="profile-edit-btn border-0 rounded-5 w-100 p-2 cursor-pointer w-sm-100"
                name="btnAddMore"
                value="Edit Profile"
                />
            </NavLink>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 float-start mt-3">
              <div className="profile-work p-md-1 p-3 d-flex flex-column">
                <p className='mt-4 fs-6 fw-7'>Recommended products</p>
                <span className='text-decoration-none text-dark fs-6'>Product-1</span>
                <span className='text-decoration-none text-dark fs-6'>Product-2</span>
                <span className='text-decoration-none text-dark fs-6'>Product-3</span>
                <span className='text-decoration-none text-dark fs-6'>Product-4</span>
                <span className='text-decoration-none text-dark fs-6'>Product-5</span>
              </div>
            </div>
            <div className="col-md-8">
              <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="order-tab"
                    data-bs-toggle="tab"
                    href="#orders"
                    role="tab"
                    aria-controls="orders"
                    aria-selected="false"
                  >
                    Orders
                  </a>
                </li>
              </ul>
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row d-sm-flex flex-sm-row">
                    <div className="col-md-6 col-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6 col-6">
                      <p>{formData.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6 col-6">
                      <p>{formData.mail}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6 col-6">
                      <p>{formData.contact}</p>
                    </div>
                  </div>
                  {formData.location?(<div className="row">
                    <div className="col-md-6 col-6">
                      <label>location</label>
                    </div>
                    <div className="col-md-6 col-6">
                      <p>{formData.location}</p>
                    </div>
                  </div>):(
                    ""
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="orders"
                  role="tabpanel"
                  aria-labelledby="order-tab"
                >
                  <div className="card">
                    <div className="card-body row">
                        <span className='col-md-2'><img className='h-100 w-100' src='https://th.bing.com/th/id/OIP.fXsd2rSZXiQ3Usbg_7h6RQHaFd?w=209&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt=''></img></span>
                        <div className='col-md-6'>
                            <ul className='list-group'>
                                <li className='list-group-item border-0'><h4>product-detail 1</h4></li>
                                <li className='list-group-item border-0'>product-detail 2</li>
                                <li className='list-group-item border-0'>product-price</li>
                            </ul>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>)}
    </>
  );
}
