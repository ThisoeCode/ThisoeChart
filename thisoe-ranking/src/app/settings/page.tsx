import LangMenu from "@/components/langMenu"
import script from "@/lib/script"
import "./_.css"

export default function _(){
  return<i>
    <h1>{script().settings.title}</h1>
    <h2>{script().settings.lang.title}</h2>
    <LangMenu/>
  </i>
}