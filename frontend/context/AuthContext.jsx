import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "")

    useEffect(()=>{
        localStorage.setItem("token", token)
    },[token])

    const login = (newToken)=>{
        setToken(newToken)
    }

    const logout = ()=>{
        setToken("")
        localStorage.removeItem("token")
    }

  return (
    <AuthContext.Provider value={{token, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider