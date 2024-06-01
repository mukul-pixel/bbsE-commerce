import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export const Contact = () => {
    const phoneNumber = "+917727097954";
    const phoneNumber2 = "+919414269086";
    const email = "viivveek4@gmail.com";
  return (
    <>
    <section className="contact vh-100 w-100 d-flex flex-column text-align-center align-items-center">
	<div className="container">
		<div className="story row position-relative">
			<div className="col-md-3 ps-3 ms-5">
            <address>
                <div className='d-flex flex-column'>
                <span className='text-muted'>Get In Touch</span>
                <strong className='fs-4'>Barmer Button Store</strong>
                <span className='lead'>Get in Touch and let us know how we can help.</span>
                </div>
                <br/>
                <FontAwesomeIcon className="me-1" icon={faLocationDot} />:
                <a title='location on map' className='text-decoration-none text-black ms-2' href="https://www.google.co.in/maps/place/Barmer+Button+Store/@25.7423954,71.3851502,17z/data=!3m1!4b1!4m6!3m5!1s0x39443b0014e6c903:0xd772092598a6a576!8m2!3d25.7423954!4d71.3877251!16s%2Fg%2F11y30dsw09?entry=ttu">
                  Sadar Bazaar, Behd. Purani Sabji Mandi, 344001, Barmer,
                  Rajasthan
                </a>
                <br />
                <FontAwesomeIcon className="me-1" icon={faPhone} />:
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
                <br />
                <FontAwesomeIcon className="me-1" icon={faEnvelope} />:
                <a
                  title='mail-viivveek4@gmail.com'
                  className="text-decoration-none text-black ms-2"
                  href={`mailto:${email}`}
                >
                  bbs123@gmail.com
                </a>
              </address>
			</div>
			<div className="col-md-7 offset-md-1 ps-3">
                <div>
                    <h2 className='ps-5'>Reason For Contacting</h2>
                    <p  className='ps-5 lead'>Our Team Will Contact You Shortly.</p>
                </div>
				<form className='pt-4'>
                    <div className='ps-5'>
                        <input className='contentFromCustomer form-contorl rounded-1 fs-5' id='name' type='text' style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                        placeholder='Name'></input>
                        <input className='contentFromCustomer form-contorl rounded-1 fs-5' id='mobile' type='text' style={{ fontFamily: 'Arial, Helvetica, sans-serif' }} placeholder='Mobile'></input>
                        <input className='contentFromCustomer form-contorl rounded-1 fs-5' id='mail' type='text' style={{ fontFamily: 'Arial, Helvetica, sans-serif' }} placeholder='Mail'></input>
                    </div>
                    <div className='px-5'>
                        <textarea className=' contentFromCustomerTx px-3 mt-4  rounded-1 fs-5' cols={57} rows={5} placeholder='Message for us' style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}></textarea>
                    </div>
                    <button className='form-contorl btn btn-outline-dark ms-5 mt-3'>Send</button>
                </form>
			</div>
		</div>
        </div>
    </section>
    </>
  )
}
