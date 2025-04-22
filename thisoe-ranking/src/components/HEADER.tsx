import BtnWrapSkeleton from "@/skeletons/btnWrap"
import ThemeBtn from "./btns/theme"

export default function Header({h1,children}:Readonly<{
  h1:string
  /** Buttons go here. */
  children?:React.ReactNode
}>){
  const
    btns = children
      ? <i id="btn-wrap">{children}<ThemeBtn/></i>
      : <BtnWrapSkeleton/>
  return<header>
    <h1>{h1}</h1>
    {btns}
  </header>
}
