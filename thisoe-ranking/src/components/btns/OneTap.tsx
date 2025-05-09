'use client'
import { useOneTap } from "@/hooks/useOnetap"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ImgSkeleton from "@/components/skeletons/img"

export default function OneTapBtn(){
  const
    {init} = useOneTap(),
    { data: session, status } = useSession(),
    route = useRouter()

  if(status === "loading")
    return<ImgSkeleton
      className="avatar-loading"
      style={{borderRadius:'999pt'}}
    />

  if (status === "authenticated" && session?.user?.image)
    return<button id="ava-btn" onClick={()=>route.push('/settings')}>
      <Image
        src={session.user.image}
        alt={session.user.name || "User"}
        width={36}height={36}
      />
    </button>

  return<button id="onetap-btn"onClick={init}>
    <i className="signin svg"/>
  </button>
}
