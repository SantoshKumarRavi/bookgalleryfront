import React, { useState , useContext, createContext } from 'react'
const AuthProvider=createContext()

const UseAuth = ({children}) => {
const[accesstoken,setaccestoken]=useState("")
let values={
    accesstoken,
    setaccestoken
}

  return (
    <AuthProvider.Provider value={values}>
        {children}
    </AuthProvider.Provider>

  )
}
export function AuthConsumer(){
    return useContext(AuthProvider)
    }


export default UseAuth