export const


/** `localStorage` */
store = <T=string>(key:string):Store<T> => window && new Store<T>(key),



/**  */
_ = 0



/** Thisoe `localStorage` manager */
class Store<T=string> {
  private key:string
  public get:T|null
  private isBrowser: boolean

  constructor(key:string){
    this.key = key
    this.isBrowser = typeof window !== 'undefined'
    this.get = this.getter()
  }

  private getter():T|null {
    if (!this.isBrowser) {
      return null
    }
    
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
    if (this.isBrowser) {
      localStorage.setItem(this.key, JSON.stringify(value))
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