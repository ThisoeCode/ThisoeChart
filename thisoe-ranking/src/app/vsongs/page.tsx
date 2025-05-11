import Song from "@/components/vsongs"
import { session } from "@/lib/auth"

export default async function _(){
  const { clientUser } = await session()
  return<Song auth={clientUser}/>
}