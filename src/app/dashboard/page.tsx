"use client"
import { Box ,Container,Flex} from '@radix-ui/themes'

import React, { useEffect } from 'react'
import { FaGlobe } from 'react-icons/fa'
import SearchBar from '../components/SearchBar/SearchBar';
import CountryTable from '../components/Table/CountryTable';


const page = () => {
  
  return (
    <Container className='flex flex-col text-3xl bg-slate-100 ' style={{overflowY:"auto",overflowX:"hidden"}} > 
      <h1 className='py-10 flex items-center justify-center gap-4 font-bold text-slate-500 w-screen max-[600px]:py-14'><FaGlobe className="text-blue-500"/>Worlds<span className='text-blue-500'>Rank</span></h1>
    <Box className=' flex flex-row gap-80 items-center justify-center'>
     <Box className='text-lg text-slate-600'>250 countaries</Box>
     <SearchBar/>
    </Box>
    <Box>
      <CountryTable/>
      </Box>    
    </Container>
  )
}

export default page