import script from "@/script"
import { redirect } from "next/navigation"

export default function _(){
  redirect('/oshi')
  return<main>
    <p>{script('ja').indexPage.greeting}</p>
  </main>
}