import React from 'react'
import { Navbars } from '../Components/Navbars'
import { Footer } from '../Components/Footer'

export const Userlayout = ({children}) => {
  return (
    <>
    <Navbars/>
    {children}
    <Footer/>
    </>
  )
}
