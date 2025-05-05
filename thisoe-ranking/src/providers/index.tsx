'use client'
import { store } from "@/lib/client"
import { initTheme, initLang } from "@/lib/config"
import { langAttr, mapBrowserLangToThisoeLang } from "@/lib/script"
import { useEffect, useState } from "react"
import type{ LangKey } from "@/lib/ts"
import { Noto, visitorScript } from "@/lib/fonts"


/** 
 * `<html><body>{children}</body></html>`
 * @example <HTML>{children}</HTML>
 */
export default function HTML({children,}:Readonly<{children:React.ReactNode,}>){
  const
    [theme,setTheme] = useState(store('theme').get ?? initTheme),
    [langKey, setLangKey] = useState<LangKey>(initLang),
    bodyClassName = theme === 'oh hi' ? 'dark' : ''

  // Set lang when FIRST load
  useEffect(()=>{
    const
      detectedLang = mapBrowserLangToThisoeLang(navigator.language),
      currentLang = store('lang').get ?? initLang
    store('lang').ifNullSet(detectedLang)
    if(!(currentLang in langAttr)) store('lang').set(initLang)

    // Handle fictional languages via CSS classes
    document.body.classList.remove('lang-ina') // Clear all language classes

    // Determine the final language for HTML and CSS
    const finalLang = (store('lang').get ?? initLang) as LangKey
    if (finalLang === 'ina') {
      document.body.classList.add('lang-ina')
    }
    // Update langKey state to trigger re-render with correct html lang attribute
    setLangKey(finalLang)
  }, [])

  // Set theme when FIRST load
  useEffect(()=>{
    store('theme').ifNullSet(initTheme)
    setTheme(store('theme').get ?? initTheme)
    document.body.classList.toggle('dark', store('theme').get === 'dark')
  },[])

  return<html lang={langAttr[langKey][0]} className={`
    ${Noto.sans.variable} ${Noto.sansJP.variable} ${Noto.sansKR.variable} ${Noto.sansSC.variable} ${Noto.sansTC.variable}
    ${Noto.serif.variable} ${Noto.serifJP.variable} ${Noto.serifKR.variable} ${Noto.serifSC.variable} ${Noto.serifTC.variable}
    ${visitorScript.variable}
  `}>
    <body className={bodyClassName}>
      {children}
    </body>
  </html>
}