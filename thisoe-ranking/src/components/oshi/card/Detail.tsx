import Acard from "@/components/A/card"
import Emoji from "@/components/emoji"
import { cit, Oshi } from "@/lib/ts"
import Image from "next/image"

export default function Detail({v,i,className,id,title}:Readonly<{
  v:Oshi
  i:number
}&cit>){
  const
    rank = `#${i+1}`

  return<Acard ctt={v}className={className}id={id}title={title}>
    <Emoji><h2>{i===0?'👑':rank}</h2></Emoji>
    <Image width={50}height={50}src={v.avaUrl}alt={v.name+' avatar'}/>
    <Emoji><h3>{v._title} {v.mark}</h3></Emoji>
    {v.mama && <p>Designer: {v.mama.name}</p>}
  </Acard>
}