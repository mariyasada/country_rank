"use client"
import { Button, Container } from '@radix-ui/themes'
import React from 'react'

const Error = ({error,reset}:{error:Error &{digest?:string}
reset:()=>void}) => {
  return (
    <Container className='h-screen py-10 flex items-center justify-center'>
      <h2 className='text-bg-500 text-3xl'>Something went wrong!</h2>
      <Button onClick={()=>window.location.reload()} className='bg-red-400 shadow-lg text-white text-base rounded-md w-20 py-2'></Button>
    </Container>
  )
}

export default Error