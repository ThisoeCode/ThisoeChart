'use client'
import { cit } from "@/lib/ts"

export default function Dialog({children,isOpen,onClose,id,className,title}:Readonly<{
  children:React.ReactNode
  isOpen:boolean
  onClose?:()=>void
}&cit>){
  return<i className='backdrop'title={title}
    style={{display:isOpen?'flex':'none'}}
    onClick={onClose}
  >
    <i id={id}className={'dialog '+className}>
      {children}
    </i>
  </i>
}