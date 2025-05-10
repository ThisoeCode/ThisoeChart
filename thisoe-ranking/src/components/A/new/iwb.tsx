import type{ cit } from "@/types"
import AnewInput from "./input"

/** Input With Button
 * @example
 * const
 *   [val,setVal]=useState(''),
 *   hClick=()=>{TODO_HANDLE_CLICK}
 * return
 *   <IWB placeholder="TODO PLACEHOLDER"onClick={hClick}onChange={setVal}>
 *      TODO BUTTON TEXT
 *   </IWB>
*/
export default function IWB({onClick,onChange,children,placeholder,className,id,title}:Readonly<{
  placeholder?:string
  /** Button text */
  children:React.ReactNode
  /** Track input */
  onChange:(_:string)=>void
  onClick:()=>void
} & cit>){
  return<i className={className?'iwb '+className:'iwb'}id={id}>
    <AnewInput onChange={onChange}placeholder={placeholder}title={title}/>
    <button onClick={onClick}>{children}</button>
  </i>
}