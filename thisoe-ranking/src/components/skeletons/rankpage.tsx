import'./_.css'
import'@/components/A/A.css'

export default function ArankpageSkeleton(){
  return<main className="rankpage">
    <header className="skeleton">
      <h1/>
      <i id="btn-wrap">
        <button/><button/><button/><button style={{borderRadius:'999pt'}}/>
      </i>
    </header>
    <i className="skeleton"><ol>
      {Array.from({length:7}).map((_,i)=>(
        <li key={i}/>
      ))}
    </ol></i>
  </main>
}