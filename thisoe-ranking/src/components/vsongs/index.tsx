'use client'

// import Alist from "../A/list"
import Arankpage from "../A/rankpage"
import { useState } from "react"
import { store } from "@/lib/client"

export default function Song(){
  const
    id='song',
    [isThin,toggleThin]=useState(store(id+'_thin').get==='y'?true:false)

  return<Arankpage id={id}toggleThin={toggleThin}Anew={<></>}h1='Vtuber Songs'>
    {/* <Alist></Alist> */}
    TODO: song page
    <br/>thin:{isThin}
  </Arankpage>
}