import { createContext, useState } from "react"

export const MountContext = createContext<{
  mounted:boolean,
  setMounted:(mounted:boolean)=>void
}>({mounted:false,setMounted:()=>{}})

export default function MountProvider({children}:{
  children:React.ReactNode
}){
  const [mounted,setMounted] = useState(false)
  return<MountContext.Provider value={{mounted,setMounted}}>
    {children}
  </MountContext.Provider>
}