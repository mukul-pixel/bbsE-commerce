import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faMinus, faStar, faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductInfo = () => {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [pincode, setPincode] = useState('');
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAvailability = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = response.data;
      setLoading(false);
      if (data[0].Status === 'Success') {
        setAvailability('Available');
      } else {
        setAvailability('Not Available');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching availability:', error);
      setAvailability('Error');
    }
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/productinfo/${productId}`);
        if (response.data.status === "ok") {
          setProduct(response.data.data);
        } else {
          console.error("Error fetching product data:", response.data.message);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [productId]);  
  
  const [imageUrl, setImageUrl] = useState("");
  const [isHovered, setIsHovered] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [count,setCount] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);
    const [reviewMessage,setReviewMessage] = useState("");
    const [reviewHeading,setReviewHeading] = useState("");
    const [reviews, setReviews] = useState([]);
    const [userInfoMap, setUserInfoMap] = useState(new Map());

    const addToCart = async (productId, userId) => {
      try {
        console.log(productId);
        // Send POST request to add product to cart
        const response = await axios.post('http://localhost:5000/addToCart', { productId, userId });
        console.log('Product added to cart:', response.data);
        // Handle success or update UI accordingly
      } catch (error) {
        console.error('Error adding product to cart:', error);
        // Handle error or show error message to the user
      }
    };
  
    // Fetch user information for each review's user ID
    useEffect((userInfoMap) => {
       // Function to fetch user information by ID
    const userInformation = async (userId) => {
      try {
        if (!userInfoMap.has(userId)) {
          const response = await axios.get(`http://localhost:5000/userInfo/${userId}`);
          const userData = response.data;
          setUserInfoMap(prevMap => new Map(prevMap.set(userId, userData)));
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

      reviews.forEach(review => {
        userInformation(review.userId);
      });
    }, [reviews]);
  

    //to handle star rating by storing number of stars
  const handleStarClick = (starCount) => {
    setSelectedStars(starCount);
  };

  //to handle all the data of the review
  const handleReview = async ()=>{
    try {
      const userId = localStorage.getItem('userId');
      const postData = {
        userId,
        productId: product._id,
        productName: product.productName,
        selectedStars,
        reviewHeading,
        reviewMessage,
      };

      const response = await axios.post('http://localhost:5000/addReview', postData);
      console.log('Response from backend:', response.data);

      toggleModal();
      toast.success("Your Review have been submitted successfully !!");
    } catch (error) {
      console.error('Error:', error);
      toggleModal();
    }
  }

  //to get of all the reviews of this product
  useEffect(() => {

    if (!product || !product._id) {
      // Product or product._id is not available, do nothing
      return;
    }
  
    const productId = product._id;
    
    const getReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews?productId=${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
  
    getReviews();
  }, [product]);

  //for write a review section-> open and close
  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

    //to decrement the quantity count
    const handleDecrement = () => {
      if (count > 1) {
        setCount(prevCount => prevCount - 1);
      }
    };

    // to increment the quantity count
    const handleIncrement = () => {
      setCount(prevCount => prevCount + 1);
    };
    
    // Function to handle mouse move event for image zoom
    const handleMouseMove = (e) => {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.pageX - left) / width;
      const y = (e.pageY - top) / height;
      setZoomPosition({ x, y });
    };
    
    // Function to handle image change
    const handleImageChange = (newImageUrl) => {
      setImageUrl(newImageUrl);
    };
  return (
    <>
    <ToastContainer />
     <div className="container p-md-5 px-3">
      {product ? (
        <div className="row">
          <div className="col-md-6">
          <div id='productImgs' className="row">
              <div className="col-md-2 col-2 me-md-0 me-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/Images/${image}`}
                    alt={`Product pic ${index + 1}`}
                    className="img-fluid py-2"
                    onClick={() => handleImageChange(image)}
                    onMouseOver={() => handleImageChange(image)}
                    style={{aspectRatio:"1/1"}}
                  />
                ))}
              </div>
              <div
                className="col-md-10 col-10 ps-md-5 ps-0 h-75 w-75 me-2 image-container"
                onMouseMove={handleMouseMove}
              >
                <img
                    id='productImg'
                    src={imageUrl?`http://localhost:5000/Images/${imageUrl}`:`http://localhost:5000/Images/${product.images[0]}`}
                    alt="Zoomable pic"
                    className={isHovered ? 'zoomed' : ''}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,aspectRatio:"1/1"}}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 py-md-0 py-5 ">
            <div className="col-md-12">
              <h1>{product.productName}</h1>
            </div>
            <div className="col-md-12">
              <span className="label label-primary">Vintage</span>
              <span
                className="monospaced"
                style={{ fontFamily: "Ubuntu Mono" }}
              >
                No. {product._id}
              </span>
            </div>
            <div className="col-md-12">
              <p className="description">
                {product.productDescription}
              </p>
            </div>
            <div className="row">
              <div className="col-md-3 col-6">
                <span className="visually-hidden">Four out of Five Stars</span>
                {[1, 2, 3, 4].map((index) => (
                  <FontAwesomeIcon key={index} icon={faStar} />
                ))}
                <span className="badge bg-success">61</span>
              </div>
              <div className="col-md-3 col-6">
                <span
                  className="monospaced"
                  style={{ fontFamily: "Ubuntu Mono", cursor:"pointer" }}
                  onClick={toggleModal}
                  
                >
                  Write a Review
                </span>
                {isModalOpen && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Write a Review</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <div class="modal-body">
              <div className="mb-3">
          <label htmlFor="star-rating" className="col-form-label">Rate:</label>
          <div id="star-rating">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => handleStarClick(index + 1)}
                style={{ cursor: 'pointer' }}
              >
                {index < selectedStars ? (
                  <FontAwesomeIcon icon={solidStar} className='p-1' style={{ color: 'yellow' }} />
                ) : (
                  <FontAwesomeIcon className='p-1' icon={regularStar} />
                )}
              </span>
            ))}
          </div>
          </div>
                <form>
                  <div class="mb-3">
                    <label for="heading-name" class="col-form-label">Heading:</label>
                    <input type="text" class="form-control" id="heading-name" onChange={(e) => setReviewHeading(e.target.value)}/>
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label">Message:</label>
                    <textarea class="form-control" id="message-text" onChange={(e) => setReviewMessage(e.target.value)}></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-dark" onClick={handleReview}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
              </div>
            </div>
            <div className="col-md-12 bottom-rule">
              <h2 className="product-price fs-3">
                <FontAwesomeIcon className='fs-4 px-2' icon={faIndianRupee} />
                {product.productPrice}
              </h2>
            </div>
          <div className="row">
            <div className="col-md-12 border-bottom my-3"></div>
          </div>
          <div className="row add-to-cart">
            <div className="col-md-5 col-5 product-qty d-flex mx-md-auto">
              <button className="btn btn-outline-secondary btn-lg btn-qty m-1" onClick={handleDecrement} disabled={count === 1 ? true : false}>
              <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                className="form-control form-control-lg btn-qty m-1 text-center"
                type="text"
                value={count}
              />
              <button className="btn btn-outline-secondary btn-lg btn-qty m-1" onClick={handleIncrement}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className="col-md-5 col-4 px-md-2 py-md-2 px-3 mx-auto py-2 ">
            <button
        className="btn btn-sm btn-md btn-lg btn-primary btn-block px-auto px-md-5 py-md-2"
        onClick={() => addToCart(productId,localStorage.getItem('userId'))}
      >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="row mx-auto ps-5">
            <div className="col-md-4 col-4 text-center">
              <span
                className="monospaced mx-auto pe-md-5"
                style={{ fontFamily: "Ubuntu Mono" }}
              >
                In Stock
              </span>
            </div>
            <div className="col-md-5 col-7 mx-md-auto mx-auto offset-2 text-center">
              <a
                className="monospaced text-decoration-none mx-auto"
                style={{ fontFamily: "Ubuntu Mono" }}
                href="/"
              >
                Add to Shopping List
              </a>
            </div>
          </div>
          <div className="container p-2">
      <div className="row d-flex p-3 mx-auto">
        <input
          className="col-md-4 me-2 rounded-2 mb-md-0 mb-2 p-1"
          placeholder="Enter pincode"
          type="number"
          minLength={6}
          maxLength={6}
          value={pincode}
          onChange={e => setPincode(e.target.value)}
        />
        <button className="col-md-2 btn btn-success rounded-2" onClick={checkAvailability}>
          {loading ? 'Checking...' : 'CHECK'}
        </button>
        <strong>{availability}</strong>
      </div>
    </div>
          <div className="row">
            <div className="col-md-12 border-bottom mt-3"></div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-3">
              <p>
                To order by mobile, {" "}
                <a className="text-decoration-none" href="tel:7727097954">
                  please call +91 7727097954
                </a>
              </p>
            </div>
          </div>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="description-tab"
                data-bs-toggle="tab"
                href="#description"
                role="tab"
                aria-controls="description"
                aria-selected="true"
              >
                Description
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="features-tab"
                data-bs-toggle="tab"
                href="#features"
                role="tab"
                aria-controls="features"
                aria-selected="false"
              >
                Features
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="reviews-tab"
                data-bs-toggle="tab"
                href="#reviews"
                role="tab"
                aria-controls="reviews"
                aria-selected="false"
              >
                Reviews
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="description">
              <p className="top-10 p-4" style={{ fontFamily: "sans-serif"}} >
                {product.productDescription}
              </p>
            </div>
            <div role="tabpanel" className="tab-pane top-10" id="features">
              ...
            </div>
            <div role="tabpanel" className="tab-pane" id="reviews">
            {/* <span className="visually-hidden">
            {review.selectedStars} out of Five Stars
          </span>
          {[...Array(review.selectedStars)].map((_, starIndex) => (
            <FontAwesomeIcon key={starIndex} icon={faStar} />
          ))}
          <span className="badge bg-success">{review.selectedStars}</span> */}
            <div className="row">
      {reviews.map((review, index) => (
        <div key={index} className="col-md-12">
          <div className="card mt-3">
            <div className="card-header">
              {userInfoMap.has(review.userId) && (
                <div className='row'>
                  <img className='col-md-1 col-2' style={{borderRadius:"50%",height:"30px",width:"55px"}} src={userInfoMap.get(review.userId).imageSrc} alt={userInfoMap.get(review.userId).name} />
                  <span className='col-5'>{userInfoMap.get(review.userId).name}</span>
                  <span className="visually-hidden">
                  {review.selectedStars} out of Five Stars
                  </span>
                  <span className='col-5'>
                  {[...Array(review.selectedStars)].map((_, starIndex) => (
            <FontAwesomeIcon key={starIndex} icon={faStar} />
          ))}
                  </span>
                </div>
              )}
            </div>
            <div className="card-body">
              <p className="card-text">{review.reviewMessage}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
            </div>
          </div>
        </div>
      </div>
):(<div>Nothinng to show</div>)}
    </div>
  </>
  )
}
