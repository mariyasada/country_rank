"use client";
import React, { useState,useEffect } from 'react'
import {FaEye,FaEyeSlash} from "react-icons/fa";
import { AuthContextType, useAuth } from '../context/AuthContext';


const Page = () => {
  const {logInHandler}=useAuth() as AuthContextType;
    const [password,setPassword]=useState("password");
    const [loginData,setLoginData]=useState({email:"",password:""});
    const [error,setError]=useState<string[]>([])

    const onChangeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const {name,value}= e.target;
      setLoginData(prev=>({...prev,[name]:value}));
    }

    const SubmitHandler=()=>{
      const temparr = [];
      if(loginData.email !=="" && loginData.password !=="") {
       if (!loginData.email.includes("@")) {
      temparr.push("Email id is not valid");
       }
    if (loginData.password.length < 8 || loginData.password.length > 16) {
      temparr.push("password length must be betwen 8 to 16 character");
    }
    setError(temparr);
    if(error?.length ===0){
    logInHandler(loginData)
  }
  
  }
    else{
      temparr.push("please fill both the fields")
    }

    }
   
  return (
    <main className='h-screen bg-slate-100 flex justify-center items-center '>
    <div className='flex flex-col gap-8 bg-white h-3/6 shadow-xl rounded-xl w-3/12 p-8 z-20 max-[600px]:w-11/12 '>
        <p className='text-center uppercase text-blue-700 font-bold'>signin</p>
        <div className='flex flex-col h-1/6 gap-3'>
        <label className=' text-blue-700'>Email</label>
           <input name="email" value={loginData.email}  onChange={(e)=>onChangeHandler(e)} className='w-12/12  border-2 border-indigo-500 rounded-md focus: outline-blue-700' />
        </div>
        <div className='flex flex-col h-1/6 gap-3 relative'>
        <label className=' text-blue-700'>Password</label>
        <input name="password" value={loginData.password}  onChange={(e)=>onChangeHandler(e)} className='w-12/12 border-2  border-indigo-500 rounded-md  focus: outline-blue-700' type={password}/>
        <span className='absolute top-10 right-4 cursor-pointer' >{password==="password"?<FaEye onClick={()=>setPassword("text")}/>:<FaEyeSlash onClick={()=>setPassword("password")}/>}</span>
        </div>
        <div className='flex justify-center mt-2'>
        <button className='bg-blue-500 w-28 p-1 text-white shadow-xl rounded-lg' onClick={SubmitHandler}>Sign In</button>
        </div>  
        <div className='-my-8 flex items-center justify-center'>{error && <span className='text-red-500 '>{error}</span>}</div>      
    </div>
     
    </main>
   
  )
}

export default Page