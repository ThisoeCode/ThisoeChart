'use client'

import script from "@/script"
import Alist from "../A/list"
import Apage from "../A/rankpage"
import { useState } from "react"
import { store } from "@/lib/client"

export default function Song(){
  const
    id='song',
    [isThin,toggleThin]=useState(store(id+'_thin').get==='y'?true:false)

  return<Apage id={id}toggleThin={toggleThin}>
    {/* <Alist></Alist> */}
  </Apage>
}