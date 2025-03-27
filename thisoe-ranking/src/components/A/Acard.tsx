import type{ Card, cit } from "@/lib/ts"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function Acard({ctt,children,className,id,title,}:Readonly<{
  /** Custom card that renders using `ctt` obj */
  children:React.ReactNode
  ctt:Card
} & cit>){
  const
    {attributes:a, listeners:l, setNodeRef:ref, transform, transition} = useSortable({ id: ctt.no }),
    style = {
      transform:CSS.Transform.toString(transform),
      transition,
    }
  return<li
    id={id}className={className}title={title}
    ref={ref}style={style}{...a}{...l}
  >
    {children}
  </li>
}