import React from 'react'
import { Adminlayout } from '../Layout/Adminlayout'
import { ViewProduct } from '../Components/ViewProduct'

export const AdminViewProduct = () => {
  return (
    <>
    <Adminlayout>
        <ViewProduct/>
    </Adminlayout>
    </>
  )
}