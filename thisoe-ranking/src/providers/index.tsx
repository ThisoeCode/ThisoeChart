'use client'
import { useLangAttr } from "@/hooks/useLang"

export default function HTML({children,}:
  Readonly<{
    children:React.ReactNode,
  }>
){
  return<html lang={useLangAttr()}>
    <body>{children}</body>
  </html>
}