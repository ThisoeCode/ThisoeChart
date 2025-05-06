import Link from "next/link"

export default function _(){
  return<i id='loading'>
    <h1>404</h1>
    <h2>- Thisoe Ranking -</h2>
    <hr style={{width:'300pt'}}/>
    <p>
      There&apos;s a typo in your URL.
      <br/>
      Please check and fix the URL, then try again.
      <br/>
      If you think this is an error, please contact Thisoe at <a target="_blank" rel="noopener noreferrer" href="https://x.com/ThisoeCode">𝕏 @ThisoeCode</a>.
    </p>
    <Link href="/">Go to Thisoe Ranking homepage</Link>
  </i>
}