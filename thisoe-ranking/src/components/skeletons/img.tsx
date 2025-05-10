export default function ImgSkeleton({className,style,title}:Readonly<{
  className?:string
  style?:React.CSSProperties
  title?:string
}>){
  return<button className={`img-skeleton ${className}`}style={style}title={title}/>
}