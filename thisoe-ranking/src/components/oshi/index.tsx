'use client'
// import script from "@/lib/script"
import Alist from "../A/list"
import Arankpage from "../A/rankpage"
import { useState } from "react"
import { store } from "@/lib/client"
import Anew from'./card/anew'
import type{ Oshi } from "@/lib/ts"
import Thin from "./card/thin"
import Detail from "./card"
import { TEST_DATA } from "@/tmp"

export default function Oshi(){
  const
    [isThin,toggleThin]=useState(store('oshi_thin').get==='y'?true:false),
    /** @todo DELETE after db connection */
    testData=TEST_DATA as Oshi[]

  return<Arankpage id="oshi"
    h1="Oshi Ranking"
    toggleThin={toggleThin}Anew={<Anew/>}
  >
    <Alist ctt={testData}>
      {(v,i)=>isThin?<Thin v={v}i={i}/>:<Detail v={v}i={i}/>}
    </Alist>
  </Arankpage>
}