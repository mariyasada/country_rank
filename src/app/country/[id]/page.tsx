"use client"
import React, { useEffect, useState } from 'react'
import {Container,Box,Text} from "@radix-ui/themes"
import { usePathname } from 'next/navigation';
import { ageProps, countryProps,getAgeGroup } from '../../constants/type';
import { ResponsiveContainer,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip } from 'recharts';


const page = () => {
    const [country,setCountry]=useState<countryProps>();
    const [populationData,setPopulationData]=useState([])
    let pathname=usePathname();
    pathname=pathname.slice(-3);
    
    useEffect(()=>{
        (async()=>{
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${pathname}`);           
            const singleCountry = await res.json();
            setCountry(singleCountry[0])
            })();
    },[])

    useEffect(()=>{
       const country_URL= "https://d6wn6bmjj722w.population.io/1.0/population";
       const year=new Date().getFullYear();
       (async()=>{
        const res = await fetch(`${country_URL}/${year}/${country?.name.common}`);           
        const detail = await res.json();
        if(detail?.length> 0) {
            const formattedData=detail && detail?.reduce((acc:Array<ageProps>,curr:ageProps)=>{
                const ageGroup = getAgeGroup(curr.age ?? 0); 
                const existingEntry=acc?.find(entry => entry.name === ageGroup)
                if ( existingEntry) {
                                     
                    existingEntry.females += curr.females;
                    existingEntry.males += curr.males;
                } else {
                    acc.push({ name: ageGroup ?? "", females: curr.females, males: curr.males });
                }
                return acc;
                
            },[])          

            setPopulationData(formattedData)
        }
        })();

    },[country]);

    console.log(populationData,"check") 


  return (
  <Container className='py-28  bg-slate-100 h-screen' style={{overflowY:"auto",overflowX:'hidden'}}>
    {/* whole box also contains graph */}
    <Box className='flex flex-col gap-7 h-auto w-full'>
    <Box className=' flex flex-row justify-center gap-7 w-full'>
    {/* left side div */}
    <Box className='flex flex-col gap-3 bg-white rounded-md shadow-lg p-4' >
    <Box className='' ><img src={country?.flags?.png} alt="flag of country" className='h-40 w-80 object-contain'/></Box>
    <Box className='flex flex-col w-full items-center'>
        <Text className='text-2xl text-slate-900'>{country?.name?.common}</Text>
        <Text className='text-base text-slate-400'>{country?.region}</Text>
    </Box>
    <Box className='flex flex-row w-full items-center'>
    <Box className='flex flex-col w-full items-center'>
        <Text className='text-xl text-blue-900'>{country?.population
}</Text>
        <Text className='text-base text-slate-300 font-semibold'>Population</Text>
    </Box>
    <Box className='flex flex-col w-full items-center'>
        <Text className='text-xl text-blue-900'>{country?.area}</Text>
        <Text className='text-base text-slate-300 font-semibold'>Area</Text>
    </Box>
    </Box>
    </Box>
    {/* right side div */}
    <Box className='bg-white shadow-lg rounded-md p-8 w-5/12 gap-3'>
        <Text className='text-xl '>Details</Text>
        <Box className='w-full p-4 border-b-[2px] border-solid border-slate-100 flex justify-between'>
        <Text className='text-base text-slate-300 font-bold'>Capital</Text>
        <Text className='text-base text-slate-800 '>{country?.capital[0]}</Text>
        </Box>
        <Box className='w-full p-4 border-b-[2px] border-solid border-slate-100 flex justify-between'>
        <Text className='text-base text-slate-300 font-bold w-3/4'>Languages</Text>
        {country && Object.entries(country?.languages).map(([key,value])=>(
        <Text key={key} className='text-base text-slate-800'>{value},</Text>))}
        </Box>
        <Box className='w-full p-4 border-b-[2px] border-solid border-slate-100 flex justify-between'> 
        <Text className='text-base text-slate-300 font-bold'>Currencies</Text> 
        {country && Object.entries(country?.currencies).map(([key,value])=>(
        <Text key={key} className='text-base text-slate-800'>{value.name}</Text>))}</Box>
        <Box className='w-full p-4 border-b-[2px] border-solid border-slate-100 flex justify-between'> <Text className='text-base text-slate-300 font-bold'>Subregion</Text> <Text className='text-base text-slate-800  '>{country?.subregion}</Text></Box>
        <Box className='w-full p-4  flex justify-between'> <Text className='text-base text-slate-300 font-bold'>UN Member</Text>  <Text className='text-base text-slate-800  '>{country?.unMember
?"Yes":"No"}</Text></Box>
    </Box>
    </Box>
    <Box className=' w-full flex items-center justify-center gap-3 '>
        <Text className='text-slate-800 text-xl'>Population graph based on current Year (Age groups vs Population)</Text>
    </Box>

    {populationData?.length > 0 ? (
    <Box className='h-2/4 w-full  flex items-center justify-center'>
        <ResponsiveContainer height={400} width="80%">
            <BarChart
                data={populationData}
                margin={{
                    top: 10,
                    left: 30,
                }}
            >
                <CartesianGrid
                    stroke="#9ca3af"
                    strokeDasharray="1 4"
                    vertical={false}
                    cursor="none"
                />
                <XAxis
                    stroke="#9ca3af"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    label={{
                        value: "Age Groups",
                        fill: "#8193A8",
                        position: "bottom",
                        style: { fontSize: "20px" },
                    }}
                    dy={9}
                    padding={{
                        left: 20,
                        right: 20,
                        bottom: 0,
                        top: 0,
                    }}
                />
                <YAxis
                    stroke="#9ca3af"
                    axisLine={false}
                    tickLine={false}
                    dx={-2}
                />
                <Tooltip/>
                <Bar
                    type="monotone"
                    dataKey="females"
                    fill="#f472b6"
                    radius={[3, 3, 0, 0]}
                    barCategoryGap={20}
                    minPointSize={4}
                />
                <Bar
                    type="monotone"
                    dataKey="males"
                   fill="#38bdf8"
                    radius={[3, 3, 0, 0]}
                    barCategoryGap={20}
                    minPointSize={4}
                />
            </BarChart>
        </ResponsiveContainer>
    </Box>
):<Box className='h-2/4 w-full  flex items-center justify-center'><Text className='text-red-400 text-2xl'>No data Present for this country</Text></Box>}
    </Box>
   </Container>
  )
}

export default page