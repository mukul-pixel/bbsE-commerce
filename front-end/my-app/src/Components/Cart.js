import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { CartItem } from './CartItem';
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from 'react-router-dom';

export const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [prices, setPrices] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const [initialQuantities, setInitialQuantities] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`https://bbse-commerce.onrender.com/cart?userId=${userId}`);
        const cartData = response.data;
        setCart(cartData);

        const quantities = {};
        cartData.forEach(item => {
          quantities[item._id] = item.quantity;
        });
        setInitialQuantities(quantities);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    }
    fetchCart();
  }, []);

  useEffect(() => {
    async function fetchProductDetails() {
      const productIds = cart.map(item => item.productId);
      const requests = productIds.map(productId => axios.get(`https://bbse-commerce.onrender.com/products/${productId}`));
      try {
        const responses = await Promise.all(requests);
        const productDetails = responses.map(response => response.data);
        setProductDetails(productDetails);

        const newPrices = {};
        productDetails.forEach(product => {
          newPrices[product._id] = product.productPrice;
        });
        setPrices(newPrices);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
    if (cart.length > 0) {
      fetchProductDetails();
    }
  }, [cart]);

  const updateTotalPrice = useCallback(() => {
    const total = cart.reduce((sum, item) => {
      const itemPrice = prices[item.productId] || 0;
      return sum + itemPrice * item.quantity;
    }, 0);
    setTotalPrice(total);
  }, [cart, prices]);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter(item => item._id !== itemId);
    setCart(updatedCart);
  };

  const handlePriceUpdate = useCallback((productId, price) => {
    setPrices(prevPrices => ({
      ...prevPrices,
      [productId]: price
    }));
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return updatedCart;
    });
  };

  useEffect(() => {
    updateTotalPrice();
  }, [cart, prices, updateTotalPrice]);

  const handleCheckout = () => {
    navigate('/checkout', { state: {cart,productDetails} });
  };

  return (
    <>
    <div className="d-none">{initialQuantities}</div>
    <div className="text-center border-top border-bottom fs-2 p-1 fw-bold ">
          Cart
        </div>
  <div className="row">
    <div className="col-md-9">
      <div className="card border-0">
        <div className="card-body">
          <div className="row cart-items">
          {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <CartItem key={item._id} item={item} onPriceUpdate={handlePriceUpdate} onRemove={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} />
          ))}
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-3 my-4">
        <div className="card">
          <div className="card-header">
            Order Summary
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <p>Subtotal: <FontAwesomeIcon className='fs-6 px-2' icon={faIndianRupee} />{totalPrice.toFixed(2)}</p>
                <div className="row mb-2 ms-4 border p-2 rounded-3">
        <div className="col-6">
          <ol>
            {productDetails.map((product, index) => (
              <li key={index}>{product.productName}</li>
            ))}
          </ol>
        </div>
        <div className="col-6 text-end">
        <ul className='list-unstyled'>
  {cart.map((item, index) => {
    const productDetail = productDetails.find(product => product._id === item.productId);
    if (productDetail) {
      return (
        <li key={index}>
          {productDetail.productPrice} x {item.quantity} = {productDetail.productPrice * item.quantity}
        </li>
      );
    } else {
      return null; // Or render a placeholder if product details are not available
    }
  })}
</ul>
          <hr className='p-0 m-0'/>
          <p>{totalPrice}</p>
        </div>
      </div>
              </div>
              <div className="col-12">
                <p>Discount: <FontAwesomeIcon className='fs-6 px-2' icon={faIndianRupee} />0.00</p>
              </div>
              <div className="col-12">
                <p>Shipping Charges: <FontAwesomeIcon className='fs-6 px-2' icon={faIndianRupee} />0.00</p>
              </div>
              <div className="col-12">
                <h5>Total: <FontAwesomeIcon className='fs-6 px-2' icon={faIndianRupee} />{totalPrice.toFixed(2)}</h5>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-success btn-checkout w-100" onClick={handleCheckout}>Checkout</button>
            <Link to="/" className="btn btn-secondary w-100 mt-2">Continue Shopping</Link>
          </div>
        </div>
      </div>
  </div>
</>
  )
}
