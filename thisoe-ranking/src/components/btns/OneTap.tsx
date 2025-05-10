'use client'
import { useOneTap } from "@/hooks/useOnetap"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ImgSkeleton from "@/components/skeletons/img"
import script from "@/lib/script"
import { useState } from "react"
export default function OneTapBtn(){
  const
    {init} = useOneTap(),
    { data: session, status } = useSession(),
    route = useRouter(),
    [isClicked,setClick] = useState(false),
    [hovered,setHover] = useState(false),
    handOnetap=()=>{
      if(status==="authenticated" && session?.user?.image)
        route.push('/settings')
      else if(status==="loading" || isClicked)
        return
      else{
        init()
        setClick(true)
      }
    }

  // Logged in
  if(status==="authenticated" && session?.user?.image)
    return<button id="settings-and-auth-btn"
      onClick={handOnetap}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      title={script().settings.title}
    >
      <Image
        src={session.user.image}
        alt={"avatar"}
        width={36}height={36}
        style={{opacity:hovered?'0':'1'}}
      />
      <i className="gear svg"style={{opacity:hovered?'1':'0'}}/>
    </button>

  // Loading or clicked
  if(isClicked || status === "loading")
    return<ImgSkeleton className="avatar-loading"/>

  // Visitor
  return<button onClick={handOnetap}>
    <i className="signin svg"
      title={script().rankpage.header.btns.oneTap}
    />
  </button>
}
