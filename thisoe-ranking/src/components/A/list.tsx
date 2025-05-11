'use client'
import'./A.css'
import type{ Card, cit } from "@/types"
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor as keyboard, PointerSensor as pointer, useSensor, useSensors } from "@dnd-kit/core"
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, sortableKeyboardCoordinates as skc, verticalListSortingStrategy as vertical } from "@dnd-kit/sortable"
import { Fragment, useEffect, useState, useRef } from "react"

export default function Alist<C extends Card>(
  {ctt,children,onPlaceChange,className,id,title,}:Readonly<{
    /** Custom card that renders using `ctt` obj */
    children:(v:C,i:number)=>React.ReactNode
    ctt:C[]
    /**
     * @example
     * const [songs, setSongs] = useState<Song[]>({})
     * const handlePlaceChange = (newOrder: (Song & Card)[]) => {
     *   setSongs(newOrder)
     * }
     */
    onPlaceChange?: (newPlace:C[])=>void
  } & cit>
){

/////// config ///////
  const
    containerRef = useRef<HTMLOListElement>(null),
    // states
    [place,setPlace] = useState<C[]>(()=>
      ctt.map((v,i)=>({
        ...v,
        place: i+1,
      }))
    ),

    // dnd ctxt
    sense = useSensors(
      useSensor(pointer),
      useSensor(keyboard, {
        coordinateGetter: skc,
      }),
    ),

    updatePlace = (e:DragEndEvent)=>{
      const { active, over } = e
      if(!over||active.id === over.id)return

      setPlace((prevOrder)=>{
        const
          oldIndex = prevOrder.findIndex(
            (v)=>v._no === active.id
          ),
          newIndex = prevOrder.findIndex(
            (v)=>v._no === over.id
          ),
          newOrder = arrayMove(prevOrder, oldIndex, newIndex).map(
            (v,i)=>({
              ...v,
              place: i+1, // update the `place` value
            })
          )
        // notify parent about the order (place) change
        if(onPlaceChange)onPlaceChange(newOrder)
        return newOrder
      })
    }

/////// init ///////
  useEffect(() => {
    setPlace(
      ctt.map((v,i)=>({
        ...v,
        place: i+1,
      }))
    )
  }, [ctt])

/////// jsx ///////
  return<ol ref={containerRef} id={id}className={className}title={title}>
    <DndContext
      sensors={sense}
      collisionDetection={closestCenter}
      onDragEnd={updatePlace}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext items={place.map(v=>v._no)} strategy={vertical}>
        {place.map((v,i)=> // <li/> goes here
          <Fragment key={v._no}>{children(v,i)}</Fragment>
        )}
      </SortableContext>
    </DndContext>
  </ol>
}