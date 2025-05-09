'use client'
import { store } from "@/lib/client"
import { initStore, initTheme, initLang } from "@/lib/config"
import { langAttr, mapBrowserLangToThisoeLang } from "@/lib/script"
import { useEffect, useState } from "react"
import type{ LangKey } from "@/lib/ts"
import { fontClass } from "@/lib/fonts"
import { SessionProvider } from "next-auth/react"

/** 
 * `<html><body>{children}</body></html>`
 * @example <HTML>{children}</HTML>
 */
export default function HTML({children,theme:cookieTheme}:Readonly<{children:React.ReactNode,theme:string}>){


// ======= 1. Lang Provider =======

  const[langKey,setLangKey]=useState<LangKey>(initLang)

  useEffect(()=>{
    const
      detectedLang = mapBrowserLangToThisoeLang(navigator.language),
      currentLang = store('lang').get ?? initLang
    store('lang').ifNullSet(detectedLang)
    if(!(currentLang in langAttr)) store('lang').set(initLang)

    // Handle fictional languages via CSS classes
    document.body.classList.remove('lang-ina') // Clear all language classes

    const finalLang = (store('lang').get ?? initLang) as LangKey
    if (finalLang === 'ina') {
      document.body.classList.add('lang-ina')
    }
    setLangKey(finalLang)
  }, [])


// ======= 2. Theme Provider =======

  const
    [theme,setTheme] = useState(cookieTheme ?? initStore),
    themeClass = theme === 'oh hi' ? 'dark' : '',
    trans='background-color .2s ease'

  // Set theme when FIRST load
  useEffect(()=>{
    store('theme').ifNullSet(initTheme)
    setTheme(store('theme').get ?? initTheme)
    document.body.classList.toggle('dark', store('theme').get === 'dark')
    // see layout.tsx Script#set-theme for `beforeInteractive` behaviors
    document.documentElement.style.transition = trans
    document.body.style.transition = trans
  },[])


///////

  return<html
    lang={langAttr[langKey][0]}
    className={themeClass}
  >
    <body className={fontClass}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </body>
  </html>
}