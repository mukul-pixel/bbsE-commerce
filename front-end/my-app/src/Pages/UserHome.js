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
    </Userlayout>
    </>
  )
}
