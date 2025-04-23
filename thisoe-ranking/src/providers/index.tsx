'use client'
import { store } from "@/lib/client"
import { initTheme, initLang } from "@/lib/config"
import { langAttr, mapBrowserLangToThisoeLang } from "@/lib/script"
import { useEffect, useState } from "react"
import type{ LangKey } from "@/lib/ts"

/** 
 * `<html><body>{children}</body></html>`
 * @example <HTML>{children}</HTML>
 */
export default function HTML({children,}:Readonly<{children:React.ReactNode,}>){
  const
    [theme,setTheme] = useState(store('theme').get ?? initTheme),
    bodyClassName = theme === 'dark' ? 'dark' : undefined,
    langKey: LangKey = store('lang').get as LangKey ?? initLang

  // Set lang when first load
  useEffect(()=>{
    // TODO: DELETE
    console.log('[TEST] navigator.language = ',navigator.language)
    const
      detectedLang = mapBrowserLangToThisoeLang(navigator.language),
      currentLang = store('lang').get ?? initLang
    store('lang').ifNullSet(detectedLang)
    if(!(currentLang in langAttr)) store('lang').set(initLang)
  }, [])

  // Set theme when first load
  useEffect(()=>{
    store('theme').ifNullSet(initTheme)
    setTheme(store('theme').get ?? initTheme)
    document.body.classList.toggle('dark', store('theme').get === 'dark')
  },[])

  return<html lang={langAttr[langKey][0]}>
    <body className={bodyClassName}>
      {children}
    </body>
  </html>
}