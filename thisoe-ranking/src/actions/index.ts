export interface ThisoeResponse<T>{
  suc:boolean
  msg:string
  data:T
}

export const

ThisoeResponse = <T>(_:ThisoeResponse<T>)=>_
