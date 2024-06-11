import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Categories = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
      };
  return (
    <>
    <section id="homecat" className="homecat_wrapper">
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <div className="catbox hovereffect">
                        <NavLink to="/products?category=thread">
                            <figure><img className="lazy" src="https://images.unsplash.com/photo-1583758638276-95fff693eecf?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="THREADS"/></figure>
                            <div className="cathover">
                                <div className="cathinner">
                                    <h3 className="cattitle"><span>THREADS</span></h3>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="catbox hovereffect">
                        <NavLink to="/products?category=button">
                            <figure><img className="lazy" src="https://images.unsplash.com/photo-1674977126774-eee3300633ca?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="BUTTONS"/></figure>
                            <div className="cathover">
                                <div className="cathinner">
                                    <h3 className="cattitle"><span>BUTTONS</span></h3>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="catbox hovereffect">
                        <NavLink to="/products?category=embellishment">
                            <figure><img className="lazy" src="https://5.imimg.com/data5/JE/MW/FZ/SELLER-50943321/sanskriti-indian-embroidered-dress-sewing-border-1-1000x1000.jpg" alt="EMBELLISHMENTS"/></figure>
                            <div className="cathover">
                                <div className="cathinner">
                                    <h3 className="cattitle"><span>EMBELLISHMENT</span></h3>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="catbox hovereffect">
                        <NavLink to="/products?category=tools&accessories">
                            <figure><img className="lazy" src="https://images.unsplash.com/photo-1628565663674-de1c8161d72c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHRhaWxvciUyMGVtYmVsbGlzaG1lbnRzfGVufDB8fDB8fHww" alt="TOOLS &amp; ACCESSORIES"/></figure>
                            <div className="cathover">
                                <div className="cathinner">
                                    <h3 className="cattitle"><span>TOOLS &amp; ACCESSORIES</span></h3>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div className="subscibe_section wow fadeInUp">
        <div className="container">
            <div className="fsubouter">
                <div className="foot_subscribe clearfix">
                    <div className="foot_subleft">
                        <div className="sflinner">
                            <h3 className="subscribe_head">OUR NEWSLETTER</h3>
                            <p>Get the latest updates on new products and upcoming sales</p>
                        </div>
                    </div>
                    <div className="subright">
                    <div className="subr_inner">
      <div className="subform">
        <button className="ml-onclick-form theme-btn" onClick={toggleModal}>Click here to show form</button>
      </div>

      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content">
          <div className='text-end'>
          <button type="button" className="btn-close bg-light m-2" onClick={toggleModal}></button>
          </div>
            <div className="modal-body text-white text-center">
            <span className='fs-3'>Craft your perfect look with precision.</span>
            <br/>
            <span className='fs-5'>Subscribe now to unlock insider access to our latest arrivals and exclusive offers.</span>

              <form className='p-3'>
                <div className="mb-3">
                  <input type="name" className="form-control mb-1" id="name-input" placeholder="Name"/>
                  <input type="email" className="form-control" id="email-input" placeholder="Mail"/>
                </div>
              </form>
              <span className='fs-5'>Seize the opportunity – subscribe today and elevate your stitching game!</span>
            </div>
              <div className='p-4'>
              <button type="button" className="btn btn-light form-control">Submit</button>
              </div>
          </div>
        </div>
      </div>
      
      )}
    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
