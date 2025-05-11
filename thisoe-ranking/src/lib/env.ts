import { isClient } from "./client"

const
  {DB_URI,DB_NAME,DB_USER,DB_CHART,AUTH_GOOGLE_ID,AUTH_GOOGLE_SECRET,AUTH_SECRET,HD_API,HD_KEY,YT_API,YT_KEY,X_API,X_CLIENT_ID,X_CLIENT_SECRET,X_BEARER_TOKEN,NEXT_PUBLIC_SELF_URL,}=process.env

export const

env = (()=>{
  if(!DB_URI||!DB_NAME||!DB_USER||!DB_CHART||!AUTH_GOOGLE_ID||!AUTH_GOOGLE_SECRET||!AUTH_SECRET||!HD_API||!HD_KEY||!YT_API||!YT_KEY||!X_API||!X_CLIENT_ID||!X_CLIENT_SECRET||!X_BEARER_TOKEN){
    throw new Error('[THISOE🩵DEBUG] Missing environment variables.')
  }
  if(isClient) return new Proxy({},{get: ()=>''})as Record<string,string>
  return{
    SELF_URL:NEXT_PUBLIC_SELF_URL,
  // Atlas
    DB_URI,DB_NAME,DB_USER,DB_CHART,
  // Auth.js
    AUTH_SECRET,
  // Google OAuth
    AUTH_GOOGLE_ID,AUTH_GOOGLE_SECRET,
  // Holodex API
    HD_API,HD_KEY,
  // YouTube API
    YT_API,YT_KEY,
  // X API
    X_API,X_CLIENT_ID,X_CLIENT_SECRET,X_BEARER_TOKEN,
  // ...
  }
})()
