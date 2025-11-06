import { toast } from './components/toast.js';
import { enableVipParticles, disableVipParticles } from './vip.js';
export function initSettings(state, libs, onSaved){
  const $=q=>document.querySelector(q);
  function load(){
    try{
      const p=JSON.parse(localStorage.getItem('hb:prefs')||'null'); if(p) state.prefs=p;
      $('#setPinyinTone').checked = !!state.prefs.pinyinTone;
      $('#setAnim').checked = state.prefs.anim!==false;
      $('#setToast').checked = state.prefs.toast!==false;
      const av=localStorage.getItem(`hb:av:${state.user?.username||'guest'}`)||'😀';
      $('#avatarPicker').value=av;
      $('#accUser').textContent= state.user? state.user.username : 'Chưa đăng nhập';
      $('#accRole').textContent= state.user? state.user.role : '-';
      $('#accVip').textContent= state.user? (state.user.vip?'Có':'Không') : '-';
      $('#accCoin').textContent= state.user? (localStorage.getItem(`hb:coins:${state.user.username}`)||'0') : '0';
    }catch{}
  }
  load();

  document.getElementById('saveSettings').onclick=()=>{
    state.prefs={
      pinyinTone: document.getElementById('setPinyinTone').checked,
      anim: document.getElementById('setAnim').checked,
      toast: document.getElementById('setToast').checked
    };
    localStorage.setItem('hb:prefs', JSON.stringify(state.prefs));
    if(state.user?.vip && state.prefs.anim) enableVipParticles(); else disableVipParticles();
    onSaved?.(); if(state.prefs.toast!==false) toast('Đã lưu cài đặt');
  };

  const admTab=document.querySelector('.tab.admin');
  if(state.user?.role==='admin'){ admTab.hidden=false; } else { admTab.hidden=true; }

  const addBtn=document.getElementById('admAdd');
  const setBtn=document.getElementById('admSet');
  const msg=document.getElementById('admMsg');
  const createBtn=document.getElementById('admCreate'); const cmsg=document.getElementById('admCreateMsg');

  function ensureAdmin(){
    if(!state.user || state.user.role!=='admin'){ msg.style.color='var(--bad)'; msg.textContent='Bạn không phải admin'; return false; }
    return true;
  }
  addBtn.onclick=()=>{ if(!ensureAdmin()) return;
    const u=document.getElementById('admUser').value.trim(); const v=Number(document.getElementById('admValue').value||0);
    if(!u||!Number.isFinite(v)){ msg.style.color='var(--bad)'; msg.textContent='Nhập user & số hợp lệ'; return; }
    const key=`hb:coins:${u}`; const cur=Number(localStorage.getItem(key)||0); const next=Math.max(0,cur+v);
    localStorage.setItem(key, String(next)); msg.style.color='var(--ok)'; msg.textContent='Đã cộng coin'; if(state.user.username===u) document.getElementById('accCoin').textContent=String(next);
  };
  setBtn.onclick=()=>{ if(!ensureAdmin()) return;
    const u=document.getElementById('admUser').value.trim(); const v=Number(document.getElementById('admValue').value||0);
    if(!u||!Number.isFinite(v)){ msg.style.color='var(--bad)'; msg.textContent='Nhập user & số hợp lệ'; return; }
    const val=Math.max(0,Math.floor(v)); localStorage.setItem(`hb:coins:${u}`, String(val)); msg.style.color='var(--ok)'; msg.textContent='Đã đặt coin';
    if(state.user.username===u) document.getElementById('accCoin').textContent=String(val);
  };
  createBtn.onclick=()=>{ if(!ensureAdmin()) return;
    const u=document.getElementById('newUser').value.trim();
    const p=document.getElementById('newPass').value.trim();
    const vip=document.getElementById('newVip').checked;
    const role=document.getElementById('newRole').value;
    if(!u||!p){ cmsg.style.color='var(--bad)'; cmsg.textContent='Nhập đủ username/password'; return; }
    const overlay=JSON.parse(localStorage.getItem('hb:overlayUsers')||'{}');
    overlay[u]={username:u,password:p,role,vip,coins:0};
    localStorage.setItem('hb:overlayUsers', JSON.stringify(overlay));
    cmsg.style.color='var(--ok)'; cmsg.textContent='Đã tạo user overlay (chỉ lưu ở máy này)';
  };

  const expBtn=$('#btnExport'), impInput=$('#importFile'), clrBtn=$('#btnClear'), bmsg=$('#backupMsg');

  function collect(){
    const out={};
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(/^hb:/.test(k)) out[k]=localStorage.getItem(k);
    }
    return out;
  }
  function download(name, text){
    const a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([text],{type:'application/json'}));
    a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }
  expBtn.onclick=()=>{
    const data=collect();
    const dt=new Date(); const stamp=`${dt.getFullYear()}${String(dt.getMonth()+1).padStart(2,'0')}${String(dt.getDate()).padStart(2,'0')}`;
    download(`hb-backup-${stamp}.json`, JSON.stringify(data,null,2));
    bmsg.style.color='var(--ok)'; bmsg.textContent='Đã xuất dữ liệu';
  };
  impInput.onchange=async(e)=>{
    try{
      const file=e.target.files?.[0]; if(!file) return;
      const text=await file.text(); const obj=JSON.parse(text);
      Object.entries(obj).forEach(([k,v])=> localStorage.setItem(k,String(v)));
      bmsg.style.color='var(--ok)'; bmsg.textContent='Đã nhập dữ liệu (tải lại trang nếu cần)';
    }catch(err){ bmsg.style.color='var(--bad)'; bmsg.textContent='File không hợp lệ'; }
    e.target.value='';
  };
  clrBtn.onclick=()=>{
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i); if(/^hb:/.test(k)) keys.push(k);
    }
    keys.forEach(k=> localStorage.removeItem(k));
    bmsg.style.color='var(--accent)'; bmsg.textContent='Đã xoá dữ liệu của app trên máy này';
  };
}
