'use client'
import type{ cit } from "@/types"
import'../A.css'

export default function Anew({children,onSubmit,disableSubBtn,/*modDialog,*/className,id,title}:Readonly<{
  children:React.ReactNode
  onSubmit:()=>void
  disableSubBtn:boolean
  // modDialog:React.ReactElement
}&cit>){
  return<i id={id||"anew"}className={className}title={title}>
    {children}
    <button onClick={onSubmit}disabled={disableSubBtn}>
      <i className="submit-anew svg"/>
    </button>
    <button><i className="edit svg"/></button>
    {/* {modDialog} */}
  </i>
}