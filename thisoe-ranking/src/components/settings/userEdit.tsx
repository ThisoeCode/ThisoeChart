'use client'
import Image from "next/image"
import script from "@/lib/script"
import { useState } from "react"
import { modImgSize } from "@/lib/client"
import { updateUser } from "@/lib/actions"
import type{ UserMeta } from "@/types/insu"

export default function UserEdit({user}:{user:UserMeta}){
  const
    [origMeta,setOrigMeta] = useState<UserMeta>({ ...user,
      social: { mail:user.social.mail,
        x: user.social?.x || '',
        yt: user.social?.yt || ''
      }
    }),
    [meta,setMeta]=useState<UserMeta>(origMeta),
    [isSaving,setSaving]=useState(false),
    hasChanged = JSON.stringify(origMeta)!==JSON.stringify(meta),

    nameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setMeta({...meta, name:e.target.value})
    },
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setMeta({...meta, handle:e.target.value})
    },
    xChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setMeta({...meta, social:{...meta.social, x:e.target.value}})
    },
    ytChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setMeta({...meta, social:{...meta.social, yt:e.target.value}})
    },
    enterSave=(e:React.KeyboardEvent<HTMLInputElement>)=>{
      if(e.key==='Enter')
        save()
    },
    save=async()=>{
      if(!hasChanged)return
      setSaving(true)
      setOrigMeta(await updateUser(meta))
      setSaving(false)
    },

    Skeleton=()=>
      <i id="user-edit"className="skeleton">
        <button id="avatar-btn">
          <Image src={modImgSize(meta.avatar,270)}alt="avatar"width={270}height={270}/>
        </button>
        <input id="username"/>
        <i id="handle-wrap">
          <label htmlFor="handle">@</label>
          <input id="handle"/>
        </i>
        <i id='socials-wrap'>
          <i className="x svg"/>
          <label htmlFor="x">@</label>
          <input id="x"/>
          <i className="yt svg"/>
          <label htmlFor="yt">@</label>
          <input id="yt"/>
        </i>
        <button id="savechanges-btn"disabled>{script().settings.auth.saveing}</button>
      </i>

  if(isSaving)
    return<Skeleton/>

  ///////
  return<i id="user-edit">

    {/* TODO: Make Avatar editable
        1. Choose X or YT
        2. Enter Image URL
    */}
    <button id="avatar-btn">
      <Image src={modImgSize(meta.avatar,270)}alt="avatar"width={270}height={270}/>
    </button>

    <input id="username"
      value={meta.name}
      onChange={nameChange}
      onKeyDown={enterSave}
    />

    <i id="handle-wrap">
      <label htmlFor="handle">@</label>
      <input id="handle"
        value={meta.handle}
        onChange={handleChange}
        onKeyDown={enterSave}
      />
    </i>

    <i id='socials-wrap'>
      <i className="x svg"/>
      <label htmlFor="x">@</label>
      <input id="x"
        value={meta.social.x}
        onChange={xChange}
        onKeyDown={enterSave}
      />
      <i className="yt svg"/>
      <label htmlFor="yt">@</label>
      <input id="yt"
        value={meta.social.yt}
        onChange={ytChange}
        onKeyDown={enterSave}
      />
    </i>

    <button id="savechanges-btn"
      onClick={save}
      disabled={!hasChanged}
    >{script().settings.auth.saveBtn}</button>

  </i>
}