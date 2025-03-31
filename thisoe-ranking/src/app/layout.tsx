import"./thisoe.css"
import"./svg.css"
import type{Metadata}from"next"
import HTML from "@/providers"

export const metadata:Metadata = {
  title: "Thisoe Rankings",
  description: "", /** @TODO description */
}

export default function _({children}:Readonly<{children:React.ReactNode}>){
  return<HTML>{children}</HTML>
}