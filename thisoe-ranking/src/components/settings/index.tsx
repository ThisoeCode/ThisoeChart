'use client'
import script from "@/lib/script"
import "./_.css"
import SignToggleBtn from "@/components/settings/signtoggle-btn"
import LangMenu from "@/components/settings/langMenu"
import UserEdit from "@/components/settings/userEdit"
import type{ UserMeta } from "@/types/insu"
import ThemeBtn from "../btns/theme"
import MountProvider, { MountContext } from '@/contexts/mount'
import { useContext, useEffect } from "react"
import SettingsSkeleton from "../skeletons/settings"

type Props = Readonly<{
  user:UserMeta|null
}>

export default function SettingsPage(attr:Props){
  return<MountProvider>
    <Settingspage{...attr}/>
  </MountProvider>
}

export function Settingspage({user}:Props){
  const{mounted,setMounted} = useContext(MountContext)

  useEffect(()=>setMounted(true),[setMounted])

  if(!mounted)
    return<SettingsSkeleton/>

  return<i id="settings">
    <header>
      <h1>{script().settings.title}</h1>
    </header>

    <i>
      {user&&<UserEdit user={user}/>}
      <SignToggleBtn/>
    </i><hr/>

    <i>
      <h2>{script().settings.lang.title}</h2>
      <LangMenu id="lang-menu"/>
    </i><hr/>

    <i id="theme-wrap">
      <h2>{script().settings.theme.title}</h2>
      <ThemeBtn/>
    </i>
  </i>
}