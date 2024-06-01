import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const ViewProduct = () => {
    const [products,setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(()=>{
    const getProducts = async ()=>{
      try{
      const response = await axios.get("http://localhost:5000/getProduct");
      if (response.data.status === "ok") {
        // Extract product data from the response
        const products = response.data.data;
        setProducts(products);
        setFilteredProducts(products);
    } else {
        // Handle error if response status is not "ok"
        console.error("Error fetching product data:", response.data.message);
    }
    }catch (error) {
        // Handle errors if the request fails
        console.error('Error fetching product data:', error);
      }
    }
    getProducts();
  },[])
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterUsers(e.target.value);
  };

  const filterUsers = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(products);
      return;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = products.filter(product =>
      (product.productName && product.productName.toLowerCase().includes(lowercasedTerm)) ||
      (product.productCategory && product.productCategory.toLowerCase().includes(lowercasedTerm)) ||
      (product.productQuantity && product.productQuantity.toString().includes(lowercasedTerm)) ||
      (product.productPrice && product.productPrice.toString().includes(lowercasedTerm)) ||
      (product.productDescription && product.productDescription.toLowerCase().includes(lowercasedTerm))
    );

    setFilteredProducts(filtered.length > 0 ? filtered : null);
  };

const handleProductClick = (product) => {
  setSelectedProduct(product);
};

const closeModal = () => {
  setSelectedProduct(null);
};
const handleChange = (e) => {
  const { name, value } = e.target;
  setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
  }));
};

const handleSubmit = () => {
  axios.put(`http://localhost:5000/edit/${selectedProduct._id}`, selectedProduct)
      .then(response => {
          alert('Product updated successfully',response);
      })
      .catch(error => {
          console.error('Error updating product', error);
          alert('Error updating product');
      });
};
  return (
    <>
    <div className='bg-black p-3 text-center text-white fs-3'>VIEW PRODUCT</div>
    <div className='searchProduct justify-content-center d-flex py-5 my-5'>
    <input
          className='form-control w-50 mx-2'
          placeholder='search product'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className='btn btn-outline-dark' onClick={() => filteredProducts(searchTerm)}>Search</button>
    </div>
    <div className="table-responsive px-3">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>S.no</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Material</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts ? (
            
            filteredProducts.map((product, index) => (
                <tr key={product._id} onClick={() => handleProductClick(product)}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productDescription}</td>
                  <td>{product.productCategory}</td>
                  <td>{product.productQuantity}</td>
                  <td>{product.productMaterial}</td>
                </tr>
          ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No products found</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
    {selectedProduct && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={(e) => handleSubmit(e, selectedProduct._id)}>
              <div className="modal-body">
                <p><img src={`http://localhost:5000/Images/${selectedProduct.images[0]}`} alt='productImg' style={{borderRadius:"50%", height:"110px", width:"110px"}}/></p>
                <div>
                        <label>Product Name</label>
                        <input
                                type="text"
                                name="productName"
                                value={selectedProduct.productName}
                                onChange={handleChange}
                                className='form-control'
                            />
                    </div>
                    <div>
                        <label>Product Description</label>
                        <textarea name="productDescription" value={selectedProduct.productDescription} className='form-control' onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Product Price</label>
                        <input name="productPrice" type="number" value={selectedProduct.productPrice} className='form-control' onChange={handleChange} />
                    </div>
                    <div>
                        <label>Product Category</label>
                        <input name="productCategory" type="text" value={selectedProduct.productCategory} className='form-control' onChange={handleChange} />
                    </div>
                    <div>
                        <label>Product Quantity</label>
                        <input name="productQuantity" type="number" value={selectedProduct.productQuantity} className='form-control' onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Product Material</label>
                        <input name="productMaterial" type="text" value={selectedProduct.productMaterial} className='form-control' onChange={handleChange} />
                    </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
