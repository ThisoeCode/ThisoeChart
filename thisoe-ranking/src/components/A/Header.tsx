import ThemeBtn from "../btns/theme"
import LangBtn from "../btns/lang"
import OneTapBtn from "../btns/OneTap"

export default function Header({h1,children}:Readonly<{
  h1:string
  /** Buttons go here. */
  children?:React.ReactNode
}>){
  const
    btns = children
      ? <i id="btn-wrap">
          {children}
          <ThemeBtn/><LangBtn/><OneTapBtn/>
        </i>
      : <i id="btn-wrap skeleton"/>

  return<header>
    <h1>{h1}</h1>
    {btns}
  </header>
}
