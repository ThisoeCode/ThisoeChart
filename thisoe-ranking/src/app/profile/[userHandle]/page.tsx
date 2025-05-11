export default async function _({params}:Readonly<{
  params:Promise<{userHandle:string}>
}>){
  const
    {userHandle}=await params

  return<main id="profile">{`TODO: Profile page - ${userHandle}`}</main>
}