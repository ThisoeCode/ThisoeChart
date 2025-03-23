"use client"

// 1. Auth.js Layout
import{SessionProvider}from"next-auth/react"
/** Auth Provider */
export function AP({children}:{children:React.ReactNode}){
  return<SessionProvider>{children}</SessionProvider>
}