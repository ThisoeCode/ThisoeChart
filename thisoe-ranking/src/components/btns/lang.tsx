'use client'
import { useState } from "react"
import Dialog from "../Dialog"
import LangMenu from "../settings/langMenu"
import script from "@/lib/script"

export default function LangBtn(){
  const
    [isOpen,setOpen] = useState(false)

  return<>
    <button id="lang-btn"
      onClick={()=>setOpen(true)}
      title={script().rankpage.header.btns.lang}
    >
      <i className="svg lang"/>
    </button>
    <Dialog id="lang-dialog"isOpen={isOpen}onClose={()=>setOpen(false)}>
      <LangMenu listOnly/>
    </Dialog>
  </>
}
