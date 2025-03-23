import type { MidScript, ZaScript, /*FinalScript*/ } from "@/lib/ts"

/** Supported Langs */
export type SL = 'en'|'ja'|'zh-Hans'
const supportLang = ['en','ja','zh-Hans'] as const satisfies readonly SL[],
_:ZaScript={
  indexPage:{
    greeting:{
      en:'hi',
      'zh-Hans':'你好',
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
}

///////
export default function script(lang:SL){
  const translate = (_:MidScript)=>{
    const result:MidScript = {}
    for(const key in _){
      const
        val = _[key],
        validTXT = typeof val==='object' && val!==null
      if(validTXT && Object.keys(val).every(k=>supportLang.includes(k as SL)))
        result[key] = { [lang]: val[lang] ?? val.en ?? '' }
      else if(validTXT)
        result[key] = translate(val as MidScript)
    }
    return result
  }
  return translate(_) /* as FinalScript */
}