'use client'

import { langAttr, SL } from '@/script'
import { useCallback } from 'react'
import { SupportedThisoeLang } from '@/lib/ts'
import { useLang } from '@/context/LangContext'

const languageNames: Record<SupportedThisoeLang, string> = {
  'en': langAttr.en[1],
  'ja': langAttr.ja[1],
  'hans': langAttr.hans[1],
  'hant': langAttr.hant[1],
  'ko': langAttr.ko[1],
  'ina': langAttr.ina[1],
}

export default function LangMenu() {
  const { lang: currentLang, setLang } = useLang();

  const switchLanguage = useCallback((newLang: SupportedThisoeLang) => {
    setLang(newLang);
  }, [setLang]);

  return (
    <div className="language-switcher">
      {SL.map(lang => (
        <button
          key={lang}
          onClick={() => switchLanguage(lang)}
          className={currentLang === lang ? 'active' : ''}
          aria-label={`Switch to ${languageNames[lang]}`}
          title={languageNames[lang]}
        >
          {lang.toUpperCase()}
        </button>
      ))}
      
      <style jsx>{`
        .language-switcher {
          display: flex;
          gap: 8px;
          margin: 10px 0;
        }
        
        button {
          background: rgba(0, 0, 0, 0.1);
          border: none;
          border-radius: 4px;
          padding: 5px 10px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }
        
        button:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        
        button.active {
          background: #333;
          color: white;
        }
      `}</style>
    </div>
  )
}
