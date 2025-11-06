const LANG_LABELS={
  'zh-CN':'ZH',
  vi:'VI',
  en:'EN'
};

function formatLang(code){
  return LANG_LABELS[code] || code.toUpperCase();
}

export function initTranslate(){
  const modal=document.getElementById('gtModal');
  const close=document.getElementById('gtClose');
  const input=document.getElementById('gtInput');
  const frame=document.getElementById('gtFrame');
  const openBtn=document.getElementById('gtOpenNew');
  const useCurrent=document.getElementById('gtUseCurrent');
  const info=document.getElementById('gtInfo');
  const swap=document.getElementById('gtSwap');
  if(!modal||!close||!input||!frame||!openBtn) return;

  const defaultInfo=info?.textContent||'';
  let sl='zh-CN';
  let tl='vi';
  let fallbackTimer=null;

  const resetInfo=()=>{ if(info) info.textContent=defaultInfo; };
  const showBlocked=()=>{ if(info) info.textContent='Trình duyệt có thể chặn iframe Google Dịch. Hãy bấm “Mở tab Google Dịch”.'; };

  const buildUrl=(text)=>{
    const query=encodeURIComponent(text||input.value||'你好');
    return `https://translate.google.com/?sl=${sl}&tl=${tl}&op=translate&text=${query}`;
  };

  const applySwapLabel=()=>{
    if(swap) swap.textContent=`Đổi ${formatLang(sl)}⇄${formatLang(tl)}`;
  };

  const loadFrame=url=>{
    clearTimeout(fallbackTimer);
    resetInfo();
    frame.src=url;
    fallbackTimer=window.setTimeout(showBlocked,800);
  };

  const openTranslate=(text='')=>{
    modal.hidden=false;
    const value=text||input.value||'你好';
    input.value=value;
    const url=buildUrl(value);
    openBtn.href=url;
    loadFrame(url);
  };

  const closeModal=()=>{
    modal.hidden=true;
    clearTimeout(fallbackTimer);
    frame.src='about:blank';
    resetInfo();
  };

  frame.addEventListener('load',()=>{
    clearTimeout(fallbackTimer);
    resetInfo();
  });

  close.addEventListener('click',closeModal);
  openBtn.rel='noopener';

  useCurrent?.addEventListener('click',()=>{
    const han=document.getElementById('hanText')?.textContent?.trim()||'';
    input.value=han;
    openTranslate(han);
  });

  swap?.addEventListener('click',()=>{
    [sl,tl]=[tl,sl];
    applySwapLabel();
    openTranslate();
  });
  applySwapLabel();
  openBtn.href=buildUrl('');

  window.openTranslate=openTranslate;
}
