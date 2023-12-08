"use client";
import { usePathname, useRouter } from "next/navigation";
import React ,{useEffect}from "react";
import { FaHome, FaUser, FaGlobe } from "react-icons/fa";
import "./../globals.css"
import { AuthContextType, useAuth } from "../context/AuthContext";




export const navItems = [
  { name: "Home", link: "/", icon: <FaHome size={20} /> },
  { name: "countries", link: "/dashboard", icon: <FaGlobe size={20}  /> },
  { name: "Profile", link: "/profile", icon: <FaUser size={20}  /> },

];

type navbarProps={
  name:string;
  link:string;
  icon?:any
}

export const Navbar = () => {
  const router = useRouter();
const pathname=usePathname();
  const {isAuthenticated}=useAuth() as AuthContextType;

  const routeHandler=(item : navbarProps)=>{
   if(!isAuthenticated ) {
    if (item.link === "/") router.push("/")
    else   router.push("/signup");
} 
   else router.push(`${item?.link}`)

  }
 
  return (
    <>
    {pathname ==="/signup" ?<div></div>:
    <div className={`absolute flex items-center justify-end p-10 top-0 right-3 gap-6 max-[600px]:-top-8 right-0 `}>
      {navItems?.map((item) => (
        <div  key={item.name} className={`h-10 w-10 flex items-center ${pathname===item.link?"text-blue-500":"text-slate-500"} justify-center cursor-pointer bg-white rounded-3xl shadow-lg`} onClick={() => routeHandler(item)}>{item.icon}</div>
      ))}
    </div>}
    </>
  );
};

export default Navbar;
