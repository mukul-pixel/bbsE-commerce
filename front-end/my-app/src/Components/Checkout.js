import React, { useState } from 'react'
import { faIndianRupee, faLocationDot, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from 'react-router-dom';
// import axios from 'axios';

export const Checkout = () => {
  const location = useLocation();
  const { cart = [], productDetails = [] } = location.state || {}; // Destructure cart and productDetails
  const userId = localStorage.getItem('userId')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'credit',
    ccName: '',
    ccNumber: '',
    ccExpiration: '',
    ccCVV: ''
});

// const [validated, setValidated] = useState(false);

const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
        ...prevData,
        [id]: value
    }));
};

const generateOrderId = () => {
  const now = new Date();
  const datePart = now.toISOString().split('T')[0].replace(/-/g, '');
  const timePart = now.toTimeString().split(' ')[0].replace(/:/g, '');
  return `ORDER_${datePart}_${timePart}`;
};

const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //     setValidated(true);
    //     return;
    // }

    const orderId = generateOrderId();
      const orderData = {
        orderId:orderId, // Replace with actual order ID logic
        userId: userId, // Replace with actual user ID logic
        customerName: `${formData.firstName} ${formData.lastName}`,
        address: [{
            street: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zip
        }],
        items: [], // Replace with actual items logic
        customerContact: '1234567890', // Replace with actual contact logic
        customerEmail: formData.email,
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'done', // or use actual payment status logic
        orderType: 'online',
        createdBy: 'computer'
    };

    try {
      console.log(orderData);
        // const response = await axios.post('http://localhost:5000/orders', orderData);
        // if (response.status === 200) {
        //     console.log('Order submitted successfully');
        // }
    } catch (error) {
        console.error('Error submitting order', error);
    }
};
  
  const findProductDetails = (id) => {
    const product = productDetails.find(product => product._id === id);
    return product;
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, cartItem) => {
    const product = findProductDetails(cartItem.productId);
    return total + (product ? product.productPrice * cartItem.quantity : 0);
  }, 0);

  return (
    <div className='h-auto justify-content-center d-flex'>
    <div className='w-75 justify-content-md-center text-md-center'>
    <div className='text-center fs-5 p-3'>CHECKOUT</div>
    <div className='row'>
    <div className="col-md-4 order-md-2 mt-md-4 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-black">In Your Cart</span>
                    <span className="badge badge-secondary badge-pill">3</span>
                </h4>
                <ul className="list-group mb-3">
        {cart.map((cartItem) => {
          const product = findProductDetails(cartItem.productId);
          return (
            <li key={cartItem.productId} className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">{product?.productName}</h6>
                <small className="text-muted">Quantity: {cartItem.quantity}</small>
              </div>
              <span className="text-muted"><FontAwesomeIcon className='fs-6 px-2' icon={faIndianRupee} />{product ? product.productPrice * cartItem.quantity : 'N/A'}</span>
            </li>
          );
        })}
        <li className="list-group-item d-flex justify-content-between">
          <span>Total (INR)</span>
          <strong><FontAwesomeIcon className='fs-6 px-2' icon={faIndianRupee} />{totalPrice}</strong> {/* Adjust total price considering the promo code */}
        </li>
      </ul>
                <form className="card p-2">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Promo code"/>
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-secondary">Redeem</button>
                        </div>
                    </div>
                </form>
            </div>
      <div className='col-md-8 order-md-1'>
        <div className='text-start fs-5 py-4'>Delivery Options</div>
        <ul className="nav nav-pills mb-3 row" id="pills-tab" role="tablist">
  <li className="nav-item col-6" role="presentation">
    <button className="nav-link active text-black w-75" id="pills-shipping-tab" style={{border:"2px solid black"}} data-bs-toggle="pill" data-bs-target="#pills-shipping" type="button" role="tab" aria-controls="pills-shipping" aria-selected="true"><FontAwesomeIcon className='fs-6 px-2' icon={faTruckFast} />Shipping</button>
  </li>
  <li className="nav-item col-6" role="presentation">
    <button className="nav-link text-black w-75" id="pills-pickUp-tab" style={{border:"2px solid black"}} data-bs-toggle="pill" data-bs-target="#pills-pickUp" type="button" role="tab" aria-controls="pills-pickUp" aria-selected="false"><FontAwesomeIcon className='fs-6 px-2' icon={faLocationDot} />Pick Up</button>
  </li>
  <style>
        {`
          .nav-link.active {
            background-color: black !important;
            color: white !important;
          }
        `}
      </style>
</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active text-start" id="pills-shipping" role="tabpanel" aria-labelledby="pills-shipping-tab">
  <form className="needs-validation" onSubmit={handleSubmit} noValidate>
    {/* <span className='fs-3'>1.IncompleteTask-Form- save form and it's data in the Database backend API missing</span> */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">First name</label>
                            <input type="text" className="form-control" id="firstName" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="lastName">Last name</label>
                            <input type="text" className="form-control" id="lastName" onChange={handleChange} placeholder="" required/>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contact">Contact Number</label>
                        <input type="number" className="form-control" id="contact" onChange={handleChange} required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" onChange={handleChange} placeholder="you@example.com" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" onChange={handleChange} placeholder="1234 Main St" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                        <input type="text" className="form-control" id="address2" onChange={handleChange} placeholder="Apartment or suite"/>
                    </div>

                    <div className="row">
                        <div className="col-md-5 mb-3">
                            <label htmlFor="city">City</label>
                            <select className="custom-select d-block w-100" onChange={handleChange} id="city" required>
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="state">State</label>
                            <select className="custom-select d-block w-100" id="state" onChange={handleChange} required>
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="zip">Zip</label>
                            <input type="text" className="form-control" id="zip" onChange={handleChange} placeholder="6 DIGITS*" required/>    
                        </div>
                    </div>
                    <hr className="mb-4"/>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" onChange={handleChange} id="same-address"/>
                        <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" onChange={handleChange} id="save-info"/>
                        <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
                    </div>
                    <hr className="mb-4"/>

                    <h4 className="mb-3">Payment</h4>

                    <div className="d-block my-3">
                        <div className="custom-control custom-radio">
                            <input id="credit" name="paymentMethod" onChange={handleChange} type="radio" className="custom-control-input" checked required/>
                            <label className="custom-control-label" htmlFor="credit">Credit card</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input id="debit" name="paymentMethod" onChange={handleChange} type="radio" className="custom-control-input" required/>
                            <label className="custom-control-label" htmlFor="debit">Debit card</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input id="paypal" name="paymentMethod" onChange={handleChange} type="radio" className="custom-control-input" required/>
                            <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="cc-name">Name on card</label>
                            <input type="text" className="form-control" onChange={handleChange} id="cc-name" placeholder="" required/>
                            <small className="text-muted">Full name as displayed on card</small>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="cc-number">Credit card number</label>
                            <input type="text" className="form-control" onChange={handleChange} id="cc-number" placeholder="" required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="cc-expiration">Expiration</label>
                            <input type="text" className="form-control" onChange={handleChange} id="cc-expiration" placeholder="" required/>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="cc-expiration">CVV</label>
                            <input type="text" className="form-control" onChange={handleChange} id="cc-cvv" placeholder="" required/>
                        </div>
                    </div>
                    <hr className="mb-2"/>
                    <button className="btn btn-outline-dark btn-block mb-2" type="submit">Continue to checkout</button>
                </form>
  </div>
  <div className="tab-pane fade" id="pills-pickUp" role="tabpanel" aria-labelledby="pills-pickUp-tab">Create my form 😒</div>
</div>
      </div>
    </div>
    </div>
    </div>
  )
}
