'use client'
import'./A.css'
import type{ Card, cit } from "@/lib/ts"
import { closestCenter, DndContext, DragEndEvent, TouchSensor as mobile, PointerSensor as mouse, useSensor, useSensors } from "@dnd-kit/core"
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, verticalListSortingStrategy as vertical } from "@dnd-kit/sortable"
import { Fragment, useEffect, useState } from "react"

export default function Alist<C extends Card>(
  {Anew,ctt,children,onPlaceChange,className,id,title,}:Readonly<{
    Anew:React.ReactNode
    /** Custom card that renders using `ctt` obj */
    children:(v:C,i:number)=>React.ReactNode
    ctt:C[]
    /**
     * @example
     * const [songs, setSongs] = useState<Song[]>({});
     * const handlePlaceChange = (newOrder: (Song & Card)[]) => {
     *   setSongs(newOrder);
     * };
     */
    onPlaceChange?: (newPlace:C[])=>void
  } & cit>
){

/////// config ///////
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
      useSensor(mouse),
      useSensor(mobile,{
        activationConstraint: {
          delay: 99,
          tolerance: 5,
        },
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
  return<ol id={id}className={className}title={title}>
    {Anew}
    <DndContext
      sensors={sense}
      collisionDetection={closestCenter}
      onDragEnd={updatePlace}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={place.map(v=>v._no)} strategy={vertical}>
        {place.map((v,i)=>
          <Fragment key={v._no}>{children(v,i)}</Fragment>
        )}
      </SortableContext>
    </DndContext>
  </ol>
}