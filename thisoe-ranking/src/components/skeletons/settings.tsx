import'./_.css'
import'@/components/settings/_.css'
import script from '@/lib/script'

export default function SettingsSkeleton(){
  return<i id="settings"className="skeleton">
  <header>
    <h1>{script().settings.title}</h1>
  </header>

  <i>
    <i id='user-edit'>
      <button id="avatar-btn">
        <div style={{width:270,height:270}}/>
      </button>
      <div id='username'/>
      <div id="handle-wrap"/>
      <i id="socials-wrap">
        <i className='wrap'/>
        <i className='wrap'/>
      </i>
      <button id='savechanges-btn'style={{opacity:0}}disabled/>
    </i>
    <button><i className='signout'/></button>
  </i><hr/>

  <i>
    <h2>{script().settings.lang.title}</h2>
    <i id='lang-menu'>
      <button/><button/><button/><button/><button/><button/>
    </i>
  </i><hr/>

  <i id="theme-wrap">
    <h2>{script().settings.theme.title}</h2>
    <button id="theme-btn"/>
  </i>
</i>
}