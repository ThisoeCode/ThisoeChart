import Oshi from "@/components/oshi"
import type{ Oshi as OshiChart } from "@/types/oshi"
import { session } from "@/lib/auth"
import { chartDB } from "@/lib/_insu"

export default async function _(){
  const
    { serverUID, clientUser } = await session(),
    oshiChart=await chartDB.find({
      user:serverUID,
      chart:'oshi',
      sort:{},
    }).toArray().then(docs=>docs.map(doc=>doc as unknown as OshiChart)),
    auth=clientUser||null

  return<Oshi auth={auth}chart={oshiChart}/>
}