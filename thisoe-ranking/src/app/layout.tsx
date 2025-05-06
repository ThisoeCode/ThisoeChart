import "./thisoe.css"
import "./svg.css"
import type { Metadata } from "next"
import HTML from "@/providers"
import { selfurl } from "@/lib"
import Script from "next/script"
import { initStore } from "@/lib/config"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: "Thisoe Rankings",
  description: "", /** @TODO descriptions on all pages */
  alternates: {
    canonical: `${selfurl}/`,
  },
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  // SSR the theme
  const cookieTheme = (await cookies()).get('theme')?.value ?? initStore

  return (
    <HTML theme={cookieTheme}>
    {/* 

      THIS IS STUPID AF BUT IMMA KEEP THIS

    <Script id="set-theme"strategy="beforeInteractive">{`
      (function(){
        try{
          const theme = localStorage.getItem('theme') || '${initStore}'
          document.documentElement.classList.toggle('dark', theme === '${dark}')
          console.log('[Thisoe] Theme applied: ', theme)
        }catch(_){console.error("[ThisoeError] \`script#set-theme\` Error: "+_)}
      })()
    `}</Script>
    
    */}
    <Script
      id="onetap-api"
      strategy="beforeInteractive"async defer
      src="https://accounts.google.com/gsi/client"
    />
      {children}
    </HTML>
  )
}