import'./A.css'
import type{ Card, cit } from "@/types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function Acard({ctt,children,className,id,title,}:Readonly<{
  /** Custom card that rendered with `ctt` obj */
  children:React.ReactNode
  ctt:Card
} & cit>){
  const
    { attributes:a, listeners:l, setNodeRef:ref,
      transform,transition,
      isDragging,
    } = useSortable({ id: ctt._no }),
    style = {
      transform:CSS.Transform.toString(transform),
      transition,
      boxShadow: isDragging ? '0 2pt 3pt #3333' : void'',
      zIndex: isDragging ? 9 : void'',
    }
  return<li
    id={id}className={className}title={title}
    ref={ref}style={style}{...a}{...l}
  >
    {children}
  </li>
}