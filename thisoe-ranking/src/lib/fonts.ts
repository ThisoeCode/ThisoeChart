import { Noto_Sans, Noto_Sans_JP, Noto_Sans_KR, Noto_Sans_SC, Noto_Sans_TC, Noto_Serif, Noto_Serif_JP, Noto_Serif_KR, Noto_Serif_SC, Noto_Serif_TC } from 'next/font/google'
import localFont from 'next/font/local'

// SANS
const sans = Noto_Sans({
  subsets:['latin'], weight:['200', '300', '500', '700'],
  variable: '--sans-latin',
})
const sansJP = Noto_Sans_JP({
  subsets:['latin'], weight:['200', '300', '500', '700'],
  variable: '--sans-ja',
})
const sansKR = Noto_Sans_KR({
  subsets:['latin'], weight:['200', '300', '500', '700'],
  variable: '--sans-ko',
})
const sansSC = Noto_Sans_SC({
  subsets:['latin'], weight:['200', '300', '500', '700'],
  variable: '--sans-hans',
})
const sansTC = Noto_Sans_TC({
  subsets:['latin'], weight:['200', '300', '500', '700'],
  variable: '--sans-hant',
})

// SERIF
const serif = Noto_Serif({
  subsets:['latin'], weight:['200', '300', '500', '700'],
  variable: '--serif-latin',
})
const serifJP = Noto_Serif_JP({
  subsets:['latin'], weight:['200', '300', '500', '700'],
  variable: '--serif-ja',
})
const serifKR = Noto_Serif_KR({
  subsets:['latin'], weight:['200', '300', '500', '700'],
  variable: '--serif-ko',
})
const serifSC = Noto_Serif_SC({
  subsets:['latin'], weight:['200', '300', '500', '700'],
  variable: '--serif-hans',
})
const serifTC = Noto_Serif_TC({
  subsets:['latin'], weight:['200', '300', '500', '700'],
  variable: '--serif-hant',
})
const VisitorScript = localFont({
  src:[
    { path:'../fonts/visitor_script/VisitorScript.otf', weight:'400' },
    { path:'../fonts/visitor_script/VisitorScript-Bold.otf', weight:'700' },
    { path:'../fonts/visitor_script/VisitorScript-Italic.otf', weight:'400', style:'italic' },
    { path:'../fonts/visitor_script/VisitorScript-Bold_Italic.otf', weight:'700', style:'italic' },
  ],
  display:'swap',
  variable: '--visitor-script',
})

// EXPORT
export const
  Noto = {sans,sansJP,sansKR,sansSC,sansTC,serif,serifJP,serifKR,serifSC,serifTC},
  visitorScript = VisitorScript,

  fontClass = `${Noto.sans.variable} ${Noto.sansJP.variable} ${Noto.sansKR.variable} ${Noto.sansSC.variable} ${Noto.sansTC.variable} ${Noto.serif.variable} ${Noto.serifJP.variable} ${Noto.serifKR.variable} ${Noto.serifSC.variable} ${Noto.serifTC.variable} ${visitorScript.variable}`