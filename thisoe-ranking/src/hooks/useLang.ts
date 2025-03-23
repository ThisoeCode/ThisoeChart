import { useEffect, useState } from "react"
import type { SupportedLang, SupportedLangAttr } from "@/lib/ts"
import { SL, SLA } from "@/script"

const DEFAULT_LANG = "en"


export function useLangAttr(){
  const [langA, setLangA] = useState<SupportedLangAttr>(DEFAULT_LANG)

  useEffect(()=>{
    const storedLang = localStorage.getItem("lang") as SupportedLangAttr | null
    if(storedLang)
      return setLangA(storedLang)

    // Detect browser lang
    /** @TODO Test `zh-Hans`. Discord with wharr ding */
    const browserLang = navigator.language.slice(0, 2)
    const detectedLang = SLA.find(l => l.startsWith(browserLang)) || DEFAULT_LANG

    // Save detected lang to state & localStorage
    setLangA(detectedLang)
    localStorage.setItem("lang", detectedLang)
  },[])

  return langA
}


export function useLang(){
  const [lang, setLang] = useState<SupportedLang>(DEFAULT_LANG)

  useEffect(()=>{
    const storedLang = localStorage.getItem("lang") as SupportedLang | null
    if(storedLang)
      return setLang(storedLang)

    // Detect browser lang
    const browserLang = navigator.language.slice(0, 2)
    const detectedLang = SL.find(l => l.startsWith(browserLang)) || DEFAULT_LANG

    // Save detected lang to state & localStorage
    setLang(detectedLang)
    localStorage.setItem("lang", detectedLang)
  },[])

  return lang
}