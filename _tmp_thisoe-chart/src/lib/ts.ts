


// script.ts
import type{SL}from"@/lang"
export type SupportedLang = SL
export type ZaScript = MidScript
export type MidScript = {[key: string]: MidScript | FinalScript}
export type FinalScript = Partial<Record<SL,string>>



// DEV TYPES
import type{NextRequest}from"next/server"
/** A preparation of the Everything Type `Thisoe`. */
export type preThisoe =
string|number|boolean|undefined|null|
Date|Error|NextRequest|React.ReactNode|
Promise<preThisoe>|preThisoe[]|(()=>preThisoe)
/** The Everything Type */
export type Thisoe = preThisoe|{[_:string]:preThisoe}|Readonly<preThisoe>
export type Aobj = {[_:string]:Thisoe}