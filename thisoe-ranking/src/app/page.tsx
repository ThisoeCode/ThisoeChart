import script from "@/lib/script"
import { redirect } from "next/navigation"

export default function _(){
  redirect('/oshi')
  return<main>
    <p>{script('ja').indexPage.greetingTest}</p>
  </main>
}