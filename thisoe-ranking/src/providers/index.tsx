'use client'
import { useLangAttr } from "@/hooks/useLang"
import { store } from "@/lib/client"

export default function HTML({children,}:
  Readonly<{
    children:React.ReactNode,
  }>
){
  return<html lang={useLangAttr()}>
    <body className={store('theme').get==='dark'?'dark':undefined}>{children}</body>
  </html>
}