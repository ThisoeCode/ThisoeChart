import type { SupportedLang, SupportedLangAttr, ZaScript, FinalScript, } from "@/lib/ts"

// CONFIG: Supported Langs
export type _sl = 'en'|'ja'|'hans'|'hant'
export type _sla = 'en'|'ja'|'zh-Hans'|'zh-Hant'
export const
  SL:readonly SupportedLang[] = ['en','ja','hans','hant'] as const,
  SLA:readonly SupportedLangAttr[] = ['en','ja','zh-Hans','zh-Hant'] as const,

  langAttr:Record<string,string> = {
    en:'en', ja:'ja', ko:'ko', hans:'zh-Hans', hant:'zh-Hant'
  }as const,



///////** IN-PAGE SCRIPTS *///////
  _ = {
  indexPage: {
    greeting: {
      en: 'oh hi',
      hans: '你好',
      ja:'オッスーーー',
      // ko:'안뇽',
    },
    img1: {
      alt: {
        en: 'Image 1',
      },
    },
  },
  aboutPage: {
    en: 'We are blah blah',
  },
  rankpage:{
    header:{
      btns:{
        theme:{
          switch1:{
            en: 'Switch to ',
            ja: '',
            ko: '',
            hans: '',
            hant: '切換到',
          },
          dark: {
            en: 'dark',
            ja: 'ダーク',
            ko: '',
            hans: '暗色',
            hant: '暗色',
          },
          light: {
            en: 'light',
            ja: 'ライト',
            ko: '',
            hans: '亮色',
            hant: '亮色',
          },
          switch2: {
            en: ' theme',
            ja: 'テーマに',
            ko: '',
            hans: '背景',
            hant: '主題',
          },
        },
        list:{
          switch1:{
            en: 'Switch to ',
            ja: '',
            ko: '',
            hans: '',
            hant: '切換到',
          },
          compact:{
            en: 'compact',
            ja: 'コンパクト',
            ko: '',
            hans: '收起',
            hant: '緊湊',
          },
          detail:{
            en: 'detailed',
            ja: '詳細',
            ko: '',
            hans: '展开',
            hant: '詳細',
          },
          switch2: {
            en: ' list',
            ja: 'になる',
            ko: '',
            hans: '列表',
            hant: '列表',
          },
        },
      },
    },
  },
}as const,



attrFor=(lang:string)=>langAttr[lang]||'en',
langFor=(attr:string)=>Object.keys(langAttr).find(key=>langAttr[key]===attr)||'en'

export type _script = typeof _

/////// FUNC script() ///////

export default function script(lang:SupportedLang='en'): FinalScript<ZaScript> {
  const isLangObject = (obj: unknown): obj is Record<SupportedLang, string> => (
    typeof obj === "object" &&
    obj !== null &&
    SL.some(key => key in obj)
  )

  function translate<T>(obj:T): FinalScript<T> {
    if (typeof obj === "string")
      return obj as FinalScript<T>
    if (typeof obj === "object" && obj !== null) {
      if (isLangObject(obj)) {
        const langObj = obj as Record<SupportedLang, string>
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
