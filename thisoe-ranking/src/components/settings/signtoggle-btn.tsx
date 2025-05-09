'use client'
import script from "@/lib/script"
import { signIn, signOut, useSession } from "next-auth/react"

export default function SignToggleBtn(){
  const
    { data: session } = useSession()

  if(session)
    return<button onClick={()=>signOut()}>
      <i className="white signout svg"/>{script().settings.auth.signout}
    </button>

  return<button onClick={()=>signIn('google')}>
    <i className="white signin svg"/>{script().settings.auth.signin}
  </button>
}
