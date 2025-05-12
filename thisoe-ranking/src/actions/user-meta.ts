'use server'
import { UserMeta } from "@/types/insu"
import { userDB } from "@/lib/_insu"
import { session } from "@/lib/auth"
import { ObjectId } from "mongodb"

export const

updateUser = async(user: UserMeta)=>{
  const
    validHandle = user.handle.replace(/\s+/g, ''),
    validX = user.social.x ? /^[a-zA-Z0-9_]{1,15}$/.test(user.social.x) ? user.social.x : void'' : void'',
    validYT = user.social.yt ? /^[a-zA-Z0-9_-]{1,30}$/.test(user.social.yt) ? user.social.yt : void'' : void'',
    validAvatar = /^(https?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/.test(user.avatar) ? user.avatar : '',
    id = (await session()).serverUID!,

    // Check if handle already exists for another user
    handleExist = await userDB.findOne({handle: validHandle, _id: {$ne: new ObjectId(id)}})
  if(handleExist) {
    throw new Error("[Thisoe🩵Error] Handle already taken")
  }

  const
    $set = {
      avatar: validAvatar,
      name: user.name,
      handle: validHandle,
      social: {
        x: validX,
        yt: validYT,
      },
    },
    succeed = (await userDB.updateOne({_id:new ObjectId(id)},{$set})).matchedCount===1

  if(!succeed)
    throw new Error("[Thisoe🩵Error] `updateUser` User not found!")

  return await userDB.findOne({_id:user._id},{projection:{_id:0}})as UserMeta
}