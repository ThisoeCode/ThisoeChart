'use client'
// import script from "@/script"
import Alist from "../A/list"
import Apage from "../A/rankpage"
import { useState } from "react"
import { store } from "@/lib/client"
import Anew from'./card/anew'
import type{ Oshi } from "@/lib/ts"
import Thin from "./card/thin"
import Detail from "./card"

export default function Oshi(){
  const
    [isThin,toggleThin]=useState(store('oshi_thin').get==='y'?true:false),
    /** @todo DELETE */
    TEST_DATA=[
      {
        _no:'UC5CwaMl1eIgY8h02uZw7u8A',
        _rank:1,
        _place:1,
        _title:'星街すいせい',
        ytid:'UC5CwaMl1eIgY8h02uZw7u8A',
        cat:'H0',
        name:'星街すいせい',
        avaUrl:'https://yt3.ggpht.com/ytc/AIdro_kLDBK5ksSvk5-XJ6S8e0kWfjy7mVl3jyUkgDeMQ7rlCpU=s800-c-k-c0x00ffffff-no-rj',
        mark:'☄️',
        mama:{
          name:'手島',
          pid:14993224,
          xid:'_17meisai23',
        },
        langNames:[],
        sotugyou:false,
        org:'holo',
      },
      {
        _no:'UC3n5uGu18FoCy23ggWWp8tA',
        _rank:2,
        _place:2,
        _title:'Nanashi Mumei',
        ytid:'UC3n5uGu18FoCy23ggWWp8tA',
        cat:'HEP',
        name:'Nanashi Mumei',
        avaUrl:'https://yt3.ggpht.com/ufO7pGRu0vUfA2FLPz7yN517i8wOYxAdcxB9nSTKKfiKhjec0ulSmwWmRA00KqVpOTIesgXhMA=s800-c-k-c0x00ffffff-no-rj',
        mark:'🪶',
        mama:{
          name:'あずーる',
          pid:5838770,
          xid:'azure_0608_sub',
        },
        langNames:[],
        sotugyou:false,
        org:'holo',
        orgSub:'ibEnglish -Promise-',
      },
      {
        _no:'UCMwGHR0BTZuLsmjY_NT5Pwg',
        _rank:3,
        _place:3,
        _title:`Ninomae Ina'nis`,
        ytid:'UCMwGHR0BTZuLsmjY_NT5Pwg',
        cat:'HEM',
        name:`Ninomae Ina'nis`,
        avaUrl:'https://yt3.ggpht.com/hJ45UDEa_rKtqxjNcIcYYJ_3eBvl9Jj2H-gXHBwNDwKOcSvDLjSwgOVbU9tEbUQmpGnyGwQFLQ=s800-c-k-c0x00ffffff-no-rj',
        mark:'🐙',
        mama:{
          name:'黒星紅白',
          pid:178217,
          xid:'kuroboshi',
        },
        langNames:[],
        sotugyou:false,
        org:'holo',
        orgSub:'h English -Myth-',
      },
    ]as Oshi[]

  return<Apage id="oshi"toggleThin={toggleThin}>
    <Alist Anew={<Anew/>}ctt={TEST_DATA}>
      {(v,i)=>isThin?<Thin v={v}i={i}/>:<Detail v={v}i={i}/>}
    </Alist>
  </Apage>
}