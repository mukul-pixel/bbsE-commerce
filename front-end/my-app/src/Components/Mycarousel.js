import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
// import logoImage from '../../src/images/image2.jpeg';
import myVideo from '../../src/images/Black White Minimalist Logo.mp4';
import logoImage1 from '../../src/images/R.jpeg';

function VideoSlide({ src, alt }) {
    return (
      <div className="carousel-video-slide">
        <video autoPlay loop muted className="d-block w-100">
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Carousel.Caption>
          <p>{alt}</p>
        </Carousel.Caption>
      </div>
    );
  }

export const Mycarousel = () => {
  return (
    <>
    <Carousel className='h-100' style={{ height: '75vh' }}>
      <Carousel.Item>
        <div id='carousel' style={{height: '75vh' , overflow: 'hidden'}}>
        <VideoSlide src={myVideo} />
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div id='carousel' style={{ maxHeight: '75vh' }}>
        <img
          className="w-100"
          src="https://plus.unsplash.com/premium_photo-1676586310000-7853f88a29cd?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="First slide"
          style={{maxHeight: '75vh' }}
        />
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div id='carousel' style={{ maxHeight: '75vh' }}>
        <img
          className="w-100"
          src={logoImage1}
          alt="Third slide"
          style={{maxHeight: '75vh' }}
        />
        </div>
      </Carousel.Item>
    </Carousel>
    <div className='text-center d-lg-flex d-none justify-content-center'>
      <a href="#homecat" className="goto scrollto"><span></span></a>
    </div>
    </>
  )
}
