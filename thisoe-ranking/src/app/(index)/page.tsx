import script from "@/lib/script"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function _(){
  redirect('/oshi')
  // TODO: remove redirect
  // TODO: Add `_.css` for #homepage
  return<main id="homepage">
    <h1 style={{fontFamily:"var(--sans)"}}>Thisoe Ranking</h1>
    <Link href='/oshi'className="home-card">
      {script().oshi.h1}
    </Link>
    <Link href='/vsongs'>
    {script().vsongs.h1}
    </Link>
  </main>
}