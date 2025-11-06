import { toast } from './components/toast.js';
export function initShop(state, wallet){
  const $=q=>document.querySelector(q);
  const grid=$('#shopGrid'); const preview=$('#framePreview');
  const nameEl=$('#previewName'); const metaEl=$('#previewMeta');
  const btnBuy=$('#btnBuy'), btnEquip=$('#btnEquip'), btnUnequip=$('#btnUnequip'), msg=$('#shopMsg');

  let current=null;
  const invKey=()=> `hb:inv:${state.user?.username||'guest'}`;
  function getInv(){ try{return JSON.parse(localStorage.getItem(invKey())||'{"frames":[]}')}catch{ return {frames:[]} } }
  function setInv(v){ localStorage.setItem(invKey(), JSON.stringify(v)); }
  function isOwned(id){ return getInv().frames.includes(id) || (id==='vip_angel_gold' && state.user?.vip); }
  function equip(id){ if(!state.user) return; localStorage.setItem(`hb:eq:${state.user.username}`, id||''); toast(id?'Đã trang bị khung':'Đã tháo khung'); }
  function equipped(){ return localStorage.getItem(`hb:eq:${state.user?.username}`)||''; }

  function previewFrame(f){
    current=f; nameEl.textContent=f? f.name : '';
    metaEl.textContent=f? `${f.theme} • ${f.rarity} • ${f.animated?'Animated':''}` : '';
    preview.className='frame ring';
    preview.style.border='2px dashed rgba(255,255,255,.2)';
    if(!f) return;
    if(f.animated){
      preview.classList.add(mapPresetClass(f.animPreset));
    }
  }
  function mapPresetClass(p){ return ({spin:'spin',pulse:'pulse',float:'float',orbit:'spin',twinkle:'spark',wave:'wave',feather:'float',spark:'spark',composite:'pulse'})[p]||'spin'; }

  function renderList(){
    const theme=$('#filterTheme').value; const only=$('#filterAnim').value; const sort=$('#sortPrice').value;
    let list=[...state.frames];
    if(theme) list=list.filter(f=>f.theme===theme);
    if(only==='animated') list=list.filter(f=>f.animated);
    if(only==='static') list=list.filter(f=>!f.animated);
    if(only==='owned') list=list.filter(f=>isOwned(f.id));
    list.sort((a,b)=> sort==='asc'? a.price-b.price : b.price-a.price );
    grid.innerHTML = list.map(f=>{
      const owned=isOwned(f.id); const eq=equipped()===f.id;
      return `<div class="card" data-id="${f.id}">
        <div class="row gap">
          <div class="avatarPreview smallPrev">
            <div class="frame ring ${f.animated?mapPresetClass(f.animPreset):''}"></div>
            <div class="avatarEmoji">😀</div>
          </div>
          <div>
            <b>${f.name}</b> <span class="muted">• ${f.theme} • ${f.rarity}</span>
            <div class="muted">Giá: 🟡 ${f.price} ${f.id==='vip_angel_gold'?'(VIP only)':''}</div>
            <div class="muted">${owned? (eq? 'Đang trang bị' : 'Đã sở hữu') : ''}</div>
          </div>
        </div>
      </div>`;
    }).join('');
    [...grid.querySelectorAll('.card')].forEach(c=> c.onclick=()=>{
      const id=c.getAttribute('data-id'); const f=state.frames.find(x=>x.id===id); previewFrame(f);
    });
  }

  function ensureUser(){ if(!state.user){ msg.style.color='var(--bad)'; msg.textContent='Cần đăng nhập'; return false; } return true; }

  btnBuy.onclick=()=>{
    if(!ensureUser()||!current) return;
    if(current.id==='vip_angel_gold'){ msg.style.color='var(--bad)'; msg.textContent='Khung VIP không bán'; return; }
    if(isOwned(current.id)){ msg.style.color='var(--accent)'; msg.textContent='Đã sở hữu'; return; }
    const bal=wallet.getCoins(state.user.username);
    if(bal<current.price){ msg.style.color='var(--bad)'; msg.textContent='Không đủ coin'; return; }
    wallet.setCoins(state.user.username, bal-current.price);
    const inv=getInv(); inv.frames.push(current.id); setInv(inv);
    msg.style.color='var(--ok)'; msg.textContent='Mua thành công!'; renderList();
  };
  btnEquip.onclick=()=>{ if(!ensureUser()||!current) return; if(!isOwned(current.id)){ msg.style.color='var(--bad)'; msg.textContent='Chưa sở hữu'; return; } equip(current.id); msg.style.color='var(--ok)'; msg.textContent='Đã trang bị'; renderList(); };
  btnUnequip.onclick=()=>{ if(!ensureUser()) return; equip(''); msg.style.color='var(--accent)'; msg.textContent='Đã tháo'; renderList(); };

  const avatarEmoji=document.getElementById('avatarEmoji');
  const picker=document.getElementById('avatarPicker'); const save=document.getElementById('saveAvatar');
  save.onclick=()=>{ if(!state.user){ toast('Cần đăng nhập'); return; } const e=(picker.value||'😀').slice(0,2); avatarEmoji.textContent=e; localStorage.setItem(`hb:av:${state.user?.username||'guest'}`, e); window.dispatchEvent(new Event('hb:avatar-change')); toast('Đã lưu avatar'); };

  $('#filterTheme').onchange=renderList; $('#filterAnim').onchange=renderList; $('#sortPrice').onchange=renderList;

  setTimeout(()=>{ renderList(); previewFrame(state.frames[0]); },0);
}
