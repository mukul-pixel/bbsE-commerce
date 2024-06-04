import React from 'react'
import { AdminNavbar } from '../Components/AdminNavbar'
import { AdminFooter } from '../Components/AdminFooter'

export const Adminlayout = ({children}) => {
  return (
    <>
    <AdminNavbar children={children}/>
    <AdminFooter/>
    </>
  )
}
