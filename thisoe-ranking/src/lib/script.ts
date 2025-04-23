import type { SupportedThisoeLang, SupportedLangAttr, ZaScript, FinalScript, } from "@/lib/ts"
import { store } from "./client"
import { initLang } from "./config"
import _ from "@/script"
import { Noto } from "./fonts"

// CONFIG: Supported Langs
export type _thisoelang = 'en'|'ja'|'hans'|'hant'|'ko'|'ina'
export type _sla = 'en'|'ja'|'zh-Hans'|'zh-Hant'|'ko'
export const
  /** Supported Langs (in Thisoe lang code) */
  SL:readonly SupportedThisoeLang[] = [
    'en','ja','ko',
    'hans','hant',
    'ina',
  ] as const,
  /** Supported Langs (in html lang attr) */
  SLA:readonly SupportedLangAttr[] = [
    'en','ja','ko',
    'zh-Hans','zh-Hant',
  ] as const,



  /** ```
   * [0]: HtmlLangAttr,
   * [1]: LanguageName,
   * [2]: ThisoeLangCode,
   * [3]: Sans (style),
   * [4]: Serif (style),
   * ]
   * ``` */
  langAttr:{[Key in SupportedThisoeLang]:[SupportedLangAttr,string,string,string,string]} = {
    en:['en','English','en',Noto.sans.style.fontFamily,Noto.serif.style.fontFamily],
    ja:['ja','日本語','ja',Noto.sansJP.style.fontFamily,Noto.serifJP.style.fontFamily],
    ko:['ko','한국어','ko',Noto.sansKR.style.fontFamily,Noto.serifKR.style.fontFamily],
    hans:['zh-Hans','中文 (简体)','hans',Noto.sansSC.style.fontFamily,Noto.serifSC.style.fontFamily],
    hant:['zh-Hant','中文 (繁體)','hant',Noto.sansTC.style.fontFamily,Noto.serifTC.style.fontFamily],
    // dialects and fictional langs
    ina:['en','Ina Script (Wah)','ina','visitor-script','visitor-script'],
  }as const,

/** Convert ThisoeLangCode to html lang attr */
attrFor=(lang:SupportedThisoeLang)=>(langAttr[lang]?.[0] || store('lang').get || initLang) as SupportedLangAttr,
/** Convert html lang attr to ThisoeLangCode */
langFor=(attr:SupportedLangAttr)=>
  (Object.keys(langAttr) as SupportedThisoeLang[])
    .find(key=>langAttr[key][0]===attr) || store('lang').get || initLang,

/** Convert browser locale (e.g., 'en-US', 'ja', 'zh-CN') to `SupportedThisoeLang` _[by ChatGPT-4o]_ */
mapBrowserLangToThisoeLang = (browserLang: string): SupportedThisoeLang => {
  // Default
  if(!browserLang) return initLang

  // Config
  const
    defaultZh = 'hans',
    
    lowerBrowserLang = browserLang.toLowerCase(),
    languagePart = lowerBrowserLang.split('-')[0] // e.g., 'zh'

  // 1. Check special cases first
  if (lowerBrowserLang === 'zh-cn' || lowerBrowserLang === 'zh-sg') return 'hans'
  if (lowerBrowserLang === 'zh-tw' || lowerBrowserLang === 'zh-hk' || lowerBrowserLang === 'zh-mo') return 'hant'
  // Add other specific mappings if necessary e.g. pt-br -> pt

  // 2. Try exact match with Thisoe codes (e.g., 'en', 'ja')
  if((SL as readonly string[]).includes(lowerBrowserLang)) return lowerBrowserLang as SupportedThisoeLang

  // 3. Try exact match with HTML attributes (e.g., 'ko', 'zh-Hans')
  const directAttrMatch = (Object.keys(langAttr) as SupportedThisoeLang[]).find(
    key => langAttr[key][0].toLowerCase() === lowerBrowserLang
  )
  if(directAttrMatch) return directAttrMatch

  // 4. Try matching the primary language part with Thisoe codes (e.g., 'en' from 'en-US')
  if((SL as readonly string[]).includes(languagePart)) {
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
  } else if (prefixAttrMatch && languagePart === 'zh') return defaultZh


  // Fallback
  return initLang
}

/////// FUNC script() ///////

export default function script(
  lang: SupportedThisoeLang = store('lang').get as SupportedThisoeLang ?? initLang
): FinalScript<ZaScript> {
  const isLangObject = (obj: unknown): obj is Record<SupportedThisoeLang, string> => (
    typeof obj === "object" &&
    obj !== null &&
    SL.some(key => key in obj)
  )

  function translate<T>(obj:T): FinalScript<T> {
    if (typeof obj === "string")
      return obj as FinalScript<T>
    if (typeof obj === "object" && obj !== null) {
      if (isLangObject(obj)) {
        const langObj = obj as Record<SupportedThisoeLang, string>
        return (langObj[lang] ?? langObj["en"] ?? "") as FinalScript<T>
      }
      const result: Partial<{ [K in keyof T]:FinalScript<T[K]> }> = {}
      for (const key in obj) {
        result[key as keyof T] = translate((obj as T)[key])
      }
      return result as FinalScript<T>
    }
    return "" as FinalScript<T>
  }

  return translate(_)
}
