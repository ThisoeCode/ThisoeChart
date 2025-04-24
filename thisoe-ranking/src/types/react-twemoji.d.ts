declare module 'react-twemoji' {
  interface TwemojiProps {
    options?: {
      className?: string
      size?: string | number
      folder?: string
      ext?: string
      callback?: (icon: string) => void
    }
    children: React.ReactNode
  }
  const Twemoji: React.FC<TwemojiProps>
  export default Twemoji
}