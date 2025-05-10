'use client'
import { cit } from "@/types"

export default function Dialog({children,isOpen,onClose,id,className,title}:Readonly<{
  children:React.ReactNode
  isOpen:boolean
  onClose?:()=>void
}&cit>){
  return<i className='backdrop'title={title}
    style={{display:isOpen?'flex':'none'}}
    onClick={(e)=>{
      if(e.target===e.currentTarget) onClose?.()
    }}
  >
    <i id={id}className={'dialog '+(className||'')}>
      {children}
    </i>
  </i>
}