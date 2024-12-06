import{Db,MongoClient,ServerApiVersion}from"mongodb"

const{DB_HOST,DB_NAME,DB_CLCT,DB_USER}=process.env!
if(!DB_HOST||!DB_NAME||!DB_CLCT||!DB_USER){
  throw new Error('[THISOE🩵DEBUG] Missing environment variables.')
}

export const con = new MongoClient(DB_HOST,{serverApi:{version:ServerApiVersion.v1,strict:true,deprecationErrors:true}})

let
  /** Cached MongoClient */
  client:MongoClient|null=null,
  /** Cached DB */
  db:Db|null=null
export default async function insu(){
  if(client&&db){
    return{client,db}
  }
  await con.connect()
  const cdb = con.db(DB_NAME)
  client = con
  db = cdb
  return{client,db}
}

// Export COLLECTIONs
export const DB = async(col:string)=>{
  const {db} = await insu()
  return db.collection(col)
}
export const mainDB = await DB(DB_CLCT)
export const userDB = await DB(DB_USER)