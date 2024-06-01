import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Products = () => {
    const [products,setProducts] = useState(null);
    const [filters, setFilters] = useState([]);
    const [sortOrder, setSortOrder] = useState(null);

    useEffect(()=>{
        getImage();
      },[])

    const getImage = async ()=>{
        try{
        const response = await axios.get("http://localhost:5000/getProduct");
        if (response.data.status === "ok") {
          // Extract product data from the response
          const products = response.data.data;
          setProducts(products);
      } else {
          // Handle error if response status is not "ok"
          console.error("Error fetching product data:", response.data.message);
      }
      }catch (error) {
          // Handle errors if the request fails
          console.error('Error fetching product data:', error);
        }
      }
      const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setFilters((prevFilters) => {
          if (checked) {
            return [...prevFilters, id];
          } else {
            return prevFilters.filter((filter) => filter !== id);
          }
        });
      };
    
      const handleSortChange = (order) => {
        setSortOrder(order);
      };
    
      const clearFilters = () => {
        setFilters([]);
    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
      };
    
      const getFilteredProducts = () => {
        if (!products) return [];
    
        return products.filter((product) => {
          if (filters.length === 0) {
            return true; // No filters applied, show all products
          }
          return filters.includes(product.productCategory); // Assuming each product has a 'category' field
        });
      };
    
      const getSortedProducts = (filteredProducts) => {
        if (!sortOrder) return filteredProducts; // No sorting applied, return filtered products
    
        return filteredProducts.slice().sort((a, b) => {
          if (sortOrder === 'highToLow') {
            return b.productPrice - a.productPrice;
          } else if (sortOrder === 'lowToHigh') {
            return a.productPrice - b.productPrice;
          }
          return 0;
        });
      };
    
      const filteredProducts = getFilteredProducts();
      const sortedProducts = getSortedProducts(filteredProducts);
    
      // console.log(products)
  return (
    <>
    <div className='row border'>
  <div className='col-3d-block row my-3 mx-0'>
  <div className='filterBar col-6 text-start ps-4'>
  <button className="btn btn-primary w-auto h-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft">Filter</button>
<div className="offcanvas offcanvas-start w-md-25 w-sm-50" tabIndex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasLeftLabel">Apply Filter</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body py-0">
  <ul className="mynav nav nav-pills flex-column mb-auto mx-3">
  <li className="nav-item mb-2 px-2">
          <details>
            <summary className="mb-1">Category</summary>
            <ul className="mb-2 list-unstyled ps-4 fs-6">
              {['thread', 'button', 'canvas', 'roll', 'broch', 'lace', 'collar', 'chain', 'needle'].map((category) => (
                <li key={category}>
                  <input type="checkbox" id={category} onChange={handleCheckboxChange} />
                  <label htmlFor={category} className="text-dark ps-1">{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                </li>
              ))}
            </ul>
          </details>
        </li>
      <li className="nav-item mb-2 px-2">
        <details>
          <summary className="mb-1">Material</summary>
          <ul className="mb-2 list-unstyled ps-4 fs-6">
          <li>
    <input type="checkbox" id="product" />
    <label htmlFor="product" className="text-dark">Cotton</label>
  </li>
  <li>
    <input type="checkbox" id="product" />
    <label htmlFor="product" className="text-dark">Polyster</label>
  </li>
          </ul>
        </details>
      </li>
    </ul>
    <div className='row mx-2'>
      <span className='btn btn-outline-success col-12' onClick={clearFilters}>remove</span>
    </div>
  </div>
</div>
</div>
    <div className='col-6 text-end'>
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Sort By
  </button>
  <ul className="dropdown-menu">
        <li><button className="dropdown-item" onClick={() => handleSortChange('highToLow')}>Price - high to low</button></li>
        <li><button className="dropdown-item" onClick={() => handleSortChange('lowToHigh')}>Price - low to high</button></li>
      </ul>
</div>
    </div>
    <hr className='my-3'/>
  </div>
  <div>
    <div className='row p-md-4 p-0'>
    {sortedProducts.length === 0 ? (
        <div>Nothing to show</div>
      ) : (
        sortedProducts.map((data, index) => (
          <div key={index+1} className="card col-md-2 col-6 px-0 mx-md-4 my-md-2 my-3" style={{aspectRatio:"1/1"}}>
            {data.images.length > 0 && (
              <img src={`http://localhost:5000/Images/${data.images[0]}`} className="card-img-top" style={{aspectRatio:"1/1"}} alt="Product" />
            )}
            <div className="card-body">
              <span>{data.productPrice}</span>
              <h5 className="card-title">{data.productName}</h5>
              <p className="card-text">{data.productDescription}</p>
              <Link to={`/productinfo/${data._id}`} className="btn btn-primary">View Product Info</Link>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</div>

    </>
  )
}
