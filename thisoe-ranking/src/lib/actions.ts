'use server'
import { UserMeta } from "@/types/insu"
import { userDB } from "./_insu"
import { session } from "./auth"
import { ObjectId } from "mongodb"

export const updateUser = async(user: UserMeta)=>{
  const
    validHandle = user.handle.replace(/\s+/g, ''),
    validX = user.social.x ? /^[a-zA-Z0-9_]{1,15}$/.test(user.social.x) ? user.social.x : void'' : void'',
    validYT = user.social.yt ? /^[a-zA-Z0-9_-]{1,30}$/.test(user.social.yt) ? user.social.yt : void'' : void'',
    validAvatar = /^(https?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/.test(user.avatar) ? user.avatar : '',

    $set = {
      avatar: validAvatar,
      name: user.name,
      handle: validHandle,
      social: {
        x: validX,
        yt: validYT,
      },
    },
    id = (await session()).serverUID!,
    succeed = (await userDB.updateOne({_id:new ObjectId(id)},{$set})).matchedCount===1

  if(!succeed)
    throw new Error("[Thisoe🩵Error] `updateUser` User not found!")

  return await userDB.findOne({_id:user._id},{projection:{_id:0}})as UserMeta
}
