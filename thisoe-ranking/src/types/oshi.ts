import { Card } from"."

export type Oshi={
  /** **PRIMARY KEY** */
  ytid:`UC${string}`
  ythandle?:`@${string}`
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
  ouenColor?:string|{
    normal?:string
    light?:string
    dark?:string
  }
}&Card
