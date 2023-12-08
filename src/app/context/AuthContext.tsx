"use client";
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
export type AuthContextType = {
  isAuthenticated: boolean;
  logInHandler: (data:object) => void;
  logout: () => void;
};

export type ProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router=useRouter();
 

  useEffect(() => {
    let storedAuth= localStorage.getItem('isAuthenticated');
    if(storedAuth){
      storedAuth=JSON.parse(storedAuth);
      setIsAuthenticated(true);
    }
      else {
        setIsAuthenticated(false)
      }
  }, []);

  const logInHandler= (data:object) => {
    localStorage.setItem('isAuthenticated', JSON.stringify(data));
    setIsAuthenticated(true);
    router.push("/dashboard")
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logInHandler, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };


