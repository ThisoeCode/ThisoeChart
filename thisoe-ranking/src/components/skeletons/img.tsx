export default function ImgSkeleton({className,style}:Readonly<{
  className?:string
  style?:React.CSSProperties
}>){
  return<button className={`img-skeleton ${className}`}style={style}/>
}