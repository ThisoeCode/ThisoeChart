'use client'
import'./A.css'
import { store } from "@/lib/client"
import script from '@/script'
import { useEffect, useState } from "react"

export default function Apage(
    {Anew,h1,children,toggleThin,id,className}:Readonly<{
    Anew:React.ReactNode
    h1:string
    /** Put `<Alist>` in. */
    children:React.ReactNode
    toggleThin:(isThin:boolean)=>void
    id:string
    className?:string
  }>
){
  useEffect(()=>{
    store('theme').ifNullSet('dark')
    store(id+'_thin').ifNullSet('n')
    document.body.classList.toggle('dark', store('theme').get !== 'light')
    toggleThin(store(id+'_thin').get === 'y')
  },[id,toggleThin])

  const
    dark='dark', light='light', thin='y', thic='n',
    [isDark,setDark]=useState(store('theme').get===light?false:true),
    [isThin,setThin]=useState(store(id+'_thin').get===thin?true:false),
    handDark=()=>{
      const newDark = !isDark
      setDark(newDark)
      store('theme').set(newDark?dark:light)
      document.body.classList.toggle('dark',newDark)
    },
    handThic=()=>{
      const newThin = !isThin
      setThin(newThin)
      store(id+'_thin').set(newThin?thin:thic)
      toggleThin(newThin)
    }

  return<main id={id}className={className}>
    <header>
      <h1>{h1}</h1>
      <i id="btn-wrap">
        <button id="theme-btn"onClick={handDark}title={
          `${script().rankpage.header.btns.theme.switch1}${isDark?script().rankpage.header.btns.theme.light:script().rankpage.header.btns.theme.dark}${script().rankpage.header.btns.theme.switch2}`
        }>
          <i className={`svg ${isDark?'sun':'moon'}`}/>
        </button>
        <button id="thin-btn"onClick={handThic}title={
          `${script().rankpage.header.btns.list.switch1}${isThin?script().rankpage.header.btns.list.compact:script().rankpage.header.btns.list.detail}${script().rankpage.header.btns.list.switch2}`
        }>
          <i className={`svg ${isThin?'list-thic':'list-thin'}`}/>
        </button>
      </i>
    </header>
    <i>
      {Anew}
      {children}
    </i>
  </main>
}