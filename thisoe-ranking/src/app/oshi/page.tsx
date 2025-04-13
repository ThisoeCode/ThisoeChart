import Oshi from "@/components/oshi"
import script from "@/script"

export default function _(){
  return<>
    <p style={{display:'none'}}>{script().indexPage.greetingTest}</p>
    <Oshi/>
  </>
}