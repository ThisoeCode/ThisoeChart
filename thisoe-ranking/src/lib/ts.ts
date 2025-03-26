



// Alist & Acard
export interface Card{
  no:string
  rank:number
  place:number
  title:string
}


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