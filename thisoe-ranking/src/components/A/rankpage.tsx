'use client'
import'./A.css'
import { store } from "@/lib/client"
import script from '@/lib/script'
import { useEffect, useState } from "react"
import Header from '../HEADER'
import ArankpageSkeleton from '@/skeletons/rankpage'

export default function Arankpage(
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
  const
    thin='y', thic='n',
    [isThin,setThin]=useState(store(id+'_thin').get===thin?true:false),
    [mounted,setMounted]=useState(false),
    handThic=()=>{
      const newThin = !isThin
      setThin(newThin)
      store(id+'_thin').set(newThin?thin:thic)
      toggleThin(newThin)
    }

  useEffect(()=>{
    store(id+'_thin').ifNullSet('n')
    toggleThin(store(id+'_thin').get === 'y')
    setMounted(true)
  },[id,toggleThin])

  if(!mounted)return <ArankpageSkeleton header={<Header h1={h1}/>}/>
  return<main id={id}className={className}>
    <Header h1={h1}>
      <button id="thin-btn"onClick={handThic}title={
        `${script().rankpage.header.btns.list.switch1}${isThin?script().rankpage.header.btns.list.compact:script().rankpage.header.btns.list.detail}${script().rankpage.header.btns.list.switch2}`
      }>
        <i className={`svg ${isThin?'list-thic':'list-thin'}`}/>
      </button>
    </Header>
    <i>
      {Anew}
      {children}
    </i>
  </main>
}