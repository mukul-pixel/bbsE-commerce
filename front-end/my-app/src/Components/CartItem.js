import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { faIndianRupee, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_URL = 'https://bbse-commerce.onrender.com/cart';

export const CartItem = ({item, onPriceUpdate, onRemove, onUpdateQuantity}) => {
    const [cartProduct, setCartProduct] = useState(null);
    const quantity = item.quantity;
    const [isHidden, setIsHidden] = useState(false);
    const [newQuantity,setNewQuantity] = useState(quantity);

    useEffect(() => {
      async function fetchProductDetails(productId) {
        try {
          const response = await axios.get(`https://bbse-commerce.onrender.com/products/${productId}`);
          const productData = response.data;
          setCartProduct(productData);
          // Update the price once the product data is fetched
          onPriceUpdate(productId, productData.productPrice * item.quantity);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
  
      fetchProductDetails(item.productId);
    }, [item.productId, item.quantity, onPriceUpdate]);

    const handleQuantityChange = async (event) => {
      const newQuantity = parseInt(event.target.value);
      setNewQuantity(newQuantity);
      try {
          await axios.put(`${API_URL}/items/${item._id}`, { quantity: newQuantity });
          const priceDifference = cartProduct.productPrice * (newQuantity - quantity);
          onPriceUpdate(item._id, priceDifference);
          onUpdateQuantity(item._id, newQuantity); 
      } catch (error) {
          console.error('Error updating item quantity:', error);
      }
  };
  const handleRemove = async () => {
    try {
        setIsHidden(true);
        await axios.delete(`${API_URL}/items/${item._id}`);
        onRemove(item._id);
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
};
  
    if (!cartProduct) {
      return <p>Loading product details...</p>;
    }
    return (
      <>
      <div className={`row border my-2 mx-2 p-2 ${isHidden ? 'hidden' : ''}`}>
        <div className='col-md-4 col-4 my-auto'><img src={`https://bbse-commerce.onrender.com/Images/${cartProduct.images[0]}`} className="p-2 h-75 w-50" alt={cartProduct.productName} /></div>
        <div className="col-md-5 col-5">
          <h5 className="fw-bold">{cartProduct.productName}</h5>
          <p className='p-0 m-0'>{cartProduct.productDescription}</p>
          <p className='p-0 m-0' style={{fontSize:"smaller"}}><strong className='me-2'>Category:</strong>{cartProduct.productCategory}</p>
          <p className="p-0 m-0 d-flex" style={{fontSize:"smaller"}}><strong>Quantity:</strong><select value={newQuantity} onChange={handleQuantityChange} className="form-select form-select-sm w-auto d-inline mx-2">
            {[...Array(10).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select></p>
        </div>
        <div className='col-md-3 col-3'>
        <p className=""><FontAwesomeIcon className='fs-6 px-2' icon={faIndianRupee} /> {cartProduct.productPrice}</p>
        <button 
          className="btn btn-sm d-flex fw-bold my-5" 
          onClick={handleRemove}
          >
          <FontAwesomeIcon  className="mt-1 me-1" icon={faX} /> Remove
        </button>
        </div>
      </div>
      </>
    );
}
