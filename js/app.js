import { initAuth } from './auth.js';
import { initPractice } from './practice.js';
import { initShop } from './shop.js';
import { initSettings } from './settings.js';
import { initTranslate } from './translate.js';
import { renderVipFrame, enableVipParticles, disableVipParticles } from './vip.js';
import { drawStats } from './components/chart.js';
import { toast } from './components/toast.js';
import { toToneMarked } from './utils/pinyinTone.js';

const $=q=>document.querySelector(q); const $$=q=>Array.from(document.querySelectorAll(q));
const pages={home:$('#home'), faq:$('#faq'), app:$('#appSection')};
const tabs={
  study:$('#study'), practice:$('#practice'), bank:$('#bank'), shop:$('#shop'),
  account:$('#account'), admin:$('#admin')
};
const userBadge=$('#userBadge'); const coinBadge=$('#coinBadge');
const themeBtn=$('#themeToggle'); const body=document.body;

const accentPalettes={
  green:{accent:'#22c55e',brand:'#16a34a'},
  blue:{accent:'#3b82f6',brand:'#2563eb'},
  violet:{accent:'#8b5cf6',brand:'#7c3aed'}
};
function applyAccentByName(name='green'){
  const tone=accentPalettes[name]||accentPalettes.green;
  document.documentElement.style.setProperty('--accent', tone.accent);
  document.documentElement.style.setProperty('--brand', tone.brand);
  body.style.setProperty('--accent', tone.accent);
  body.style.setProperty('--brand', tone.brand);
}
const savedAccent=localStorage.getItem('accentColor')||'green';
applyAccentByName(savedAccent);

const state={
  user:null, prefs:{pinyinTone:false, anim:true, toast:true},
  vocab:[], easy:[], hard:[], frames:[],
  sentences:[], studyIdx:0, wrongPool:new Set(), wrongArr:[], stats:{correct:0,wrong:0,total:0,streak:0},
  practice:{mode:'random',level:'easy',pool:[],cur:null, timeLeft:60, timerId:null, useWrong:false}
};

let syncAccountPanel=()=>{};

function currentUser(){
  return state.user?.username || '';
}

function norm(s){return (s||'').toLowerCase().replace(/[\s\u00A0]+/g,' ').replace(/[。．\.!！!？?]+$/g,'').replace(/\bcậu\b/g,'bạn').replace(/(\s)không$/g,' phải không').trim()}

function routeTo(name){
  Object.keys(pages).forEach(k=>pages[k].hidden=k!==name);
  $$('.tablink').forEach(b=>b.setAttribute('aria-current',b.dataset.route===name?'page':'false'));
  if(name==='app' && !state.user){
    openAuth();
    Object.keys(pages).forEach(k=>pages[k].hidden=k!=='home');
    $$('.tablink').forEach(b=>b.setAttribute('aria-current', b.dataset.route==='home'?'page':'false'));
  }
  window.scrollTo({top:0,behavior:'smooth'});
}
$$('.tablink, [data-route]').forEach(btn=> btn.addEventListener('click',()=> routeTo(btn.getAttribute('data-route'))));
$('#ctaStart')?.addEventListener('click',()=>routeTo('app'));

function switchAppTab(tab){
  Object.keys(tabs).forEach(k=> tabs[k].hidden = k!==tab);
  $$('.tab').forEach(x=>x.setAttribute('aria-selected','false'));
  const el=[...$$('.tab')].find(t=>t.dataset.tab===tab); if(el) el.setAttribute('aria-selected','true');
}
Array.from(document.querySelectorAll('.tab')).forEach(t=> t.addEventListener('click',()=> switchAppTab(t.dataset.tab)));

function setThemeFromPref(){
  if(localStorage.getItem('theme')==='light'){body.classList.add('light'); themeBtn.textContent='🌙';}
}
themeBtn.onclick=()=>{ body.classList.toggle('light'); const isLight=body.classList.contains('light'); themeBtn.textContent=isLight?'🌙':'☀️'; localStorage.setItem('theme', isLight?'light':'dark'); };

function setAuthedUI(){
  const u=state.user;
  const logged=!!u;
  userBadge.hidden=!logged; coinBadge.hidden=!logged; $('#btnLogout').hidden=!logged; $('#btnOpenLogin').hidden=logged;
  if(logged){
    userBadge.textContent='👤 '+u.username+(u.vip?' 👑':'');
    coinBadge.textContent='🟡 '+getCoins(u.username);
    $('.tab.admin').hidden = (u.role!=='admin');
  }else{
    $('.tab.admin').hidden = true;
  }
  syncAccountPanel();
}
function getCoins(user){ return Number(localStorage.getItem(`hb:coins:${user}`) ?? uCoinsSeed(user)); }
function setCoins(user,val){ localStorage.setItem(`hb:coins:${user}`, String(Math.max(0,Math.floor(val||0)))); if(state.user?.username===user) coinBadge.textContent='🟡 '+getCoins(user); }
function addCoins(user,delta){ setCoins(user, getCoins(user)+Number(delta||0)); }
function uCoinsSeed(user){
  try{const db=JSON.parse(localStorage.getItem('hb:seedUsers')||'{}');return db[user]?.coins??0}catch{return 0}
}

function openAuth(){ $('#authModal').hidden=false; }
function closeAuth(){ $('#authModal').hidden=true; }
$('#btnOpenLogin').onclick=openAuth; $('#authClose').onclick=closeAuth;

$('#btnLogout').onclick=()=>{ localStorage.removeItem('hb:session'); state.user=null; setAuthedUI(); routeTo('home'); toast('Đã đăng xuất'); };

const accountBtn=document.getElementById('accountBtn');
if(accountBtn){
  accountBtn.onclick=()=>{
    if(currentUser()){
      routeTo('app');
      const tabBtn=document.querySelector('.tab[data-tab="account"]');
      if(tabBtn){
        tabBtn.click();
      }else{
        switchAppTab('account');
      }
    }else{
      openAuth();
    }
  };
}

(() => {
  const tabsPreview=Array.from(document.querySelectorAll('.s-tab'));
  if(!tabsPreview.length) return;
  const demos={
    study:document.querySelector('.demo-study'),
    practice:document.querySelector('.demo-practice'),
    bank:document.querySelector('.demo-bank')
  };
  const dots=Array.from(document.querySelectorAll('.screen-footer .dot'));
  function activate(name, idx){
    tabsPreview.forEach(btn=> btn.classList.toggle('is-active', btn.dataset.demo===name));
    Object.values(demos).forEach(el=> el?.classList.remove('is-active'));
    demos[name]?.classList.add('is-active');
    dots.forEach((dot,i)=> dot.classList.toggle('is-active', i===idx));
  }
  tabsPreview.forEach((btn,i)=> btn.addEventListener('click',()=> activate(btn.dataset.demo, i)));
  activate('study',0);
})();

document.getElementById('ctaAccount')?.addEventListener('click',()=>{
  if(currentUser()){
    routeTo('app');
    document.querySelector('.tab[data-tab="account"]')?.click();
  }else{
    openAuth();
  }
});

$('#btnLogin').onclick=async()=>{
  const u=$('#loginUser').value.trim(); const p=$('#loginPass').value;
  const remember=$('#remember').checked; const msg=$('#authMsg'); msg.textContent='Đang kiểm tra...'; msg.style.color='';
  try{
    const users=await (await fetch('/data/users.json')).json();
    const overlay=JSON.parse(localStorage.getItem('hb:overlayUsers')||'{}');
    const list=[...users,...Object.values(overlay)];
    const found=list.find(x=>x.username===u && x.password===p);
    if(!found) throw new Error('Sai tài khoản hoặc mật khẩu');
    localStorage.setItem('hb:session', JSON.stringify(found));
    const seeded=JSON.parse(localStorage.getItem('hb:seedUsers')||'{}'); seeded[found.username]=found; localStorage.setItem('hb:seedUsers',JSON.stringify(seeded));
    if(localStorage.getItem(`hb:coins:${found.username}`)==null) setCoins(found.username, found.coins||0);
    if(remember) localStorage.setItem('hb:remember',u); else localStorage.removeItem('hb:remember');
    state.user=found; setAuthedUI(); closeAuth(); routeTo('app'); switchAppTab('study'); toast('Đăng nhập thành công');
    if(state.user.vip && state.prefs?.anim!==false) enableVipParticles(); else disableVipParticles();
  }catch(e){ msg.style.color='var(--bad)'; msg.textContent=String(e.message||e); }
};

function restoreSession(){
  try{
    const sess=JSON.parse(localStorage.getItem('hb:session')||'null');
    if(sess){ state.user=sess; setAuthedUI(); }
    const r=localStorage.getItem('hb:remember'); if(r) $('#loginUser').value=r;
  }catch{}
}

async function loadData(){
  const [vocab,easy,hard,frames]=await Promise.all([
    fetch('/data/vocab.json').then(r=>r.json()),
    fetch('/data/sentences_easy.json').then(r=>r.json()),
    fetch('/data/sentences_hard.json').then(r=>r.json()),
    fetch('/data/frames.json').then(r=>r.json())
  ]);
  state.vocab=vocab; state.easy=easy; state.hard=hard; state.frames=frames;
  state.sentences=[...easy,...hard];
}

function shuffle(arr){return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}
function renderStudy(){
  const it=state.sentences[state.studyIdx];
  if(!it) return;
  $('#hanText').textContent=it.han;
  const p = state.prefs?.pinyinTone ? (it.pinyin_num ? toToneMarked(it.pinyin_num) : toToneMarked(it.pinyin)) : it.pinyin;
  $('#pinyinText').textContent=p;
  $('#vietText').textContent=it.vi;
  $('#studyCount').textContent=`${state.studyIdx+1}/${state.sentences.length}`;
  $('#selfAnswer').value=""; $('#selfResult').textContent="";
}
function renderStudyList(){
  const box=$('#studyList'); box.innerHTML="";
  state.sentences.forEach((s,i)=>{
    const div=document.createElement('div'); div.className='card'; div.style.cursor='pointer';
    const p = state.prefs?.pinyinTone ? (s.pinyin_num ? toToneMarked(s.pinyin_num) : toToneMarked(s.pinyin)) : s.pinyin;
    div.innerHTML=`<div><b>${s.han}</b> <span class="muted">(${p})</span></div><div class="muted">${s.vi}</div>`;
    div.onclick=()=>{state.studyIdx=i; renderStudy()};
    box.appendChild(div);
  });
}
$('#toggleViet').onclick=()=>{ $('#vietText').hidden=!$('#vietText').hidden; localStorage.setItem('hb:studyShowViet',(!$('#vietText').hidden)?'1':'0')};
$('#togglePinyinStudy').onclick=()=>{ $('#pinyinText').hidden=!$('#pinyinText').hidden; localStorage.setItem('hb:studyShowPinyin',(!$('#pinyinText').hidden)?'1':'0')};
$('#prevStudy').onclick=()=>{state.studyIdx=(state.studyIdx-1+state.sentences.length)%state.sentences.length; renderStudy()};
$('#nextStudy').onclick=()=>{state.studyIdx=(state.studyIdx+1)%state.sentences.length; renderStudy()};
$('#shuffleStudy').onclick=()=>{const sh=shuffle(state.sentences); state.sentences.splice(0,state.sentences.length,...sh); state.studyIdx=0; renderStudy(); renderStudyList()};
$('#checkSelf').onclick=()=>{ const it=state.sentences[state.studyIdx]; if(!it) return; const ans=$('#selfAnswer').value; const ok=norm(ans)===norm(it.vi)||norm(ans)===norm(it.han)||norm(ans)===norm(it.pinyin); const out=$('#selfResult'); if(ok){out.textContent='Đúng rồi!'; out.style.color='var(--ok)';} else {out.innerHTML=`Chưa đúng. Gợi ý: <span class=muted>${it.han}</span> ⇄ <span class=muted>${it.vi}</span>`; out.style.color='var(--bad)'; }};

initPractice(state, {norm, drawStats, shuffle}, {
  onStatsChange: ()=>{ localStorage.setItem('hb:stats', JSON.stringify(state.stats)); drawStats($('#statsChart'), state.stats); },
  onWrongPoolChange: ()=> $('#wrongCount').textContent=state.wrongArr.length
});

function renderBank(){
  const bankEl=$('#bank'); const wordsBox=$('#bankGridWords'); const sentsBox=$('#bankGridSentences');
  const showTone = state.prefs?.pinyinTone;
  const wordsHTML = state.vocab.map(v=>{
    const py = showTone ? toToneMarked(v.pinyin_num||v.pinyin) : v.pinyin;
    return `<div class='card'><b>${v.han}</b> <span class='muted py'>(${py})</span><div class='muted'>${v.vi}</div></div>`;
  }).join('');
  wordsBox.innerHTML=wordsHTML; $('#wordsCount').textContent=`(${state.vocab.length})`;
  const all=state.sentences;
  const sentsHTML = all.map(s=>{
    const py = showTone ? toToneMarked(s.pinyin_num||s.pinyin) : s.pinyin;
    return `<div class='card'><b>${s.han}</b> <span class='muted py'>(${py})</span><div class='muted'>${s.vi}</div></div>`;
  }).join('');
  sentsBox.innerHTML=sentsHTML; $('#sentsCount').textContent=`(${all.length})`;
  const pinTgl=$('#togglePinyin'); const apply=()=> bankEl.classList.toggle('hide-py', !pinTgl.checked);
  pinTgl.onchange=apply; apply();
  $('#toggleAll').onclick=()=>{ const groups=[$('#bankWords'),$('#bankSents')]; const anyOpen=groups.some(d=>d.open); groups.forEach(d=> d.open=!anyOpen); };
}

initShop(state, {setCoins, addCoins, getCoins, renderVipFrame});

initSettings(state, {toToneMarked}, ()=>{
  if(state.user?.vip && state.prefs?.anim!==false) enableVipParticles(); else disableVipParticles();
  renderStudy(); renderStudyList(); renderBank();
});

initTranslate();
initAuth();

function restorePrefs(){
  try{
    const prefs=JSON.parse(localStorage.getItem('hb:prefs')||'null'); if(prefs) state.prefs=prefs;
    const st=JSON.parse(localStorage.getItem('hb:stats')||'null'); if(st) Object.assign(state.stats,st);
    const sv=localStorage.getItem('hb:studyShowViet'); if(sv!==null) $('#vietText').hidden= sv!=='1';
    const sp=localStorage.getItem('hb:studyShowPinyin'); if(sp!==null) $('#pinyinText').hidden= sp!=='1';
  }catch{}
}

async function init(){
  setThemeFromPref();
  restoreSession(); setAuthedUI();
  restorePrefs();
  await loadData();
  renderStudy(); renderStudyList(); renderBank();
  $('#modeName').textContent='Xáo trộn câu'; $('#levelName').textContent='Dễ';
  drawStats($('#statsChart'), state.stats);
  const themes=[...new Set(state.frames.map(f=>f.theme))]; const ft=$('#filterTheme'); themes.forEach(t=>{ const o=document.createElement('option'); o.value=t;o.textContent=t; ft.appendChild(o);});
}
init();

$('#btnOpenTranslate')?.addEventListener('click',()=> window.openTranslate && window.openTranslate());

(function initAccountPanel(){
  const nameEl=document.getElementById('accName');
  const hideCb=document.getElementById('prefHidePinyin');
  const accentSel=document.getElementById('accentSelect');
  const saveBtn=document.getElementById('saveAcc');
  const msg=document.getElementById('accMsg');

  if(hideCb){
    const stored=localStorage.getItem('hb:studyShowPinyin');
    const legacy=localStorage.getItem('studyShowPinyin');
    const flag=(stored??legacy??'1');
    hideCb.checked = flag!=='1';
  }
  if(accentSel){
    const storedAccent=localStorage.getItem('accentColor')||savedAccent||'green';
    accentSel.value = accentPalettes[storedAccent]? storedAccent : 'green';
  }

  syncAccountPanel=()=>{
    if(nameEl){
      const name=currentUser();
      nameEl.textContent = name || '(chưa)';
    }
  };
  syncAccountPanel();

  if(saveBtn){
    saveBtn.onclick=()=>{
      if(hideCb){
        const showValue=hideCb.checked?'0':'1';
        localStorage.setItem('hb:studyShowPinyin', showValue);
        localStorage.setItem('studyShowPinyin', showValue);
        const py=document.getElementById('pinyinText');
        if(py) py.hidden=hideCb.checked;
      }
      if(accentSel){
        const val=accentSel.value;
        localStorage.setItem('accentColor', val);
        applyAccentByName(val);
      }
      if(msg){
        msg.textContent='Đã lưu cài đặt.';
        msg.style.color='var(--ok)';
      }
    };
  }
})();

window.addEventListener('keydown',e=>{
  if(e.ctrlKey && (e.key==='k' || e.key==='K')){ e.preventDefault(); window.openTranslate && window.openTranslate(); }
  const inInput=['INPUT','TEXTAREA'].includes(document.activeElement?.tagName);
  if(!inInput && !$('#study').hidden){
    if(e.key==='j' || e.key==='J') $('#prevStudy')?.click();
    if(e.key==='k' || e.key==='K') $('#nextStudy')?.click();
  }
  if(!e.ctrlKey && !e.metaKey && !inInput && (e.key==='g' || e.key==='G') && currentUser()){
    routeTo('app');
    const tabBtn=document.querySelector('.tab[data-tab="account"]');
    if(tabBtn){ tabBtn.click(); } else { switchAppTab('account'); }
  }
});

(()=>{
  let sx=0, sy=0;
  const el=$('#study');
  el.addEventListener('touchstart',ev=>{ const t=ev.changedTouches[0]; sx=t.clientX; sy=t.clientY; },{passive:true});
  el.addEventListener('touchend',ev=>{
    const t=ev.changedTouches[0]; const dx=t.clientX-sx, dy=t.clientY-sy;
    if(Math.abs(dx)>40 && Math.abs(dy)<30){ (dx>0? $('#prevStudy'):$('#nextStudy')).click(); }
  },{passive:true});
})();

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js').catch(()=>{});
}

window.routeTo=routeTo;
window.openAuth=openAuth;
window.currentUser=currentUser;

export { state, norm, setAuthedUI, switchAppTab, currentUser, applyAccentByName };
