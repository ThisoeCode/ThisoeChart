'use client'

import script from "@/script"
import Alist from "../A/Alist"
import Apage from "../A/Arankpage"
import { useState } from "react"
import { store } from "@/lib"

export default function Oshi(){
  const
    [isThin,toggleThin]=useState(store('oshi_thin').get==='y'?true:false)

  return<Apage id="oshi"toggleThin={toggleThin}>
    {/* <Alist></Alist> */}
    <i> ALIST {script().aboutPage} </i> {/* TODO DELETE */}
  </Apage>
}