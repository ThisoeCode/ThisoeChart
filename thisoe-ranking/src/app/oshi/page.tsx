import Oshi from "@/components/oshi"
import script from "@/script"

export default function _(){
  return<>
    <p>{script().indexPage.greeting}</p>
    <Oshi/>
  </>
}