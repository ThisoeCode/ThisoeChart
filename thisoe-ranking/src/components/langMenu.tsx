'use client'

import { SL, langAttr } from '@/lib/script'
import { useCallback } from 'react'
import { store } from '@/lib/client'
import { initLang } from '@/lib/config'
import localfont from 'next/font/local'
import type{ SupportedThisoeLang as STL } from '@/lib/ts'
import type{ NextFont } from 'next/dist/compiled/@next/font'

const visitorScript = localfont({
  src:[
    { path:'../fonts/visitor_script/VisitorScript.otf', weight:'400' },
    { path:'../fonts/visitor_script/VisitorScript-Bold.otf', weight:'700' },
    { path:'../fonts/visitor_script/VisitorScript-Italic.otf', weight:'400', style:'italic' },
    { path:'../fonts/visitor_script/VisitorScript-Bold_Italic.otf', weight:'700', style:'italic' },
  ],
  display:'swap',
})

export default function LangMenu(){
  const
    currentLang = store('lang').get ?? initLang,
    setLang = (newLang: STL) => store('lang').set(newLang),

    switchLang = useCallback((newLang: STL) => {
      setLang(newLang)
    },[]),
  
    // Special fonts
    specialFonts:Array<[STL,NextFont]> = [
      ['ina', visitorScript],
    ]

  return (
    <i id="lang-menu">
      {SL.map(lang=>(
        <button
          key={lang}
          onClick={()=>switchLang(lang)}
          className={
            currentLang === lang ? 'current-lang' : ''
          }
          style={
            specialFonts.find(([special])=>special===lang)?.[1].style
          }
          aria-label={`Switch to ${langAttr[lang][1]}`}
        >
          {langAttr[lang][1]}
        </button>
      ))}
    </i>
  )
}
