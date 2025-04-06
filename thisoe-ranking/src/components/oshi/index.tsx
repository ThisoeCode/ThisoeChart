'use client'
// import script from "@/script"
import Alist from "../A/list"
import Apage from "../A/rankpage"
import { useState } from "react"
import { store } from "@/lib/client"
import Anew from'./card/anew'
import type{ Oshi } from "@/lib/ts"
import Image from "next/image"
import Acard from "../A/card"

export default function Oshi(){
  const
    [isThin,toggleThin]=useState(store('oshi_thin').get==='y'?true:false),
    // TODO DELETE
    TEST_DATA:Oshi[]=[
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
    ]

  return<Apage id="oshi"toggleThin={toggleThin}>
    <Alist Anew={<Anew/>}ctt={TEST_DATA}>
      {(v)=>isThin?
        <Acard ctt={v}>
          <h1>#{v._rank}</h1>
          <h2>{v._title} {v.mark}</h2>
          <p>Designer: {v.mama.name}</p>
          <Image width={39}height={39}src={v.avaUrl}alt={TEST_DATA[0].name+' avatar'}/>
        </Acard>
        :
        <Acard ctt={v}>
          <b>#{v._title}</b>
          <p>{v._title}</p>
        </Acard>
      }
    </Alist>
  </Apage>
}