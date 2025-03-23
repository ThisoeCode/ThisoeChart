import"./thisoe.css"
import type{Metadata}from"next"

export const metadata:Metadata = {
  title: "Thisoe Rankings",
  description: "", /** @TODO description */
}

export default function _({children,}:Readonly<{children:React.ReactNode,}>){
  return<html lang="en">
    <body>
      {children}
    </body>
  </html>
}