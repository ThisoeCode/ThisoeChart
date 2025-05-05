import { isClient } from "./client"

const
  {DB_URI,DB_NAME,DB_USER,AUTH_GOOGLE_ID,AUTH_GOOGLE_SECRET,AUTH_SECRET,HD_API,HD_KEY,YT_API,YT_KEY,X_API,X_CLIENT_ID,X_CLIENT_SECRET,X_BEARER_TOKEN,NEXT_PUBLIC_SELF_URL,NEXT_PUBLIC_GOOGLE_CLIENT_ID,}=process.env

if(!DB_URI||!DB_NAME||!DB_USER||!AUTH_GOOGLE_ID||!AUTH_GOOGLE_SECRET||!AUTH_SECRET||!HD_API||!HD_KEY||!YT_API||!YT_KEY||!X_API||!X_CLIENT_ID||!X_CLIENT_SECRET||!X_BEARER_TOKEN||!NEXT_PUBLIC_SELF_URL||!NEXT_PUBLIC_GOOGLE_CLIENT_ID){
  throw new Error('[THISOE🩵DEBUG] Missing environment variables.')
}

export const

env = (()=>{
  if(isClient) return new Proxy({},{get: ()=>''})as Record<string,string>
  return{
    SELF_URL:NEXT_PUBLIC_SELF_URL,
  // Atlas
    DB_URI,DB_NAME,DB_USER,
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
})(),

publicEnv = {
  SELF_URL: NEXT_PUBLIC_SELF_URL,
  GOOGLE_CLIENT_ID: NEXT_PUBLIC_GOOGLE_CLIENT_ID,
}
