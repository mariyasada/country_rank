import React from 'react'
import {TextField,Box,Flex} from "@radix-ui/themes";
import { FaSearch } from 'react-icons/fa';

export type searchBarProps={
  searchValue:string,
  setSearchValue:React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({searchValue,setSearchValue}:searchBarProps) => {
  console.log(searchValue,"line 11")
  return (
  <Box className=' p-4 flex flex-row gap-3 items-center bg-white w-4/12 rounded-md shadow-md text-base' >
      <FaSearch size={20} className="text-slate-500" />
    <input placeholder='Search the country by Name,Region and subRegion...' className='outline-none w-fit' 
    value={searchValue} 
    onChange={(e)=>setSearchValue(e.target.value)}/>
</Box>
  )
}

export default SearchBar