import React from 'react'
import { Adminlayout } from '../Layout/Adminlayout'
import { ViewProduct } from '../AdminComponents/ViewProduct'

export const AdminViewProduct = () => {
  return (
    <>
    <Adminlayout>
        <ViewProduct/>
    </Adminlayout>
    </>
  )
}