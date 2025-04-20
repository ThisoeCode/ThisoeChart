'use client'
import { store } from "@/lib/client"
import { initTheme, initLang } from "@/lib/config"
import { langAttr, mapBrowserLangToThisoeLang } from "@/lib/script"
import { useEffect } from "react"
import type{ LangKey } from "@/lib/ts"

/** 
 * `<html><body>{children}</body></html>`
 * @example <HTML>{children}</HTML>
 */
export default function HTML({children,}:Readonly<{children:React.ReactNode,}>){
  const
    theme = store('theme').get ?? initTheme,
    bodyClassName = theme === 'dark' ? 'dark' : undefined,
    langKey: LangKey = store('lang').get as LangKey ?? initLang

  // Set lang when first load
  useEffect(() => {
    store('lang').ifNullSet(mapBrowserLangToThisoeLang(navigator.language))
    const currentLang = store('lang').get ?? initLang
    if(!(currentLang in langAttr)){
      store('lang').set(initLang)
    }
  }, [])

  return<html lang={langAttr[langKey][0]}>
    <body className={bodyClassName}>
      {children}
    </body>
  </html>
}