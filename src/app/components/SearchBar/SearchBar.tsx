import React from 'react'
import {TextField,Box,Flex} from "@radix-ui/themes";
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
  <Box className=' p-4 flex flex-row gap-3 items-center bg-white w-4/12 rounded-md shadow-md text-base' >
      <FaSearch size={20} className="text-slate-500" />
    <input placeholder='Search the country by name...' className='outline-none w-fit'/>
</Box>
  )
}

export default SearchBar