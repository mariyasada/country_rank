"use client"
import React,{useEffect, useState} from 'react'
import {Container,Box} from "@radix-ui/themes"
import { MdArrowDropUp ,MdArrowDropDown} from "react-icons/md";
import { FaForward,FaBackward } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {countryProps as country} from "../../constants/type"




export const HEADERS:string[]=['Flag',"Name","Population",`Area(km²)`,"Region","Capital"];




const CountryTable = () => {
    const [countryData,setCountryData]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const countryPerPage = 10;
    const router=useRouter();
        
    useEffect(()=>{
                (async()=>{
                const res = await fetch("https://restcountries.com/v3.1/all");
                const countries = await res.json();
                const FilteredData = countries.slice(0,106);
                setCountryData(FilteredData)
                })();
        },[])

        //   pagination logic
  useEffect(() => {
    if (countryData.length > 0) {
      setTotalPages(Math.ceil(countryData.length / countryPerPage));
    }
  }, [countryData]);

  const endIndex = countryPerPage * currentPage;
  const startIndex = endIndex - countryPerPage;
  const paginatedCompanies=
    countryData?.length > 0 && countryData?.slice(startIndex, endIndex);

   
   
  return (
   <Container className='w-5/5 my-10 gap-5 flex flex-col items-center justify-center'>
   <Box className='flex p-2 flex-row text-base text-slate-400 font-bold  bg-slate-100 shadow-sm rounded-sm '>
      { HEADERS.map(header=>(
        <Box key={header} className={`p-2 ${header==="Flag"?"w-96":"w-2/4"} flex justify-center -px-8 `}><div>{header}</div>
        {header !=="Flag"&&<div><MdArrowDropUp/>
        <MdArrowDropDown/></div>}</Box>))}
    </Box>

    <Box className='flex flex-col gap-6  mt-6 h-auto' >{paginatedCompanies?.length > 0 && paginatedCompanies?.map((country:country)=>(
    <Link href={`/${country.cca3}`} className='w-12/12 flex flex-row items-center justify-center gap-20 p-2 text-base bg-white shadow-md rounded-md cursor-pointer'>
      <div><img src={country.flags.png} className='h-20 w-20 object-cover' alt="flag"/></div>
      <div className='flex justify-center items-center w-36'>{country?.name?.common}</div>
      <div className='flex justify-center items-center w-36'>{country?.population}</div>
      <div className='flex justify-center items-center w-36'>{country?.area}</div>
      <div className='flex justify-center items-center w-36'>{country?.region}</div>
      <div className='flex justify-center items-center w-36'>{country?.capital}</div>
    </Link>))}
    
    </Box>
    {/* Pagination container */}
    {totalPages > 1 && (<Box className='flex justify-end items-center text-base text-slate-500 gap-3 mt-4'>
        <button className='bg-slate-200 shadow-md p-2'        
                style={{
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
                onClick={() =>
                  currentPage !== 1 &&
                  setCurrentPage((currentPage) => currentPage - 1)
                }
              >
                <FaBackward />
              </button>
              {[...Array(totalPages)].map((page, index) => (
                <button
                  key={index}
                  className={`bg-white shadow-md py-2 px-3 rounded-md ${currentPage === index + 1 && "bg-slate-400"}`}
                  onClick={() => {
                    setCurrentPage(index + 1);
                  }}
                >
                  {index + 1}
                </button>
              ))}
              <button
               className='bg-slate-200 shadow-md p-2'
                style={{
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                }}
                onClick={() =>
                  currentPage !== totalPages && setCurrentPage(currentPage + 1)
                }
              >
                <FaForward />
              </button></Box>)}
   
   </Container>
  )
}

export default CountryTable

