import type{ ObjectId } from "mongodb"
import { Card } from "."

export type UserMeta={
  /** Auth.js user ID */
  _id:ObjectId
  name:string
  handle:string
  social:{
    mail:string
    x?:string
    yt?:string
    // bsky?:string
  }
  avatar:string
}
// export type ClientUser=Omit<UserMeta,'_id'>

export type Chart<Cards extends Card>={
  /** Auth.js user ID */
  uid:string
  /** Chart name */
  chart:string
  ctt:Cards
}

export type Sort={
  [key:string]:number
}
