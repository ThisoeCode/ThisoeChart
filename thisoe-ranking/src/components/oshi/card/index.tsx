import Acard from "@/components/A/card"
import { cit, Oshi } from "@/lib/ts"
import Image from "next/image"

export default function Detail({v,i,className,id,title}:Readonly<{
  v:Oshi
  i:number
}&cit>){
  const
    rank = `#${i+1}`

  return<Acard ctt={v}className={className}id={id}title={title}>
    <h2>{i===0?'👑':rank}</h2>
    <Image width={50}height={50}src={v.avaUrl}alt={v.name+' avatar'}/>
    <h3>{v._title} {v.mark}</h3>
    {v.mama && <p>Designer: {v.mama.name}</p>}
  </Acard>
}