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
/**
 * @example
 * className,id,title,style
 * className={className}id={id}title={title}style={style}
 */
export type cits = {
  className?:string
  id?:string
  title?:string
  style?:string
}



export interface Card{
  _no:string
  _rank:number
  _place:number
  _title:string
}



// AUTH
export interface OneTapOptions{
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
  prompt_parent_id?: string
}



// script.ts
import type{_thisoelang,_sla, langAttr}from"@/lib/script"
import SCRIPT from "@/script"
export type ZaScript = typeof SCRIPT
export type SupportedThisoeLang = _thisoelang
export type SupportedLangAttr = _sla

export type LangKey = keyof typeof langAttr

export type LangNames = keyof typeof SCRIPT.langs

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