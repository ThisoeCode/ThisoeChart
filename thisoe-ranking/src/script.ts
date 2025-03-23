import type { SupportedLang, ZaScript, MidScript, FinalScript, } from "@/lib/ts"

/** Supported Langs */
export type _SL = 'en'|'ja'|'zhHans'

const _={
  indexPage:{
    greeting:{
      en:'hi',
      zhHans:'你好',
    },
    img1:{
      alt:{
        en:'Image 1',
      },
    },
  },
  aboutPage:{
    en:'We are blah blah',
  },
} as const satisfies Record<string, MidScript>
export type _ZaScript = typeof _

///////
export default function script(lang:SupportedLang): FinalScript<ZaScript> {
  function translate(obj: MidScript): MidScript {
    if (typeof obj === "string") return obj

    if (typeof obj === "object") {
      if (lang in obj)
        return (obj as Record<SupportedLang, string>)[lang] || (obj as Record<SupportedLang, string>)['en'] || ""
      const result: Record<string, MidScript> = {}
      for (const key in obj){
        result[key] = translate(obj[key])
      }
      return result
    }
    return ""
  }

  return translate(_)
}
