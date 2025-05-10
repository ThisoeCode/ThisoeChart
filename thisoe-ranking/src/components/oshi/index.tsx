'use client'
import script from "@/lib/script"
import Alist from "../A/list"
import Arankpage from "../A/rankpage"
import { useState } from "react"
import { store } from "@/lib/client"
import type{ Oshi } from "@/types/oshi"
import Anew from'./card/anew'
import Thin from './card/Thin'
import Detail from "./card/Detail"
import { TEST_DATA } from "@/tmp"
import './_.css'

export default function Oshi(){
  const
    [isThin,toggleThin]=useState(store('oshi_thin').get==='y'?true:false),
    /** @todo DELETE after db connection */
    testData=TEST_DATA as Oshi[]

  return<Arankpage id="oshi"
    h1={script().oshi.h1}
    toggleThin={toggleThin}Anew={<Anew/>}
  >
    <Alist ctt={testData}>
      {(v,i)=>isThin?<Thin v={v}i={i}/>:<Detail v={v}i={i}/>}
    </Alist>
  </Arankpage>
}