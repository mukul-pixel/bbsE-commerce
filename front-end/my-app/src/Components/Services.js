import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake, faLocationDot, faRankingStar, faTruckFast } from '@fortawesome/free-solid-svg-icons';

export const Services = () => {
  return (
   <>
   <section id='services'>
        <div className="container py-6">
            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="lc-block text-center text-md-start mb-4">
                        <div editable="rich">
                            <h1 className="display-5 fw-bold">Services</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row pt-4">
                <div className="col-md-6 mb-6 mb-md-5">
                    <div className="lc-block p-4 my-md-0 my-2 card shadow position-relative">
                        <div className="card-body">
                            <div className="lc-block text-white position-absolute top-0 mt-3 bg-black p-3 rounded-3 shadow">
                             <FontAwesomeIcon classNameName='text-white' icon={faTruckFast} />
                            </div>

                            <div className="lc-block pt-5 ">
                                <div editable="rich">
                                    <h2 className="fw-bold h3">Home Delivery</h2>
                                    <p className="rfs-7">
                                        Experience the convenience of our home delivery service, designed to bring your favorite products right to your doorstep.Our team is dedicated to providing timely and careful deliveries, allowing you to enjoy more time for the things that matter most.
                                    </p>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-6 mb-md-5">
                    <div className="lc-block p-4 card shadow position-relative">
                        <div className="card-body">
                        <div className="lc-block text-white position-absolute top-0 mt-3 bg-black p-3 rounded-3 shadow">
                             <FontAwesomeIcon classNameName='text-white' icon={faLocationDot} />
                            </div>

                            <div className="lc-block pt-5 ">
                                <div editable="rich">

                                    <h2 className="fw-bold h3">Pick-Up</h2>
                                    <p className="rfs-7"> Our convenient pick-up service allows you to collect your orders quickly and effortlessly. Simply place your order online, choose the pick-up option, and we'll have everything ready for you at our location. Avoid the wait and enjoy the flexibility of picking up your items at a time that suits your schedule.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row pt-4">
                <div className="col-md-6 mb-6 mb-md-5">
                    <div className="lc-block p-4  my-md-0 my-2 card shadow position-relative">
                        <div className="card-body">
                        <div className="lc-block text-white position-absolute top-0 mt-3 bg-black p-3 rounded-3 shadow">
                             <FontAwesomeIcon classNameName='text-white' icon={faRankingStar} />
                            </div>

                            <div className="lc-block pt-5 ">
                                <div editable="rich">

                                    <h2 className="fw-bold h3">Quality Products</h2>
                                    <p className="rfs-7"> Each product is selected with a focus on quality, reliability, and value, ensuring that you get the best with every purchase. Whether you’re shopping for everyday essentials or specialty items, you can trust that our products will enhance your lifestyle and provide exceptional performance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-6 mb-md-5">
                    <div className="lc-block p-4 card shadow position-relative">
                        <div className="card-body">
                        <div className="lc-block text-white position-absolute top-0 mt-3 bg-black p-3 rounded-3 shadow">
                             <FontAwesomeIcon classNameName='text-white' icon={faHandshake} />
                            </div>

                            <div className="lc-block pt-5 ">
                                <div editable="rich">

                                    <h2 className="fw-bold h3">Trust</h2>
                                    <p className="rfs-7"> With over 15 years of experience in the offline market, we have built a strong foundation of trust and reliability with our customers. Our commitment to excellence and customer satisfaction has earned us a loyal clientele who count on us for quality products and exceptional service.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
   </>
  )
}
