'use client'
import'./A.css'
import { store } from "@/lib/client"
import script from '@/lib/script'
import { useContext, useEffect, useState } from "react"
import Header from './Header'
import ArankpageSkeleton from '../skeletons/rankpage'
import MountProvider, { MountContext } from '@/contexts/mount'
import type{ User } from 'next-auth'

type Props = Readonly<{
  Anew:React.ReactNode
  h1:string
  auth:User|null
  /** Put `<Alist>` in. */
  children:React.ReactNode
  toggleThin:(isThin:boolean)=>void
  id:string
  className?:string
}>



export default function Arankpage(attr:Props){
  return<MountProvider>
    <Rankpage{...attr}/>
  </MountProvider>
}



const Rankpage=(
  {Anew,h1,children,toggleThin,id,className}:Props
)=>{
  const
    thin='y', thic='n',
    [isThin,setThin]=useState(store(id+'_thin').get===thin?true:false),
    // ,
    {mounted,setMounted} = useContext(MountContext),
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
  },[id,toggleThin,setMounted])

  if(!mounted)
    return<ArankpageSkeleton/>

  return<main id={id}className={`rankpage ${className}`}>
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