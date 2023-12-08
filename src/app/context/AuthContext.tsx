"use client";
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export type User={email:string, password:string}

export type AuthContextType = {
  user:User,
  isAuthenticated: boolean;
  logInHandler: (data:User) => void;
  logout: () => void;
  setUser:React.Dispatch<React.SetStateAction<User>>;
};

export type ProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider= ({ children }:ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(()=>{
    let storedAuth= localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      
        const parsedAuth = JSON.parse(storedAuth);
        if (typeof parsedAuth === 'object' && parsedAuth !== null) {
         return true;
        } else {
          return false;
        }  
    } else {
      return false;
    }
  });
  const [user,setUser]=useState({} as User)
  const router=useRouter();
 

  useEffect(() => {
    let storedAuth= localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        if (typeof parsedAuth === 'object' && parsedAuth !== null) {
          setIsAuthenticated(true);
          setUser(parsedAuth);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error parsing authentication data:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logInHandler= (data:User) => {
    localStorage.setItem('isAuthenticated', JSON.stringify(data));
    setIsAuthenticated(true);
    router.push("/dashboard")
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    router.push("/");
    setUser({} as User)
    
  };

  return (
    <AuthContext.Provider value={{user,setUser, isAuthenticated, logInHandler, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };


