export const

// get public env
selfurl=process.env.NEXT_PUBLIC_SELF_URL,


/** Get yt id from url */
yt=(url:string)=>{
  if(url.match(/^[A-Za-z0-9_-]{11}$/))return url
  const match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/)
  return(match&&match[7].length==11)? match[7] : null
},



// test
findUnsupportedChars=(text:string, fontFamily:string):string[] => {
  const
    unsupported: string[] = [],
    seen = new Set<string>(), // avoid duplicate checks
    isCharSupported=(char: string, fontFamily: string): boolean => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) return false
    
      context.font = `40px ${fontFamily}, sans-serif`
      const widthWithFont = context.measureText(char).width
    
      context.font = `40px sans-serif`
      const widthWithFallback = context.measureText(char).width
    
      return widthWithFont !== widthWithFallback
    }

  for (const char of text) {
    if (!seen.has(char)) {
      seen.add(char)
      if (!isCharSupported(char, fontFamily)) {
        unsupported.push(char)
      }
    }
  }

  return unsupported
}