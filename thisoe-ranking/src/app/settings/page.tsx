import SettingsPage from "@/components/settings"
import { userMeta } from "@/lib/auth"

export default async function _(){
  const user=await userMeta()
  return<SettingsPage user={user}/>
}