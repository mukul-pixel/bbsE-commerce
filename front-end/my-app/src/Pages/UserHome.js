import React from 'react'
import { Userlayout } from '../Layout/Userlayout'
import { Mycarousel } from '../Components/Mycarousel'
import { Categories } from '../Components/Categories'

export const UserHome = () => {
  return (
    <>
    <Userlayout>
        <Mycarousel/>
        <Categories/>
        <div className="subscibe_section  wow fadeInUp">
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
                            <div className="subform"><button className="ml-onclick-form theme-btn" onclick="ml('show', 'i7nKAV', true)">Click here to show form</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Userlayout>
    </>
  )
}
