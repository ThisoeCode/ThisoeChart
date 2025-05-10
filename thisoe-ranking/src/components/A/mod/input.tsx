'use client'
import type{ cit } from "@/types"
import { useState } from "react"

/** 
 * @example
 * [val,setVal]=useState('')
 * <AmodInput onChange={setVal}placeholder="TODO PLACEHOLDER"/>
 */
export default function AmodInput({onChange,label,className,id,title}:Readonly<{
  label:string
  onChange:(_:string)=>void
} & cit>){
  const
    key='k'+Math.floor(Math.random()*2333333),
    [v,setVal]=useState(''),
    hand=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const v = e.target.value
      setVal(v)
      onChange(v)
    }
  return<i className={className||"input-wrap"}id={id}>
    <label htmlFor={key}title={title}>{label}</label>
    <input type="text" id={key}
      value={v}onChange={hand}
    />
  </i>
}