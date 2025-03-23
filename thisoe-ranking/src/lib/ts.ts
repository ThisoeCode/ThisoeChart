


// script.ts
import type{_SL,_ZaScript}from"@/script"
export type SupportedLang = _SL
export type ZaScript = _ZaScript
export type MidScript = { [key: string]: MidScript } | string
export type FinalScript<T> = T extends Record<SupportedLang, string>
  ? string
  : { [K in keyof T]: FinalScript<T[K]> }



// DEV TYPES
import type{NextRequest}from"next/server"
/** A preparation of the Everything Type `Thisoe`. */
export type preThisoe =
string|number|boolean|undefined|null|
Date|Error|NextRequest|React.ReactNode|
Promise<preThisoe>|preThisoe[]|(()=>preThisoe)
/** Za Everything Type */
export type Thisoe = preThisoe|{[_:string]:preThisoe}|Readonly<preThisoe>
export type Aobj = {[_:string]:Thisoe}