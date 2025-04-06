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
  ytid:string
  cat:string
  name:string
  avaUrl:string
  mark:string
  mama:{
    name:string
    pid?:number
    xid?:string
    otherlink?:string
  }
  /** `null` when Kojin-zei */
  org:string|null
  langNames:string[]
  sotugyou:boolean
  // optionals
  xid?:string
  twitchid?:string
  orgSub?:string
  /** `null` when no group */
  group?:string
}&Card

export type Song={
  // TODO Song type
}&Card


// script.ts
import type{_sl,_sla,_script}from"@/script"
export type SupportedLang = _sl
export type SupportedLangAttr = _sla
export type ZaScript = _script

// export type MidScript = { [key: string]: MidScript } | string

/** Revised: If all keys of an object are language keys, map to string otherwise, map recursively. */
export type FinalScript<T> =
  T extends string ? T :
  T extends object ? (keyof T extends SupportedLang ? string : { [K in keyof T]: FinalScript<T[K]> }) :
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

// T3 tryCatch
type Success<T> = {
  data:T
  error:null
}
type Failure<E> = {
  data:null
  error:E
}
type Result<T, E = Error> = Success<T> | Failure<E>
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