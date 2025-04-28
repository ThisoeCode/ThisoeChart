import'./_.css'
import'@/components/A/A.css'

export default function ArankpageSkeleton(){
  return<main>
    <header className="skeleton">
      <h1/>
      <i id="btn-wrap">
        <button/><button/><button/>
      </i>
    </header>
    <i className="skeleton"><ol>
      {Array.from({length:7}).map((_,i)=>(
        <li key={i}/>
      ))}
    </ol></i>
  </main>
}