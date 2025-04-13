import "./thisoe.css"
import "./svg.css"
import type { Metadata } from "next"
import Providers from "@/providers"
import { selfurl } from "@/lib"

export const metadata: Metadata = {
  title: "Thisoe Rankings",
  description: "", /** @TODO descriptions on all pages */
  alternates: {
    canonical: `${selfurl}/`,
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Providers>
    <html>{children}</html>
  </Providers>
}