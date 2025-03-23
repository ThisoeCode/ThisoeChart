'use server'
import{API}from"@/lib/_server"
import type{Aobj}from"@/lib/ts"

// 1. FETCH APIs
const _=async(url:string,data:Aobj,method:string)=>{
  const SERV_ID = crypto.randomUUID().replace('-','')
  try{
    const res=await fetch(API+url,{
      method,
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data),
    })
    if(res.ok)
      return{thisoe:(await res.json()),ok:1,status:res.status}
    console.error(`[Thisoe] Error: PUTFAILED. (SERV_ID::${SERV_ID}) ${res.status}`)
    return{ok:0,SERV_ID}
  }catch(_){
    console.error(`[Thisoe] Error: USESERVER_NOTPUTTING {{ ${_} }} WITH SERV_ID::`+SERV_ID)
    return{ok:0,SERV_ID}
  }
}
export const
put = (urlSuffix:string,data:Aobj)=>{_(urlSuffix,data,'PUT')},
get = (urlSuffix:string)=>{_(urlSuffix,{},'PUT')}