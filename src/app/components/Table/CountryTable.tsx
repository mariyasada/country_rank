"use client";
import React, { useEffect, useState } from "react";
import { Container, Box } from "@radix-ui/themes";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { FaForward, FaBackward } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { countryProps as country, countryProps } from "../../constants/type";
import Image from "next/image";

export const HEADERS: string[] = [
  "Flag",
  "Name",
  "Population",
  `Area(km²)`,
  "Region",
  "Capital",
];

export type CountryTableProps = {
  search: string;
};

const CountryTable = ({ search }: CountryTableProps) => {
  const [countryData, setCountryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const[orderBy,setOrderBy]=useState({order:"",keyName:""});
  const countryPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const countries = await res.json();
      let FilteredData = countries
        .slice(0, 106)
        .sort((a: countryProps, b: countryProps) =>
          a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase())
        );
      FilteredData = FilteredData.filter(
        (country: countryProps) =>
          country?.name?.common.toLowerCase().includes(search.toLowerCase()) ||
          country?.region?.toLowerCase().includes(search.toLowerCase()) ||
          country?.subregion?.toLowerCase().includes(search.toLowerCase())
      );

      setCountryData(FilteredData);
    })();
  }, [search]);

  //   pagination logic
  useEffect(() => {
    if (countryData.length > 0) {
      setTotalPages(Math.ceil(countryData.length / countryPerPage));
    }
  }, [countryData]);

  const endIndex = countryPerPage * currentPage;
  const startIndex = endIndex - countryPerPage;
  const paginatedCompanies =
    countryData?.length > 0 ? countryData?.slice(startIndex, endIndex):[] as Array<countryProps>;


    const HandleOrderBy=(header:string)=>{
      if(orderBy.order==="DSC"){
        if(header==="Name"){
          setCountryData(prev=>prev.sort((a: countryProps, b: countryProps) =>
          a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase())
        ))
        }
        else if(header==="Population"){
          setCountryData(prev=>prev.sort((a: countryProps, b: countryProps) =>
          a.population-b.population
        ))
        }else{
          setCountryData(prev=>prev.sort((a: countryProps, b: countryProps) =>
          a.area-b.area
        ))
        }
      }
      else{
        if(header==="Name"){
          setCountryData(prev=>prev.sort((a: countryProps, b: countryProps) =>
          b.name.common.toLowerCase().localeCompare(a.name.common.toLowerCase())
        ))
        }
        else if(header==="Population"){
          setCountryData(prev=>prev.sort((a: countryProps, b: countryProps) =>
          b.population-a.population
        ))
        }
        else{
          setCountryData(prev=>prev.sort((a: countryProps, b: countryProps) =>
          b.area-a.area
        ))
        }
      }
    }

  return (
    <Container className="w-5/5 my-10 gap-5 flex flex-col items-center justify-center">
      <Box className="flex p-2 flex-row text-base text-slate-400 font-bold  bg-slate-100 shadow-sm rounded-sm ">
        {HEADERS.map((header) => (
          <Box
            key={header}
            className={`p-2 ${
              header === "Flag" ? "w-96" : "w-2/4"
            } flex justify-center -px-8 `}
          >
            <div>{header}</div>
            {(header !== "Flag"&& header !=="Region"&& header !=="Capital") && (
              <div style={{cursor:"pointer"}}>
                <MdArrowDropUp onClick={()=>{ 
                  setOrderBy(prev=>({...prev,order:"ASC",keyName:header}));
                HandleOrderBy(header)} } style={{color:orderBy.order==="ASC"&& header===orderBy.keyName?"#38bdf8":""}}/>
                <MdArrowDropDown  onClick={()=>{ 
                   setOrderBy(prev=>({...prev,order:"DSC",keyName:header}));
                HandleOrderBy(header)}} style={{color:orderBy.order==="DSC"&& header===orderBy.keyName?"#38bdf8":""}}/>
              </div>
            )}
          </Box>
        ))}
      </Box>

      <Box className="flex flex-col gap-6  mt-6 h-auto">
        {paginatedCompanies?.length > 0 &&
          paginatedCompanies?.map((country: country) => (
            <Link
              // key={country.name.common}
              href={`/country/${country.cca3}`}
              className="w-12/12 flex flex-row items-center justify-center gap-20 p-2 text-base bg-white shadow-md rounded-md cursor-pointer"
            >
              <div key={country.name.common}>
                <Image
                width={400}
                height={400}
                  src={country.flags.png}
                  className="h-20 w-20 object-contain"
                  alt="flag"
                />
              </div>
              <div className="flex justify-center items-center w-36">
                {country?.name?.common}
              </div>
              <div className="flex justify-center items-center w-36">
                {country?.population}
              </div>
              <div className="flex justify-center items-center w-36">
                {country?.area}
              </div>
              <div className="flex justify-center items-center w-36">
                {country?.region}
              </div>
              <div className="flex justify-center items-center w-36">
                {country?.capital}
              </div>
            </Link>
          ))}
      </Box>
      {/* Pagination container */}
      {totalPages > 1 && (
        <Box className="flex justify-end items-center text-base text-slate-500 gap-3 mt-4">
          <button
            className="bg-slate-200 shadow-md p-2"
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
              className={`bg-white shadow-md py-2 px-3 rounded-md ${
                currentPage === index + 1 && "bg-slate-400"
              }`}
              onClick={() => {
                setCurrentPage(index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="bg-slate-200 shadow-md p-2"
            style={{
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
            onClick={() =>
              currentPage !== totalPages && setCurrentPage(currentPage + 1)
            }
          >
            <FaForward />
          </button>
        </Box>
      )}
    </Container>
  );
};

export default CountryTable;
