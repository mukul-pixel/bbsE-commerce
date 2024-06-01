import React from 'react'
import { useEffect } from 'react';

export const About = () => {
    useEffect(() => {
        const counts = document.querySelectorAll('.count');
        const speed = 500;
    
        counts.forEach(counter => {
          function update() {
            const target = Number(counter.getAttribute('data-target'));
            let count = Number(counter.innerText);
            const inc = target / speed;
            
            if (count < target) {
              count = Math.floor(inc + count);
              counter.innerText = count;
              setTimeout(update, 15);
            } else {
              counter.innerText = target;
            }
          }
    
          update();
        });
      }, []);
  return (
    <>
    <section className="about vh-100 w-100 d-flex flex-column text-align-center align-items-center">
	<div className="container">
		<div className="story row position-relative">
			<div className="col-md-5">
				<span className="text-muted">Our Story</span>
				<h2 className="display-5 fw-bold">About Us</h2>
			</div>
			<div className="col-md-6 offset-md-1">
				<p className="lead">Since its inception in 2008, our shop has been dedicated to fulfilling every customer's need with unwavering commitment. Over the years, we have strived to provide exemplary service, ensuring satisfaction and trust in every interaction.</p>
				<p className="lead">With over 15 years of experience, our journey has been marked by continuous growth and adaptation to evolving market demands. Looking ahead, we are committed to leveraging our expertise to innovate, ensuring unparalleled service and satisfaction for years to come.</p>
			</div>
		</div>
        <div className='row position-relative top-50'>
            <div className='counter col-md-4 d-flex flex-column text-align-center align-items-center'>
                <span><span className='fw-bold fs-1'>1</span>Lakh+</span>
                <span className='lead'>No. Of Products</span>
            </div>
            <div className='counter col-md-4 d-flex flex-column text-align-center align-items-center'>
                <span><span className='fw-bold fs-1'>15</span>+</span>
                <span className='lead'>Years Of Experience</span>
            </div>
            <div className='counter col-md-4 d-flex flex-column text-align-center align-items-center'>
                <span><span className='count fw-bold fs-1' data-target='10000'>1</span>+</span>
                <span className='lead'>Happy Clients</span>
            </div>
        </div>
	</div>
</section>
    </>
  )
}
