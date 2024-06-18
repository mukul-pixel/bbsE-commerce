import React, { useState } from "react";
import axios from "axios";

export const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productMaterial, setProductMaterial] = useState("");
  const [productFeatures, setProductFeatures] = useState(["", "", "", ""]); // Initialize an array of 4 features

  const [selectedImages, setSelectedImages] = useState(Array(4).fill(null));
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedImages = [...selectedImages];
        updatedImages[index] = e.target.result;
        setSelectedImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "product-name") {
      setProductName(value);
    } else if (name === "product-description") {
      setProductDescription(value);
    } else if (name === "product-price") {
      setProductPrice(value);
    } else if (name === "product-category") {
      setProductCategory(value);
    } else if (name === "product-subcategory") {
      setProductSubCategory(value);
    } else if (name === "product-quantity") {
      setProductQuantity(value);
    } else if (name === "product-material") {
      setProductMaterial(value);
    }
  };

  const handleFeatureChange = (event, index) => {
    const updatedFeatures = [...productFeatures];
    updatedFeatures[index] = event.target.value;
    setProductFeatures(updatedFeatures);
    console.log(updatedFeatures)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    // Append each selected file to the FormData object
    selectedImages.forEach((image, index) => {
      if (image) {
        const file = e.target.querySelector(`#imageInput${index + 1}`).files[0];
        if (file) {
          formData.append("images", file);
        }
      }
    });

    // Append other form data
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productSubCategory", productSubCategory);
    formData.append("productQuantity", productQuantity);
    formData.append("productMaterial", productMaterial);

    // Append product features
    productFeatures.forEach((feature, index) => {
      formData.append(`productFeatures[${index}]`, feature);
    });
    console.log(formData);
    try {
      const response = await axios.post("https://bbse-commerce.onrender.com/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Product added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-black p-3 text-center text-white fs-3">ADD A PRODUCT</div>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-4 col-12 probox">
          {selectedImages.map((image, index) => (
            <label key={index} htmlFor={`imageInput${index + 1}`} className="select-image-box m-2 col-md-5 col-5 border">
              {image ? (
                <img src={image} alt={`Selected ${index + 1}`} className="h-100 w-100" style={{ aspectRatio: "1/1" }} />
              ) : (
                <div className="p-5 text-center">
                  <span>ADD {index + 1}</span>
                </div>
              )}
              <input
                className="p-3 d-none"
                id={`imageInput${index + 1}`}
                type="file"
                name="images"
                accept="image/*"
                onChange={(e) => handleImageSelect(e, index)}
              />
            </label>
          ))}
        </div>

        <div className="col-md-6 pe-md-5">
          <div className="p-3">
            <label htmlFor="product-name">Product Name</label>
            <input
              id="product-name"
              name="product-name"
              className="form-control"
              type="text"
              value={productName}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-3">
            <label htmlFor="product-description">Product Description</label>
            <textarea
              id="product-description"
              name="product-description"
              className="form-control mb-2"
              type="text"
              value={productDescription}
              onChange={handleInputChange}
            />
            Features
            {productFeatures.map((feature, index) => (
              <div key={index} className="p-3">
                <label htmlFor={`product-feature-${index}`}>Product Feature {index + 1}</label>
                <input
                  id={`product-feature-${index}`}
                  name={`product-feature-${index}`}
                  className="form-control"
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(e, index)}
                />
              </div>
            ))}
          </div>
          <div className="p-3">
            <label htmlFor="product-price">Product Price</label>
            <input
              id="product-price"
              name="product-price"
              className="form-control"
              type="number"
              value={productPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-3">
            <label htmlFor="product-category">Product Category</label>
            <select
              id="product-category"
              name="product-category"
              className="ms-5"
              value={productCategory}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              <option value="thread">Thread</option>
              <option value="embellishments">Embellishments</option>
              <option value="tools&accessories">Tools & Accessories</option>
              <option value="button">Button</option>
            </select>
          </div>
          <div className="p-3">
            <label htmlFor="product-subcategory">Product Sub-Category</label>
            <input
              id="product-subcategory"
              name="product-subcategory"
              className="form-control"
              type="text"
              value={productSubCategory}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-3">
            <label htmlFor="product-material">Product Material</label>
            <input
              id="product-material"
              name="product-material"
              className="form-control"
              type="text"
              value={productMaterial}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-3">
            <label htmlFor="product-quantity">Product Quantity</label>
            <input
              id="product-quantity"
              name="product-quantity"
              className="form-control"
              type="number"
              value={productQuantity}
              onChange={handleInputChange}
            />
          </div>

          <div className="p-3">
          <button className="btn btn-outline-dark px-4" type="submit">
              {loading ? "Submitting..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
