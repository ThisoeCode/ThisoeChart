"use client"

import type{ Card, cit } from "@/lib/ts"
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor as keyboard, PointerSensor as pointer, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, sortableKeyboardCoordinates as skc, verticalListSortingStrategy as vertical } from "@dnd-kit/sortable"
import { useEffect, useState } from "react"

export default function Alist<C extends Card>(
  {Anew,ctt,children,onPlaceChange,className,id,title,}:Readonly<{
    Anew:React.ReactNode
    /** Custom card that renders using `ctt` obj */
    children:(_:C)=>React.ReactNode
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
  return<ol id={id}className={className}title={title}>
    {Anew}
    <DndContext
      sensors={sense}
      collisionDetection={closestCenter}
      onDragEnd={updatePlace}
    >
      <SortableContext items={place.map(v=>v.no)} strategy={vertical}>
        {place.map(v=>
          <li key={v.no}>{children(v)}</li>
        )}
      </SortableContext>
    </DndContext>
  </ol>
}