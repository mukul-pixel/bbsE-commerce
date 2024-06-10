import React from 'react';

const Shimmer = ({ width, height }) => {
  const style = {
    width: width || '100%',
    height: height || '100%',
  };

  return (
    <div className="shimmer-wrapper" style={style}>
      <div className="shimmer-effect"></div>
    </div>
  );
};

export default Shimmer;
