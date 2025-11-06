export function initTranslate(){
  const $=q=>document.querySelector(q);
  const modal=$('#gtModal'); const close=$('#gtClose'); const input=$('#gtInput');
  const btnUse=$('#gtUseCurrent'); const a=$('#gtOpenNew'); const frame=$('#gtFrame');

  close.onclick=()=> modal.hidden=true;
  window.openTranslate=()=>{ modal.hidden=false; try{ frame.src='https://translate.google.com/?sl=zh-CN&tl=vi&op=translate'; }catch{} };

  btnUse.onclick=()=>{
    const curHan=document.getElementById('hanText')?.textContent||'';
    input.value=curHan;
  };
  a.href='https://translate.google.com/?sl=zh-CN&tl=vi&op=translate';
}
