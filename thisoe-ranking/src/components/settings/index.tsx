'use client'
import script from "@/lib/script"
import "./_.css"
import SignToggleBtn from "@/components/settings/signtoggle-btn"
import LangMenu from "@/components/settings/langMenu"

export default function SettingsPage(){
  // TODO: show skeleton when switching lang: Ref the ranking pages' approach
  // TODO: CSS for the lang menu
  return<i id="settings">
    <header>
      <h1>{script().settings.title}</h1>
    </header>
    <h2>{script().settings.auth.title}</h2>
    <SignToggleBtn/>
    <h2>{script().settings.lang.title}</h2>
    <LangMenu id="lang-menu"/>
  </i>
}