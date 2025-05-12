'use client'
import script from "@/lib/script"
import "./_.css"
import SignToggleBtn from "@/components/settings/signtoggle-btn"
import LangMenu from "@/components/settings/langMenu"
import UserEdit from "@/components/settings/userEdit"
import type{ UserMeta } from "@/types/insu"

export default function SettingsPage({user}:Readonly<{
  user:UserMeta|null
}>){
  // TODO: show skeleton when switching lang: Ref the ranking pages' approach
  // TODO: CSS for the lang menu
  return<i id="settings">
    <header>
      <h1>{script().settings.title}</h1>
    </header>

    <i>
      <h2>{script().settings.auth.title}</h2>
      {user&&<UserEdit user={user}/>}
      <SignToggleBtn/>
    </i><hr/>

    <i>
      <h2>{script().settings.lang.title}</h2>
      <LangMenu id="lang-menu"/>
    </i>
  </i>
}