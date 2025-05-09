import Google from "next-auth/providers/google"
import{MongoDBAdapter}from"@auth/mongodb-adapter"
import{env}from"./env"
import{con}from"./_insu"
import NextAuth from "next-auth"
import { NextAuthConfig } from "next-auth"

export const

NextConf={
  providers:[
    Google,
  ],
  adapter:MongoDBAdapter(con,{
    databaseName:env.DB_NAME,
  }),
  session:{strategy:"jwt"},
  // callbacks:{
  //   async signIn({user}){
  //     return !user?true:true
  //   },
  // },
}satisfies NextAuthConfig,



{handlers,auth,signIn,signOut}=NextAuth(NextConf)