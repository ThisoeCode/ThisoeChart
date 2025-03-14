// 1. API stuff
const selfurl=process.env.NEXT_PUBLIC_SELF_URL
if(!selfurl)throw new Error('[THISOE🩵DEBUG] Missing environment variable `SELF_URL`.')
export const
  API = selfurl+'/api/',
  headJ = {'Content-Type':'application/json'}



// 2. LOGSYS
import{NextRequest,NextResponse}from"next/server"
import type{Aobj}from"./ts"
/** NextResponse.json */
export const NJ = (data:Aobj, status:number = 200)=>{
  return NextResponse.json(data,{status})
}

const
t1 = (req:NextRequest)=>{
  let ip = req.headers.get('x-forwarded-for')?.split(',')[0]
  if(!ip){
    console.log(`\n[Thisoe API_LAUNCH 100] (Launcher's IP cannot be found.)`)
    return
  }
  if(['::1',null,'127.0.0.1'].includes(ip)){
    ip='localhost'
  }else{
    ip=ip?ip.trim():'0.0.0.0'
  }
  let geo = req.headers.get('x-real-ip')
  geo=geo?geo.trim():'--'
  console.log(`\n[Thisoe API_LAUNCH 100] FromIP: ${ip} [${geo}]`)
  return
},
t2='Thisoe msg::',
t3='Thisoe WARNING::',
t5='Thisoe FATAL::',
t422=(SERV_ID:string)=>{
  console.error('[WARNING:４２２] SERV_ID::'+SERV_ID)
  return NJ({thisoeERR:'UnprocessableEntity'},422)
},
t500=(process:string)=>{
  console.error(`[${t5+process} 500] UNKNOWN ERROR!!!!!!!`)
},
NJ500=NJ({},500)

export const _t = {t1,t2,t3,t5,t422,t500,NJ500}