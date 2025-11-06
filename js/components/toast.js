let box;
export function toast(msg){
  const prefs=JSON.parse(localStorage.getItem('hb:prefs')||'{}');
  if(prefs.toast===false) return;
  if(!box){ box=document.createElement('div'); box.style.cssText='position:fixed;right:12px;bottom:12px;display:flex;flex-direction:column;gap:8px;z-index:90'; document.body.appendChild(box); }
  const t=document.createElement('div');
  t.textContent=msg;
  t.style.cssText='background:#111a34;color:#e7ecf7;border:1px solid #2a3555;border-radius:12px;padding:10px 14px;transform:translateY(8px);opacity:.0;transition:.2s';
  box.appendChild(t);
  requestAnimationFrame(()=>{ t.style.opacity='1'; t.style.transform='translateY(0)'; });
  setTimeout(()=>{ t.style.opacity='.0'; t.style.transform='translateY(8px)'; setTimeout(()=>t.remove(),200); }, 2400);
}
