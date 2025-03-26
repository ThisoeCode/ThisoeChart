"use client"

import type{ Card } from "@/lib/ts"
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor as keyboard, PointerSensor as pointer, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, sortableKeyboardCoordinates as skc, verticalListSortingStrategy as vertical } from "@dnd-kit/sortable"
import { useEffect, useState } from "react"

export default function Alist<C extends Card>(
  {Anew,ctt,renderCtt,onPlaceChange,className,id,children}:Readonly<{
    children:React.ReactNode
    Anew:React.ReactNode
    /** @todo Add `renderCtt` */
    renderCtt:(_:C)=>React.ReactNode
    ctt:C[]
    onPlaceChange?: (newPlace:C[])=>void
    className?:string
    id?:string
  }>
){

///////
  const
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
            (v)=>v.no === active.id
          ),
          newIndex = prevOrder.findIndex(
            (v)=>v.no === over.id
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

    


///////
  useEffect(() => {
    setPlace(
      ctt.map((v,i)=>({
        ...v,
        place: i+1,
      }))
    )
  }, [ctt])

///////
  return<ol id={id}className={className}>
    {Anew}
    <DndContext
      sensors={sense}
      collisionDetection={closestCenter}
      onDragEnd={updatePlace}
    >
      <SortableContext items={place.map(i=>i.no)} strategy={vertical}>
        <i>{children /* TODO: make `renderCtt` */}</i>
      </SortableContext>
    </DndContext>
  </ol>
}