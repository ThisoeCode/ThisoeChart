import type{ Card } from "@/lib/ts"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function Acard({ctt,className,children}:Readonly<{
  children:React.ReactNode
  ctt:Card
  className?:string
}>){
  const
    {attributes:a, listeners:l, setNodeRef:ref, transform, transition} = useSortable({ id: ctt.no }),
    style = {
      transform:CSS.Transform.toString(transform),
      transition,
    }
  return<li className={className}ref={ref}style={style}{...a}{...l}>
    {children}
  </li>
}