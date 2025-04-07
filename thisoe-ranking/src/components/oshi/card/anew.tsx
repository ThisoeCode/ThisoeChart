'use client'
import Anew from "@/components/A/new"
import AnewInput from "@/components/A/new/input"
import IWB from "@/components/A/new/iwb"
import { useState } from "react"

export default function AnewOshi(){
/////// config ///////
  const
    [cat,setCat]=useState(''),
    [name,setName]=useState(''),
    [mark,setMark]=useState(''),
    [mama,setMama]=useState(''),
    searchVtb=()=>{
      // TODO: search vtb using holodex api
    },
    submit=()=>{
      console.log({cat,name,mark,mama})
      // TODO: submit a new
    }

/////// jsx ///////
  return<Anew onSubmit={submit}disableSubBtn={!!name}/*modDialog={<Amod/>}*/>
    <IWB placeholder="Vtuber Name" onClick={searchVtb}onChange={setName}>
      Search on <i className="holodex svg" title="Holodex"/>
    </IWB>
    <AnewInput placeholder="Category code" onChange={setCat}/>
    <AnewInput placeholder="Oshi mark emoji" onChange={setMark}/>
    <AnewInput placeholder="Mama / Papa (Designer)" onChange={setMama}/>
  </Anew>
}