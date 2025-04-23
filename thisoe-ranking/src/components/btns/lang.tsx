'use client'
import { useState } from "react"
import Dialog from "../Dialog"
import LangMenu from "../langMenu"

export default function LangBtn(){
  const
    [isOpen,setOpen] = useState(false)

  return<>
    <button id="lang-btn"onClick={()=>setOpen(true)}>
      <i className="svg lang"/>
    </button>
    <Dialog id="lang-dialog"isOpen={isOpen}onClose={()=>setOpen(false)}>
      <LangMenu listOnly/>
    </Dialog>
  </>
}
