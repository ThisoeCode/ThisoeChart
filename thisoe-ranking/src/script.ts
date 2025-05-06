const _ = {

langs:{
  "English":{
    en:'English',
    hans:'英语',
    hant:'英文',
    ja:'英語',
    ko:'영어',
  },
  "日本語":{
    en:'Japanese',
    hans:'日语',
    hant:'日文',
    ja:'日本語',
    ko:'일본어',
  },
  "简体中文":{
    en:'Simplified Chinese',
    hans:'中文（简体）',
    hant:'簡體中文',
    ja:'中国語簡体',
    ko:'중국어 간체',
  },
  "繁體中文":{
    en:'Traditional Chinese',
    hans:'中文（繁体）',
    hant:'正體中文',
    ja:'中国語繁体',
    ko:'중국어 정체',
  },
  "한국어":{
    en:'Korean',
    hans:'韩语',
    hant:'韓文',
    ja:'韓国語',
    ko:'한국어',
  },
  "Ina Script":{
    en:'Ina Script',
    hans:'Ina语',
    hant:'伊那文',
    ja:'伊那尓栖語',
    ko:'이나니스어',
  },
},

indexPage: {
  greetingTest: {
    en:'[en] oh hi',
    hans:'[hans] 来辣',
    hant:'[hant] 歡迎',
    ja:'[ja] オッスーーー',
    ko:'[ko] 안뇽',
    ina:'[INA] Salvete fair visitor',
  },
},
rankpage:{
  header:{
    btns:{
      theme:{
        switch1:{
          en: 'Switch to ',
          ja: '',
          ko: '',
          hans: '',
          hant: '切換到',
        },
        dark: {
          en: 'dark',
          ja: 'ダーク',
          ko: '',
          hans: '暗色',
          hant: '暗色',
        },
        light: {
          en: 'light',
          ja: 'ライト',
          ko: '',
          hans: '亮色',
          hant: '亮色',
        },
        switch2: {
          en: ' theme',
          ja: 'テーマに',
          ko: '',
          hans: '背景',
          hant: '主題',
        },
      },
      list:{
        switch1:{
          en: 'Switch to ',
          ja: '',
          ko: '',
          hans: '',
          hant: '切換到',
        },
        compact:{
          en: 'compact',
          ja: 'コンパクト',
          ko: '',
          hans: '收起',
          hant: '緊湊',
        },
        detail:{
          en: 'detailed',
          ja: '詳細',
          ko: '',
          hans: '展开',
          hant: '詳細',
        },
        switch2: {
          en: ' list',
          ja: '',
          ko: '',
          hans: '列表',
          hant: '列表',
        },
      },
      oneTap:{
        en:'Sign in with Google',
        ja:'Googleでログイン',
        ko:'구글로 로그인',
        hans:'谷歌登录',
        hant:'谷歌登入',
        ina:'Google login',
      },
    },
  },
},
oshi: {
  h1:{
    en:'Oshi Ranking',
    ja:'推しランキング',
    ko:'오시 랭킹',
    hans:'单推排行',
    hant:'推排行',
    ina:'My Loves',
  },
},
vsongs:{
  
},
settings:{
  title:{ en:'Settings',
    ja:'設定',
    ko:'설정',
    hans:'设置',
    hant:'網站設定',
  },
  lang:{
    title:{ en:'Language',
      ja:'言語',
      ko:'언어',
      hans:'语言',
      hant:'語言設定',
    },
  },
},



}as const
export default _