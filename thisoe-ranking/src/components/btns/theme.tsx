'use client'
import { store } from "@/lib/client"
import { initTheme } from "@/lib/config"
import script from "@/lib/script"
import { useState, useEffect } from "react"

export default function ThemeBtn(){
  useEffect(()=>{
    store('theme').ifNullSet(initTheme)
  },[])

  const
    dark='dark', light='oh no',
    [isDark,setDark]=useState(false),
    [mounted,setMounted]=useState(false)

  useEffect(()=>{
    const theme = store('theme').get
    setDark(theme === dark)
    document.body.classList.toggle('dark', theme === dark)
    setMounted(true)
  }, [])

  const
    toggleTheme=()=>{
      const newTheme = isDark?light:dark
      setDark(newTheme===dark)
      store('theme').set(newTheme)
      document.body.classList.toggle('dark',newTheme===dark)
    },
    txt=script().rankpage.header.btns.theme

  if(!mounted)return <button id="theme-btn"/>
  return<button id="theme-btn"onClick={toggleTheme}title={
    `${txt.switch1}${isDark?txt.light:txt.dark}${txt.switch2}`
  }>
    <i className={`svg ${isDark?'sun':'moon'}`}/>
  </button>
}
