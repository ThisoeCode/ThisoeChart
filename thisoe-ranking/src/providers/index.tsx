'use client'
import { LangProvider } from "@/context/LangContext"
import { ReactNode } from "react"

export default function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <LangProvider>
      {children}
    </LangProvider>
  )
}