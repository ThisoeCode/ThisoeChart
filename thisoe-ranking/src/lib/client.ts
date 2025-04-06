export const


/** `localStorage` */
store = <T=string>(key:string):Store<T> => new Store<T>(key),



/**  */
_ = 0



/** Thisoe `localStorage` manager */
class Store<T=string> {
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