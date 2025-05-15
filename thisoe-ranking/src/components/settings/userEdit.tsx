'use client'
import Image from "next/image"
import script from "@/lib/script"
import { useState, useRef, useEffect } from "react"
import { modImgSize } from "@/lib/client"
import { updateUser } from "@/actions/user-meta"
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

    // MIRROR HANDLE INPUT (by ChatGPT-o4-mini)
    // refs for auto-resizing handle input
    handleRef = useRef<HTMLInputElement>(null),
    mirrorRef = useRef<HTMLSpanElement|null>(null),
    // Setup mirror span for handle input auto-width (always call this hook)
    mirrorResize=()=>{
      const input = handleRef.current
      if (!input) return
      const mirror = document.createElement("span")
      mirror.style.visibility = "hidden"
      mirror.style.position = "absolute"
      mirror.style.whiteSpace = "pre"
      mirror.style.font = getComputedStyle(input).font
      document.body.appendChild(mirror)
      mirrorRef.current = mirror

      const resize = () => {
        mirror.textContent = input.value || input.placeholder || ""
        input.style.width = mirror.offsetWidth + 2 + "px"
      }
      input.addEventListener("input", resize)
      resize()
  
      return()=>{
        input.removeEventListener("input", resize)
        document.body.removeChild(mirror)
      }
    },

    nameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setMeta({...meta, name:e.target.value})
    },
    handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const value = e.target.value
      setMeta({...meta, handle:value})
      if (mirrorRef.current && handleRef.current) {
        mirrorRef.current.textContent = value || handleRef.current.placeholder || ""
        handleRef.current.style.width = mirrorRef.current.offsetWidth + 2 + "px"
      }
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

    // components
    Social=({svg}:Readonly<{
      svg:string
    }>)=>
      <i className="wrap">
        <i className="svg-wrap">
          <i className={`${svg} svg`}/>
        </i>
        <i className="outline-wrap">
          <label htmlFor={svg}>@</label>
          <input disabled/>
        </i>
      </i>,
    Skeleton=()=>
      <i id="user-edit"className="skeleton">
        <button id="avatar-btn">
          <Image src={modImgSize(meta.avatar,270)}alt="avatar"width={270}height={270}/>
        </button>
        <input disabled/>
        <i id="handle-wrap"className="outline-wrap">
          <label htmlFor="handle">@</label>
          <input disabled/>
        </i>
        <i id='socials-wrap'>
          <Social svg="x"/>
          <Social svg="yt"/>
        </i>
        <button id="savechanges-btn"disabled>{script().settings.auth.saveing}</button>
      </i>

  useEffect(mirrorResize, [])

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
      autoComplete="nickname"
    />

    <i id="handle-wrap" className="outline-wrap">
      <label htmlFor="handle">@</label>
      <input id="handle"
        ref={handleRef}
        value={meta.handle}
        onChange={handleChange}
        onKeyDown={enterSave}
        autoComplete="off"
      />
    </i>

    <i id='socials-wrap'>
      <i className="wrap">
        <i className="svg-wrap">
          <i className="x svg"/>
        </i>
        <i className="outline-wrap">
          <label htmlFor="x">@</label>
          <input id="x"
            value={meta.social.x}
            onChange={xChange}
            onKeyDown={enterSave}
            autoComplete="off"
          />
        </i>
      </i>
      <i className="wrap">
        <i className="svg-wrap">
          <i className="yt svg"/>
        </i>
        <i className="outline-wrap">
          <label htmlFor="yt">@</label>
          <input id="yt"
            value={meta.social.yt}
            onChange={ytChange}
            onKeyDown={enterSave}
            autoComplete="off"
          />
        </i>
      </i>
    </i>

    <button id="savechanges-btn"
      onClick={save}
      style={{opacity:hasChanged?1:0}}
      disabled={!hasChanged}
    >{script().settings.auth.saveBtn}</button>

  </i>
}