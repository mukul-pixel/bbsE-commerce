import React from 'react'
import { AdminNavbar } from '../AdminComponents/AdminNavbar'
import { AdminFooter } from '../AdminComponents/AdminFooter'

export const Adminlayout = ({children}) => {
  return (
    <>
    <AdminNavbar children={children}/>
    <AdminFooter/>
    </>
  )
}
