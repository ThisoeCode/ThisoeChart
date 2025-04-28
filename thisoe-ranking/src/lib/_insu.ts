import{Db,MongoClient,ServerApiVersion}from"mongodb"
import{env}from"./env"

export const con = new MongoClient(env.DB_URI,{serverApi:{version:ServerApiVersion.v1,strict:true,deprecationErrors:true}})

// Create async connection
let
  CMC:null|MongoClient = null,
  CDB:null|Db = null
export default async function insu(){
  if(CMC&&CDB){
    return{client:CMC,db:CDB}
  }
  await con.connect()
  const
    db = con.db(env.DB_NAME)
    CMC = con
    CDB = db
  return{client:CMC,db:CDB}
}

// Export COLLECTIONs
const DB = async(col:string)=>{
  const {db} = await insu()
  return db.collection(col)
}
export const userDB = await DB(env.DB_USER)