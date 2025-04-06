'use client'
import'../A.css'
import { useEffect, useRef } from 'react'
import type{ cit } from "@/lib/ts"

/**
 * @example
 * const
 *   [isModOpen,setMod]=useState(false)
 * return
 *   <Amod open={open}onClose={()=>setOpen(false)}>
 *     <AmodInput />
 *   </Amod>
 */
export default function Amod({children,open,onClose,onSubmit,disableSubBtn,className,id,title}:Readonly<{
  children:React.ReactNode
  open:boolean
  onClose:()=>void
  onSubmit:()=>void
  disableSubBtn:boolean
}&cit>){
  // TODO make `Amod`
/////// config ///////
  const
    ref=useRef<HTMLDialogElement>(null)

/////// init ///////
  useEffect(()=>{
    const dialog=ref.current
    if(!dialog)return
    if(open&&!dialog.open)
      dialog.showModal()
    else if(!open&&dialog.open)
      dialog.close()

    const handCancel=(e:Event)=>{
      e.preventDefault()
      close()
    }
    dialog.addEventListener('cancel',handCancel)
    return()=>dialog.removeEventListener('cancel',handCancel)
  },[open,onClose])

/////// jsx ///////
  return<dialog  ref={ref} id={id}className={className}title={title}>
    <button onClick={close}><i className="x svg"/></button>
    {children}
    <button onClick={onSubmit}disabled={disableSubBtn}>
      <i className="submit-amod svg"/>
    </button>
  </dialog>
}