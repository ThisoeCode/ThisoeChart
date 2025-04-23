import LangMenu from "@/components/langMenu"
import script from "@/lib/script"
import "./_.css"

export default function _(){
  return<i id="settings">
    <h1>{script().settings.title}</h1>
    <h2>{script().settings.lang.title}</h2>
    <LangMenu id="lang-menu"/>
  </i>
}