import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Contact = () => {
    const phoneNumber = "+917727097954";
    const phoneNumber2 = "+919414269086";
    const email = "viivveek4@gmail.com";

    const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [mobile, setMobile] = useState();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/enquiry', {
        name,
        mail,
        mobile,
        message
      });
      toast.success(`Thank You for reaching out to us, We'll contact you shortly`);
      console.log('received contact:', response.data);
      setTimeout(() => {
        window.location.reload();
      }, 3000); 
      
      // Handle success: show a success message or redirect if needed
    } catch (error) {
      console.error('Error receiving enquiry:', error);
      toast.error('We received your request, thank you for contacting again');
      // Handle error: show an error message or retry logic
    }
  };
  return (
    <>
    <ToastContainer/>
    <section className="contact w-100 d-flex flex-column">
	<div className="container">
		<div className="story row position-relative">
			<div className="col-md-3 ps-3 ms-md-5 my-5">
            <address>
                <div className='d-flex flex-column'>
                <span className='text-muted'>Get In Touch</span>
                <strong className='fs-4'>Barmer Button Store</strong>
                <span className='lead'>Get in Touch and let us know how we can help.</span>
                </div>
                <br/>
                <div className='d-flex'>
                <FontAwesomeIcon className="me-md-1" icon={faLocationDot} />:
                <a title='location on map' className='text-decoration-none text-black ms-2' href="https://www.google.co.in/maps/place/Barmer+Button+Store/@25.7423954,71.3851502,17z/data=!3m1!4b1!4m6!3m5!1s0x39443b0014e6c903:0xd772092598a6a576!8m2!3d25.7423954!4d71.3877251!16s%2Fg%2F11y30dsw09?entry=ttu">
                  Sadar Bazaar, Behd. Purani Sabji Mandi, 344001, Barmer,
                  Rajasthan
                </a>
                </div>
                <br />
                <div className='d-flex'>
                <FontAwesomeIcon className="me-md-1" icon={faPhone} />:
                <a
                  title="call:7727097954"
                  className="text-decoration-none text-black ms-2"
                  href={`tel:${phoneNumber}`}
                >
                  {phoneNumber}
                </a>
                ,
                <a
                  title="call:9414269086"
                  className="text-decoration-none text-black ms-2"
                  href={`tel:${phoneNumber2}`}
                >
                  {phoneNumber2}
                </a>
                </div>
                <br />
                <div className='d-flex'>
                <FontAwesomeIcon className="me-md-1" icon={faEnvelope} />:
                <a
                  title='mail-viivveek4@gmail.com'
                  className="text-decoration-none text-black ms-2"
                  href={`mailto:${email}`}
                >
                  bbs123@gmail.com
                </a>
                </div>
              </address>
			</div>
			<div className="col-md-7 offset-md-1 my-md-5 ps-md-3 text-start">
                <div>
                    <h2 className='ps-md-5'>Reason For Contacting</h2>
                    <p  className='ps-md-5 lead'>Our Team Will Contact You Shortly.</p>
                </div>
				<form className='pt-4' onSubmit={handleSubmit}>
                    <div className='ps-md-5 d-flex flex-lg-row flex-column'>
                        <input className='contentFromCustomer rounded-1 form-contorl w-50 w-lg-100 p-md-1 mb-lg-0 mb-1 fs-md-5' type='text' style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                        id="name-input"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} required></input>
                        <input className='contentFromCustomer rounded-1 form-contorl w-75 w-lg-100 p-md-1 mb-lg-0 mb-1 fs-md-5'  type='text' style={{ fontFamily: 'Arial, Helvetica, sans-serif' }} id="email-input"
              placeholder="Mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)} required ></input>
                        <input className='contentFromCustomer rounded-1 form-contorl w-sm-100 p-md-1 fs-md-5' type='number' style={{ fontFamily: 'Arial, Helvetica, sans-serif' }} id="mobile-input"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)} required></input>
                    </div>
                    <div className='px-md-5'>
                        <textarea className=' contentFromCustomerTx px-3 mt-4 rounded-1 fs-5' cols={57} rows={5} placeholder='Message for us' id="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)} style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}></textarea>
                    </div>
                    <button className='form-contorl btn theme-btn ms-md-5 mt-3'>Send</button>
                </form>
			</div>
		</div>
        </div>
    </section>
    </>
  )
}
