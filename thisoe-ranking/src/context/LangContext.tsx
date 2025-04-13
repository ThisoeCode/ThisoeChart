// GEMINI2.5 GENERATED & REFINED

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { store } from '@/lib/client'
import { SupportedThisoeLang, SupportedLangAttr } from '@/lib/ts'
import { SL, langAttr } from '@/script' // Removed SLA and langForAttr as they are implicitly handled
import { NotoClass } from "@/lib/fonts" // Import NotoClass

// Refined helper to map browser locale (e.g., 'en-US', 'ja', 'zh-CN') to SupportedThisoeLang
const mapBrowserLangToThisoeLang = (browserLang: string): SupportedThisoeLang => {
  if (!browserLang) return 'en' // Default

  const lowerBrowserLang = browserLang.toLowerCase()
  const languagePart = lowerBrowserLang.split('-')[0] // e.g., 'zh'

  // 1. Check special cases first (more specific)
  if (lowerBrowserLang === 'zh-cn' || lowerBrowserLang === 'zh-sg') return 'hans'
  if (lowerBrowserLang === 'zh-tw' || lowerBrowserLang === 'zh-hk' || lowerBrowserLang === 'zh-mo') return 'hant'
  // Add other specific mappings if necessary e.g. pt-br -> pt

  // 2. Try exact match with Thisoe codes (e.g., 'en', 'ja')
  if ((SL as readonly string[]).includes(lowerBrowserLang)) {
    return lowerBrowserLang as SupportedThisoeLang
  }

  // 3. Try exact match with HTML attributes (e.g., 'ko', 'zh-Hans')
  const directAttrMatch = (Object.keys(langAttr) as SupportedThisoeLang[]).find(
    key => langAttr[key][0].toLowerCase() === lowerBrowserLang
  )
  if (directAttrMatch) return directAttrMatch

  // 4. Try matching the primary language part with Thisoe codes (e.g., 'en' from 'en-US')
  if ((SL as readonly string[]).includes(languagePart)) {
    // Be careful here: 'zh' could map to 'hans' or 'hant'. Handled by specific cases above.
    // If 'zh' wasn't handled above, decide a default (e.g., 'hans') or fallback to 'en'.
    // For now, assume specific cases cover variants like Chinese.
    if (languagePart !== 'zh') { // Avoid defaulting 'zh' without region
      return languagePart as SupportedThisoeLang
    }
  }

  // 5. Try matching the primary language part with HTML attributes (e.g., 'en' from 'en-GB' matches 'en' attr)
  const prefixAttrMatch = (Object.keys(langAttr) as SupportedThisoeLang[]).find(key => {
    const attrPrefix = langAttr[key][0].split('-')[0].toLowerCase()
    return attrPrefix === languagePart
  })
  // Again, be careful with 'zh'
  if (prefixAttrMatch && languagePart !== 'zh') {
    return prefixAttrMatch
  } else if (prefixAttrMatch && languagePart === 'zh') {
    // If we reach here and it's 'zh', default to 'hans' (or 'hant' based on preference)
    return 'hans'
  }

  // Fallback
  return 'en'
}


interface LangContextType {
  lang: SupportedThisoeLang
  setLang: (lang: SupportedThisoeLang) => void
  getAttr: () => SupportedLangAttr
}

const LangContext = createContext<LangContextType | undefined>(undefined)

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<SupportedThisoeLang>('en') // Default to 'en' initially

  useEffect(() => {
    // This effect runs only on the client
    const storedLang = store<SupportedThisoeLang>('lang').get
    let initialLang: SupportedThisoeLang

    if (storedLang && (SL as readonly SupportedThisoeLang[]).includes(storedLang)) {
      initialLang = storedLang
    } else {
      const browserLang = navigator.language
      initialLang = mapBrowserLangToThisoeLang(browserLang)
      store('lang').set(initialLang) // Store detected/default lang
    }
    setLangState(initialLang)
  }, []) // Empty dependency array ensures this runs once on mount

  const setLang = useCallback((newLang: SupportedThisoeLang) => {
    if ((SL as readonly SupportedThisoeLang[]).includes(newLang)) {
      store('lang').set(newLang)
      setLangState(newLang)
      // Direct DOM manipulation for immediate feedback (will be reconciled by React later)
      const newAttr = langAttr[newLang]?.[0] || 'en'
      document.documentElement.lang = newAttr
      document.documentElement.className = NotoClass // Ensure base class
      const langClassName = langAttr[newLang]?.[2]
      // Clean up old lang classes first
      Object.values(langAttr).forEach(attr => {
          if (attr[2] && attr[2] !== langClassName) {
              document.documentElement.classList.remove(attr[2])
          }
      })
      if (langClassName) {
          document.documentElement.classList.add(langClassName)
      }
    }
  }, [])

  const getAttr = useCallback((): SupportedLangAttr => {
      return langAttr[lang]?.[0] || 'en'
  }, [lang])

  // Effect to update <html> attributes whenever lang changes
  useEffect(() => {
      const currentAttr = getAttr()
      const langClassName = langAttr[lang]?.[2]

      document.documentElement.lang = currentAttr
      document.documentElement.className = NotoClass // Set base class

      // Clean up potential old language classes before adding the new one
      Object.values(langAttr).forEach(attr => {
          if (attr[2] && attr[2] !== langClassName) {
              document.documentElement.classList.remove(attr[2])
          }
      })

      if (langClassName) {
          document.documentElement.classList.add(langClassName)
      }

      // No cleanup needed for base NotoClass as it should persist
      // Cleanup for the specific language class will happen on next update or unmount
      return () => {
          // Optional: cleanup specific lang class on component unmount, though usually not necessary here
          // if (langClassName) document.documentElement.classList.remove(langClassName);
      }
  }, [lang, getAttr]) // Rerun when lang or its corresponding attribute changes

  return (
    <LangContext.Provider value={{ lang, setLang, getAttr }}>
      {/* Render children within a body tag, assuming LangProvider wraps the entire page content */}
      {children}
    </LangContext.Provider>
  )
}

export const useLang = (): LangContextType => {
  const context = useContext(LangContext)
  if (context === undefined) {
    throw new Error('useLang must be used within a LangProvider')
  }
  return context
}

// Export the helper mapping function if needed elsewhere
export { mapBrowserLangToThisoeLang }
