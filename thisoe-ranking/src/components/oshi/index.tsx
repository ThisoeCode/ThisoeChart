'use client'
import './_.css'
import script from "@/lib/script"
import Alist from "../A/list"
import Arankpage from "../A/rankpage"
import { useState } from "react"
import { store } from "@/lib/client"
import Anew from'./card/anew'
import Thin from './card/Thin'
import Detail from "./card/Detail"
import { TEST_DATA } from "@/tmp"
import type{ Oshi } from "@/types/oshi"
import type{ User } from "next-auth"

export default function Oshi({auth,chart}:Readonly<{
  auth:User|null
  chart:Oshi[]
}>){
  const
    [isThin,toggleThin]=useState(store('oshi_thin').get==='y'?true:false),
    /** @todo DELETE after db connection */
    testData=TEST_DATA as Oshi[]

  // TODO: DELETE after db connection
  if(!chart)
    return<h1>NO CHART</h1>

  return<Arankpage id="oshi"auth={auth}
    h1={script().oshi.h1}
    toggleThin={toggleThin}Anew={<Anew/>}
  >
    <Alist ctt={testData}>{/* @todo: Replace `testData` with `chart` */}
      {(v,i)=>isThin?<Thin v={v}i={i}/>:<Detail v={v}i={i}/>}
    </Alist>
  </Arankpage>
}