import type { SupportedThisoeLang, SupportedLangAttr, ZaScript, FinalScript, } from "@/lib/ts"
import { store } from "./lib/client"

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

  /** `ThisoeLang: [HtmlLangAttr, Description, htmlClassName]` */
  langAttr:{[Key in SupportedThisoeLang]:[SupportedLangAttr,string,string?]} = {
    en:['en','English',void''],
    ja:['ja','日本語',void''],
    ko:['ko','한국어',void''],
    hans:['zh-Hans','简体中文',void''],
    hant:['zh-Hant','繁體中文',void''],
    // Fictional langs
    ina:['en','Ina Script','ina'],
  }as const,


///////** IN-PAGE SCRIPTS *///////
  _ = {
  indexPage: {
    greetingTest: {
      en:'[en] oh hi',
      hans:'[hans] 来辣',
      hant:'[hant] 歡迎',
      ja:'[ja] オッスーーー',
      ko:'[ko] 안뇽',
      ina:'Salvete fair visitor',
    },
  },
  oshi: {
    about:{
      en: 'We are blah blah',
    },
  },
}as const,


/** Convert ThisoeLangCode to html lang attr */
attrFor=(lang:SupportedThisoeLang)=>(langAttr[lang]?.[0] || store('lang').get || 'en') as SupportedLangAttr,
/** Convert html lang attr to ThisoeLangCode */
langFor=(attr:SupportedLangAttr)=>(Object.keys(langAttr) as SupportedThisoeLang[]).find(key=>langAttr[key][0]===attr)||store('lang').get||'en'

export type _script = typeof _



/////// FUNC script() ///////

export default function script(lang:SupportedThisoeLang='en'): FinalScript<ZaScript> {
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
