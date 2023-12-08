"use client"
import React, { useEffect, useState } from 'react'
import {Container,Box,Text} from "@radix-ui/themes"
import { usePathname } from 'next/navigation';
import { countryProps } from '../constants/type';

const page = () => {
    const [country,setCountry]=useState<countryProps>();
    let pathname=usePathname();
    pathname=pathname.slice(1);
    console.log(pathname)
    
    useEffect(()=>{
        (async()=>{
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${pathname}`);           
            const singleCountry = await res.json();
            setCountry(singleCountry[0])
            })();
    },[])
    console.log(country,"country")
  return (
  <Container className='py-28  bg-slate-100 h-screen'>
    <Box className=' flex flex-row justify-center gap-7 w-full'>
    {/* left side div */}
    <Box className='flex flex-col gap-3 bg-white rounded-md shadow-lg p-4' >
    <Box className='' ><img src={country?.flags.png} alt="flag of country" className='h-40 w-80 object-contain'/></Box>
    <Box className='flex flex-col w-full items-center'>
        <Text className='text-2xl text-blue-500'>Afghanistan</Text>
        <Text className='text-base text-slate-400'>Asia</Text>
    </Box>
    <Box className='flex flex-row w-full items-center'>
    <Box className='flex flex-col w-full items-center'>
        <Text className='text-xl text-blue-500'>0000</Text>
        <Text className='text-base text-slate-300 font-semibold'>Asia</Text>
    </Box>
    <Box className='flex flex-col w-full items-center'>
        <Text className='text-xl text-blue-500'>A15000</Text>
        <Text className='text-base text-slate-300 font-semibold'>Asia</Text>
    </Box>
    </Box>
    </Box>
    {/* right side div */}
    <Box className='bg-white shadow-lg rounded-md p-8'>
        <Text>Details</Text>
        <Box>
        <Text>Details</Text>
        <Text>Details</Text>
        </Box>
        <Box>
        <Text>Details</Text>
        <Text>Details</Text>
        </Box>
        <Box> <Text>Details</Text> <Text>Details</Text></Box>
        <Box> <Text>Details</Text> <Text>Details</Text></Box>
        <Box> <Text>Details</Text>  <Text>Details</Text></Box>
    </Box>
    </Box>
   </Container>
  )
}

export default page