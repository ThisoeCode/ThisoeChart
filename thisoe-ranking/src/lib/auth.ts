import Google from "next-auth/providers/google"
import{MongoDBAdapter}from"@auth/mongodb-adapter"
import{env}from"./env"
import{con, userDB}from"./_insu"
import NextAuth from "next-auth"
import { ObjectId } from "mongodb"
import type{ NextAuthConfig, User } from "next-auth"
import type{ UserMeta } from "@/types/insu"

const

thisoeSignUp=async(user:User)=>{
  if(!user.email)throw new Error("[THISOE🩵DEBUG] `thisoeSignUp`: User email does not exist.")

  const
    _id=new ObjectId(user.id),
    userExists=!!(await userDB.findOne({_id}))

  if(!userExists){
    const
      randHandle=()=>'U_'+Math.random().toString(36).substring(2,12),
      finalHandle=await(async()=>{
        let handle
        do{handle=randHandle()}
        while(await userDB.findOne({handle}))
        return handle
      })(),
      aNewMeta:UserMeta={
        _id,
        name:user.name||'',
        handle:finalHandle,
        social:{mail:user.email},
        avatar:user.image||'https://thisoe.dev/ico.ico',
      }

    return !!(await userDB.insertOne(aNewMeta))
  }
  return userExists
},



NextConf={
  providers:[
    Google,
  ],
  adapter:MongoDBAdapter(con,{
    databaseName:env.DB_NAME,
  }),
  session:{strategy:"jwt"},
  callbacks:{
    async signIn({user}){
      return await thisoeSignUp(user)
    },
    session({session, token}){
      if (session.user)
        session.user.id = token.sub as string
      return session
    },
  },
}satisfies NextAuthConfig



export const

{handlers,auth,signIn,signOut} = NextAuth(NextConf),

session = async()=>{
  const
    serverSession = await auth(),
    {id: serverUID, ...clientUser} = serverSession?.user || {id: null}
  return { serverSession, serverUID, clientUser }
},

/** @returns `null` if not authed (visitor) */
userMeta = async()=>{
  const
    { serverUID } = await session()
  if(!serverUID) return null
  return await userDB.findOne(
    {_id: new ObjectId(serverUID)},
    {projection: {_id: 0}}
  ) as UserMeta
}
