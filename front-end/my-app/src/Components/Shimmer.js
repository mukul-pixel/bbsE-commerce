import React from 'react';

const Shimmer = () => {
  return (
    <div className="shimmer-card row col-md-2 col-6 px-0 mx-md-4 ms-1 my-md-2 my-3">
      <div className='col-6 p-1'>
      <div className="shimmer-product-top">
        <div className="shimmer-product-profile"></div>
        <div className="shimmer-profile-carousel"></div>
      </div>
      <div className="shimmer-card-body">
        <div className="shimmer-price"></div>
        <div className="shimmer-title"></div>
        <div className="shimmer-button"></div>
      </div>
      </div>
    </div>
  );
};

export default Shimmer;
