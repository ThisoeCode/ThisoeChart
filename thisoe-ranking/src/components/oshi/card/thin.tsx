import Acard from "@/components/A/card"
import { cit, Oshi } from "@/lib/ts"

export default function Thin({v,i,className,id,title}:Readonly<{
  v:Oshi
  i:number
}&cit>){
  const
    rank = `#${i+1}`

  return<Acard ctt={v}className={className}id={id}title={title}>
    <b>{i===0?'👑':rank}</b>
    <p>{v._title}</p>
  </Acard>
}