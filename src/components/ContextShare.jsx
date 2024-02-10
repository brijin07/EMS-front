import React, { useState } from 'react'
import { createContext } from 'react'

export const registerContext=createContext()

function ContextShare({children}) {

    const [registerData,setRegisterData]=useState("")



  return (
    
    <registerContext.Provider value={{registerData,setRegisterData}}>
        {children}
    </registerContext.Provider>
  )
}

export default ContextShare