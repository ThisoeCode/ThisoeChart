'use client'

import { SL, langAttr } from '@/lib/script'
import { useCallback } from 'react'
import { SupportedThisoeLang as STL } from '@/lib/ts'
import { store } from '@/lib/client'
import { initLang } from '@/lib/config'
export default function LangMenu(){
  const
    currentLang = store('lang').get ?? initLang,
    setLang = (newLang: STL) => store('lang').set(newLang),

    switchLang = useCallback((newLang: STL) => {
      setLang(newLang)
    },[])

  return (
    <i className="lang-menu">
      {SL.map(lang=>(
        <button
          key={lang}
          onClick={() => switchLang(lang)}
          className={currentLang === lang ? 'active' : ''}
          aria-label={`Switch to ${langAttr[lang][1]}`}
        >
          {langAttr[lang][1]}
        </button>
      ))}
      {/* <style jsx>{`
        .lang-menu {
          display: flex
          gap: 8px
          margin: 10px 0
        }
        
        button {
          background: rgba(0, 0, 0, 0.1)
          border: none
          border-radius: 4px
          padding: 5px 10px
          cursor: pointer
          transition: all 0.2s
          font-size: 14px
        }
        
        button:hover {
          background: rgba(0, 0, 0, 0.2)
        }
        
        button.active {
          background: #333
          color: white
        }
      `}</style> */}
    </i>
  )
}
