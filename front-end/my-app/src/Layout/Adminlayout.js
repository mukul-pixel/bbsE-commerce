import React from 'react'
import { AdminNavbar } from '../Components/AdminNavbar'

export const Adminlayout = ({children}) => {
  return (
    <>
    <AdminNavbar children={children}/>
    </>
  )
}
