import Twemoji from 'react-twemoji'
export default function Emoji({children}:{children:React.ReactNode}){
  return<Twemoji options={{className:'twemoji'}}>{children}</Twemoji>
}