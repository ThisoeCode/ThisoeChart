'use client'
import type{ cit } from "@/types"
import { useState } from "react"

/** 
 * @example
 * [val,setVal]=useState('')
 * <AnewInput onChange={setVal}placeholder="TODO PLACEHOLDER"/>
 */
export default function AnewInput({onChange,placeholder,className,id,title}:Readonly<{
  placeholder?:string
  onChange:(_:string)=>void
} & cit>){
  const
    [v,setVal]=useState(''),
    hand=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const v = e.target.value
      setVal(v)
      onChange(v)
    }
  return<input type="text"
    value={v}onChange={hand}
    placeholder={placeholder}
    className={className}id={id}title={title}
  />
}