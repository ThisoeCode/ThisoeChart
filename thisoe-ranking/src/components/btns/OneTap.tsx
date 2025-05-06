'use client'
import { useOneTap } from "@/hooks/useOnetap"

export default function OneTapBtn(){
  const
    {init} = useOneTap()

  return<button id="onetap-btn"onClick={init}>
    Login
  </button>
}
