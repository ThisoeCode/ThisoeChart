'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { SupportedThisoeLang, SupportedLangAttr } from "@/lib/ts"
import { store } from "@/lib/client"
import { SL, SLA, langAttr } from "@/script"
import { useLang } from '@/context/LangContext'

const
  DEFAULT_LANG = "en",
  isBrowser = typeof window !== 'undefined'

/**
 * Hook to get the current HTML language attribute based on the selected Thisoe language.
 */
export function useLangAttr(): SupportedLangAttr {
  const { getAttr } = useLang()
  return getAttr()
}

/**
 * Hook to get the current Thisoe language code.
 */
export function useCurrentThisoeLang() {
  const { lang } = useLang()
  return lang
}

/**
 * Hook to get and manage the language attribute (e.g., 'zh-Hans', 'zh-Hant')
 * Used for HTML lang attribute and other language-specific attributes
 * 
 * @returns The current language attribute as a SupportedLangAttr
 */
export function useLangAttrOld() {
  const [langA, setLangA] = useState<SupportedLangAttr>(DEFAULT_LANG)
  const params = useParams()
  const urlLang = params?.lang as string || ''
  const langStore = store<SupportedLangAttr>("lang")
  
  useEffect(() => {
    // Only run in the browser
    if (!isBrowser) return

    // Use language from URL if available
    if (urlLang && SLA.includes(urlLang as SupportedLangAttr)) {
      setLangA(urlLang as SupportedLangAttr)
      langStore.set(urlLang as SupportedLangAttr)
      return
    }

    // Try to get language from store
    const storedLang = langStore.get
    if (storedLang && SLA.includes(storedLang)) {
      setLangA(storedLang)
      return
    }

    // Detect browser language
    const browserLang = navigator.language
    // Try to find a matching language attribute
    const detectedLang = SLA.find(l => browserLang.startsWith(l)) || 
                         SLA.find(l => browserLang.startsWith(l.split('-')[0])) || 
                         DEFAULT_LANG

    // Save detected lang to state & store
    setLangA(detectedLang)
    langStore.set(detectedLang)
  }, [urlLang, langStore])

  return langA
}

/**
 * Hook to get and manage the language code (e.g., 'en', 'ja', 'hans', 'hant')
 * Used for content translation and language-specific logic
 * 
 * @returns The current language code as a SupportedLang
 */
export function useLangOld() {
  const [lang, setLang] = useState<SupportedThisoeLang>(DEFAULT_LANG)
  const params = useParams()
  const urlLang = params?.lang as string || ''
  const langStore = store<SupportedThisoeLang>("lang")

  useEffect(() => {
    // Only run in the browser
    if (!isBrowser) return
    
    // Use language from URL if available and it's one of our language codes
    if (urlLang) {
      // Check if urlLang is a direct match with one of our language codes
      if (SL.includes(urlLang as SupportedThisoeLang)) {
        setLang(urlLang as SupportedThisoeLang)
        langStore.set(urlLang as SupportedThisoeLang)
        return
      }
      
      // Check if urlLang is an attribute that we need to convert to code (e.g. zh-Hans → hans)
      const codeFromAttr = SL.find(code => langAttr[code][0] === urlLang)
      if (codeFromAttr) {
        setLang(codeFromAttr)
        langStore.set(codeFromAttr)
        return
      }
    }

    // Try to get language from store
    const storedLang = langStore.get
    if (storedLang && SL.includes(storedLang)) {
      setLang(storedLang)
      return
    }

    // Detect browser language
    const browserLang = navigator.language
    // Try to find a matching language code
    const detectedLang = SL.find(l => browserLang.startsWith(l)) || 
                         SL.find(l => browserLang.startsWith(langAttr[l]?.[0] || '')) || 
                         DEFAULT_LANG

    // Save detected lang to state & store
    setLang(detectedLang)
    langStore.set(detectedLang)
  }, [urlLang, langStore])

  return lang
}