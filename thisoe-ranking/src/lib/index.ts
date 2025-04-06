export const



/** Get yt id from url */
yt=(url:string)=>{
  if(url.match(/^[A-Za-z0-9_-]{11}$/))return url
  const match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/)
  return(match&&match[7].length==11)? match[7] : null
},



/** `localStorage` */
_=0