import { Card } from"."

export type Song={
  /** **PRIMARY KEY** */
  ytid:string
  name:string
  /** is original */
  isOri:boolean

  // optionals
  artists?:{
    ori:{
      composer?:string
      arranger?:string
      vocal?:string
      /** MV illustrators or modelers */
      ESTC?:string
    }
    cover?:{
      mixArranger?:string
      vocal?:string
      /** MV illustrators or modelers */
      ESTC?:string
    }
  }
  holodex?:{
    // /** @todo Contact holodex staff for the `songs` obj */
    // songs?:{
    //   ids:string[]
    //   art?:string
    // }
    channel?:{
      id:string
      english_name?:string
      photo?:string
    }
  }
}&Card