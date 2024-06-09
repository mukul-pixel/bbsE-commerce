import React from 'react'
import { NavLink } from 'react-router-dom'

export const Categories = () => {
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
                                    <h3 className="cattitle"><span>EMBELLISHMENTS</span></h3>
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
    </>
  )
}
