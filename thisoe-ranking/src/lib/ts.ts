/**
 * @example
 * className,id,title
 * className={className}id={id}title={title}
 */
export type cit = {
  className?:string
  id?:string
  title?:string
}



// Alist & Acard
export interface Card{
  _no:string
  _rank:number
  _place:number
  _title:string
}

export type Oshi={
  ytid:`UC${string}`
  ythandle?:`@${string}`
  cat:string
  name:string
  avaUrl:string
  mark:string
  /** `null` when Kojin-zei */
  org:string|null
  otherLangNames:string[]
  sotugyou:boolean|"Affiliated"

  // optionals
  xid?:`@${string}`
  twitchid?:string
  orgSub?:string
  group?:string
  /** Designer info */
  mama?:{
    /** Official name → Pixiv name → X name */
    name:string
    /** Pixiv */
    pid?:number
    /** X */
    xid?:`@${string}`
    /** Instagram */
    iid?:string
    /** Illustrator's PERSONAL domain only */
    website?:string
  }
  ouenColor?:string|{
    normal?:string
    light?:string
    dark?:string
  }
}&Card

export type Song={
  // TODO Song type
}&Card


// script.ts
import type{_thisoelang,_sla, langAttr}from"@/lib/script"
import SCRIPT from "@/script"
export type ZaScript = typeof SCRIPT
export type SupportedThisoeLang = _thisoelang
export type SupportedLangAttr = _sla

export type LangKey = keyof typeof langAttr

// export type MidScript = { [key: string]: MidScript }|string

/** Revised: If all keys of an object are language keys, map to string otherwise, map recursively. */
export type FinalScript<T> =
  T extends string ? T :
  T extends object ? (keyof T extends SupportedThisoeLang ? string : { [K in keyof T]: FinalScript<T[K]> }) :
  T



// DEV TYPES
import type{NextRequest}from"next/server"
/** A preparation of the Everything Type `Thisoe`. */
export type preThisoe =
string|number|boolean|undefined|null|
Date|Error|NextRequest|React.ReactNode|
Promise<preThisoe>|preThisoe[]|(()=>preThisoe)|{[_:string]:Thisoe}
/** Za Everything Type */
export type Thisoe = preThisoe|{[_:string]:preThisoe}|Readonly<preThisoe>
export type Aobj = {[_:string]:Thisoe}

// next/font
type weights1 = "100"|weights2
type weights2 = |"200"|"300"|"400"|"500"|"600"|"700"|"800"|"900"
export type Subsets = ("latin"|"cyrillic"|"latin-ext"|"vietnamese")[]
export type Weight1 = weights1|"variable"|weights1[]|undefined
export type Weight = weights2|"variable"|weights2[]|undefined


// T3 tryCatch
type Success<T> = {
  data:T
  error:null
}
type Failure<E> = {
  data:null
  error:E
}
type Result<T, E = Error> = Success<T>|Failure<E>
// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise:Promise<T>,
):Promise<Result<T, E>> {
  try{
    const data = await promise
    return { data, error: null }
  } catch(error) {
    return { data: null, error: error as E }
  }
}
// E.G.
  // const{data:someData,error:someError} = await tryCatch(someFunc)
  // if(someError)retrun{error:"unable to process"}
  //
  // const{data:moreData,error:moreError} = await tryCatch(moreFunc)
  // if(moreError)retrun{error:"unable to process"}
  //
  // someData + moreData;