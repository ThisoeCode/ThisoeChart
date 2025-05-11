export const
isClient = typeof window !== 'undefined',
isServer = !isClient,



modImgSize=(url:string,size:number)=>{
  if(url.includes('=s'))
    return url.split('=')[0]+'=s'+size+'-c'
  return url
},



/** `Store` wrapper (for `localStorage`) */
store = <T=string>(key:string):Store<T> => {
  // Check if is client component
  if(isClient) return new Store<T>(key)
  return new Store<T>(key, true)
}

// REFINED by Claude 3.7
/** Thisoe `localStorage` manager */
class Store<T=string> {
  private key:string
  /**
   * - `undefined` if does not exist
   * - `null` if is server component
   */
  public get:T|undefined|null
  private isBrowser: boolean

  constructor(key:string, isServer = false){
    this.isBrowser = typeof window !== 'undefined' && !isServer
    if(!this.isBrowser){
      this.key = ''
      this.get = null
      return
    }

    this.key = key
    this.get = this.getter()
  }

  private getter():T|undefined|null {
    if(!this.isBrowser) return null
    const item = localStorage.getItem(this.key)
    if (item === null) { // NOT EXIST
      return void''
    }
    try{
      // Check if is obj or array
      if (item.startsWith('{') || item.startsWith('[')) {
        return JSON.parse(item) as T
      }
      return item as T
    }catch{
      return item as T
    }
  }

  set(value:T):this {
    if (this.isBrowser) {
      localStorage.setItem(this.key,
        typeof value==='string' ? value : JSON.stringify(value)
      )
    }
    this.get = value
    return this
  }

  del():void {
    if (this.isBrowser) {
      localStorage.removeItem(this.key)
    }
  }

  ifNullSet(defaultVal:T):this {
    if (this.isBrowser && localStorage.getItem(this.key) === null) {
      this.set(defaultVal)
    }
    return this
  }
}