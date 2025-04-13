'use client'
import'./A.css'
import { store } from "@/lib/client"
import { useEffect, useState } from "react"

export default function Arankpage(
  {children,toggleThin,id,className}:Readonly<{
    /** Put `<Alist>` in. */
    children:React.ReactNode
    toggleThin:(isThin:boolean)=>void
    id:string
    className?:string
  }>
){
  useEffect(()=>{
    store(id+'_thin').ifNullSet('n')
    store('theme').ifNullSet('dark')
  },[id])

  const
    dark='dark', light='oh no', thin='y', thic='n',
    [isDark,setDark]=useState(store('theme').get===light?false:true),
    [isThin,setThin]=useState(store(id+'_thin').get===thic?false:true),
    handDark=()=>{
      setDark(!isDark)
      store('theme').set(isDark?dark:light)
    },
    handThic=()=>{
      setThin(!isThin)
      store(id+'_thin').set(isThin?thin:thic)
      toggleThin(isThin)
    }

  return<main id={id}className={className}>
    <header>
      <h1>Oshi Ranking</h1>
      <i id="btn-wrap">
        <button id="theme-btn"onClick={handDark}>
          <i className={
            "svg "+isDark?'sun':'moon'
          }/>
        </button>
        <button id="thin-btn"onClick={handThic}>
          <i className="svg thin"/>
        </button>
      </i>
    </header>
    <i>{children}</i>
  </main>
}