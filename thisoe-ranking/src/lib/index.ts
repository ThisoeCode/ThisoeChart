import{isServer}from"./client"

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
},



isMobile=()=>{
  if(isServer) return false
  return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}



// T3 tryCatch
type Success<T> = {
  data:T
  error:null
}
type Failure<E> = {
  data:null
  error:E
}
type Result<T, E = Error> = Success<T>|Failure<E>
// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise:Promise<T>,
):Promise<Result<T, E>> {
  try{
    const data = await promise
    return { data, error: null }
  } catch(error) {
    return { data: null, error: error as E }
  }
}
// E.G.
  // const{data:someData,error:someError} = await tryCatch(someFunc)
  // if(someError)retrun{error:"unable to process"}
  //
  // const{data:moreData,error:moreError} = await tryCatch(moreFunc)
  // if(moreError)retrun{error:"unable to process"}
  //
  // someData + moreData;