import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import{Provider}from"next-auth/providers"
import{MongoDBAdapter}from"@auth/mongodb-adapter"
import{con}from"./insu"
// import{suDb}from"./server"

const providers:Provider[]=[
  Google,
]

export const providerMap = providers.map((provider)=>{
  if(typeof provider==="function"){
    const providerData = provider()
    return{id:providerData.id,name:providerData.name}
  }
  return{id:provider.id,name:provider.name}
}).filter((provider)=>provider.id!=="credentials")

export const{handlers,auth,signIn,signOut}=NextAuth({
  providers,
  adapter:MongoDBAdapter(con,{
    databaseName:process.env.DB_AUTH,
  }),
  session:{strategy:"jwt"},
  // callbacks:{
  //   async signIn({/*user*/}){
      
  //     return true
  //   },
  // },
})