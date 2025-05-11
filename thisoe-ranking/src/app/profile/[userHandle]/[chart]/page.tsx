export default async function _({params}:Readonly<{
  params:Promise<{userHandle:string,chart:string}>
}>){
  const
    {userHandle,chart}=await params

  return<main id="chart-showcase">{`TODO: Chart page - ${userHandle}/${chart}`}</main>
}