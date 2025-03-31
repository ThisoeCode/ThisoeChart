export const



/** Get yt id from url */
yt=(url:string)=>{
  if(url.match(/^[A-Za-z0-9_-]{11}$/))return url
  const match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/)
  return(match&&match[7].length==11)? match[7] : null
},



/** `localStorage` */
store = <T=string>(key:string):Store<T> => new Store<T>(key)



export class

Store<T=string> {
  private key:string
  public get:T|null

  constructor(key:string){
    this.key = key
    this.get = this.getter()
  }

  private getter():T|null {
    const item = localStorage.getItem(this.key)
    if (item === null) { // NOT EXIST
      return null
    }
    try{
      return JSON.parse(item) as T
    }catch{
      return item as T
    }
  }

  set(value:T):this {
    localStorage.setItem(this.key, JSON.stringify(value))
    this.get = value
    return this
  }

  del():void {
    localStorage.removeItem(this.key)
  }

  ifNullSet(defaultVal:T):this {
    if (localStorage.getItem(this.key) === null) {
      this.set(defaultVal)
    }
    return this
  }
}