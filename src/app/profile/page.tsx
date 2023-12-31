"use client"
import { Box ,Container,Text,Button} from '@radix-ui/themes';
import React from 'react'
import { AuthContextType, useAuth,User } from '../context/AuthContext';

const Page = () => {
  const {user,logout}=useAuth() as AuthContextType;
  const atIndex =user && user?.email?.indexOf('@');
  const username = user && atIndex !== -1 ? user?.email?.slice(0, atIndex) : user?.email;
  console.log(username)
  return (
    <Container className='h-screen flex items-center justify-center py-10'>
    <Box className='text-slate-600 text-2xl capitalize flex flex-col gap-5' >
      <Text >Hello,{username && username}</Text>
       <Text>Are you sure you want to logout?</Text>
       <Button onClick={logout} className='bg-slate-500 shadow-lg text-white text-base rounded-md w-20 py-2'>Logout</Button>
       </Box>
    </Container>
  )
}

export default Page