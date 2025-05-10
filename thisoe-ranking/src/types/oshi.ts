import { Card } from"."

export type Oshi={
  /** **PRIMARY KEY** */
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
