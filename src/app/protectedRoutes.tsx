"use client";
import { useRouter } from "next/navigation";
import { useAuth ,AuthContextType} from "./context/AuthContext";
import React,{useEffect,ReactNode} from "react";
import Loader from "./components/Loader/Loader";



export type protectedRoutesProps= {
  children: ReactNode
};

export const ProtectRoute : React.FC <protectedRoutesProps>= ({ children }) => {
    const { isAuthenticated } = useAuth() as AuthContextType;
    const router=useRouter();
    
 
    // useEffect(() => {
    //   const redirectUser = async () => {
    //     if (!isAuthenticated && window.location.pathname !== '/') {
    //       router.push("/signup");
    //     }
    //   };
  
    //   redirectUser();
    // }, [isAuthenticated]);
  
    return <>{children}</>;
 };