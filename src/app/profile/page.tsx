"use client"
import React from 'react'
import { AuthContextType, useAuth } from '../context/AuthContext'

const page = () => {
    const {logout}=useAuth() as AuthContextType;
  return (
    <div> profile page
        <button onClick={logout}>logout</button>
    </div>
  )
}

export default page