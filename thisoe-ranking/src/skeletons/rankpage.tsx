export default function ArankpageSkeleton({header}:Readonly<{
  header:React.ReactNode
}>){
  return<main>
    {header}
    <i><ol>
      {Array.from({length:7}).map((_,i)=>(
        <li key={i}/>
      ))}
    </ol></i>
  </main>
}