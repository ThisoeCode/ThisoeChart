'use client'
import { SL, langAttr, attrFor } from '@/lib/script'
import { store } from '@/lib/client'
import { initLang } from '@/lib/config'
import type{ cit, SupportedThisoeLang as STL } from '@/lib/ts'

export default function LangMenu({id,className,title,listOnly}:Readonly<{
  listOnly?:boolean
}&cit>){
  const
    currentLang = store('lang').get ?? initLang,
    setLang = (newLang: STL) => store('lang').set(newLang),

    switchLang = (newLang: STL)=>{
      setLang(newLang)
      document.documentElement.lang = attrFor(newLang)

      // Handle fictional languages by adding/removing CSS classes
      // First remove all language classes
      document.body.classList.remove('lang-ina') // Add more as needed
      // Then add the appropriate class if it's a fictional language
      if (newLang === 'ina') {
        document.body.classList.add('lang-ina')
      }
      // Add more fictional languages as needed with similar if statements

      window.location.reload()
    },
  
    // Special fonts styling overrides
    specialLangs = ['ina'],

    list = SL.map(lang=>(
      <button
        key={lang}
        onClick={()=>switchLang(lang)}
        className={
          currentLang === lang ? 'current-lang' : ''
        }
        style={{fontFamily:
          specialLangs.includes(lang)
            ? 'var(--visitor-script)'
            : langAttr[lang][3].style.fontFamily
        }}
        aria-label={`Switch to ${langAttr[lang][1]}`}
      >
        {langAttr[lang][1]}
      </button>
    ))

  if(listOnly)return<>{list}</>
  return<i id={id}className={className}title={title}>
    {list}
  </i>
}
