export function initPractice(state, utils, hooks){
  const $=q=>document.querySelector(q);
  const $$=q=>Array.from(document.querySelectorAll(q));
  const setMode=m=>{ state.practice.mode=m; $('#modeName').textContent = m==='random'? 'Xáo trộn câu' : (m==='han2vi'? 'Hán → Việt' : 'Việt → Hán'); nextItem(true); };
  const setLevel=l=>{ state.practice.level=l; state.practice.useWrong=false; $('#levelName').textContent= l==='easy'? 'Dễ' : (l==='hard'? 'Khó' : 'Tất cả'); nextItem(true); };
  const refreshPool=()=>{
    if(state.practice.useWrong && state.wrongArr.length>0){ state.practice.pool = [...state.wrongArr]; $('#levelName').textContent='Ôn sai'; }
    else{
      state.practice.pool = state.practice.level==='easy'? [...state.easy] : (state.practice.level==='hard'? [...state.hard] : [...state.easy,...state.hard]);
    }
  };
  function nextItem(){
    refreshPool();
    if(state.practice.pool.length===0){ $('#prompt').textContent='Chưa có câu trong nhóm này.'; $('#hint').textContent=''; return; }
    state.practice.cur = state.practice.pool[Math.floor(Math.random()*state.practice.pool.length)];
    $('#answer').value=""; $('#result').textContent="";
    if(state.practice.mode==='random'){
      $('#prompt').textContent=state.practice.cur.han; $('#hint').textContent=`Pinyin: ${state.prefs?.pinyinTone && state.practice.cur.pinyin_num? state.practice.cur.pinyin_num : state.practice.cur.pinyin}`;
    }else if(state.practice.mode==='han2vi'){
      $('#prompt').textContent=state.practice.cur.han; $('#hint').textContent='Dịch sang tiếng Việt, dùng “bạn”, câu hỏi dùng “phải không?”';
    }else{
      $('#prompt').textContent=state.practice.cur.vi; $('#hint').textContent='Dịch sang tiếng Hán (ưu tiên chữ Hán)';
    }
  }
  const vib=pattern=>{ try{ navigator.vibrate && navigator.vibrate(pattern); }catch{} };
  function check(){
    const norm=utils.norm;
    const a=$('#answer').value; let ok=false, expect='';
    const cur=state.practice.cur;
    if(state.practice.mode==='random'){ ok=norm(a)===norm(cur.vi)||norm(a)===norm(cur.han)||norm(a)===norm(cur.pinyin); expect=`${cur.han} ⇄ ${cur.vi}`; }
    else if(state.practice.mode==='han2vi'){ ok=norm(a)===norm(cur.vi); expect=cur.vi; }
    else { ok=norm(a)===norm(cur.han); expect=`${cur.han}`; }
    const res=$('#result');
    if(ok){ res.textContent='Chính xác!'; res.style.color='var(--ok)'; state.stats.correct++; state.stats.streak++; removeWrong(cur); vib(20); }
    else{ res.innerHTML=`Sai rồi. Đáp án: <span class="hl">${expect}</span>`; res.style.color='var(--bad)'; state.stats.wrong++; state.stats.streak=0; addWrong(cur); vib([20,80,20]); }
    state.stats.total=state.stats.correct+state.stats.wrong; hooks.onStatsChange();
  }
  function addWrong(item){ if(!state.wrongPool.has(item.han)){ state.wrongPool.add(item.han); state.wrongArr=[...state.wrongArr,item]; hooks.onWrongPoolChange(); }}
  function removeWrong(item){ if(state.wrongPool.has(item.han)){ state.wrongPool.delete(item.han); state.wrongArr=state.wrongArr.filter(x=>x.han!==item.han); hooks.onWrongPoolChange(); }}

  let timerId=null, timeLeft=60;
  function updateTimer(){ $('#timer').textContent=timeLeft; }
  function stopTimer(){ if(timerId){ clearInterval(timerId); timerId=null; } }
  function startTimer(){
    stopTimer(); timeLeft=60; updateTimer();
    timerId=setInterval(()=>{
      timeLeft--; updateTimer();
      if(timeLeft<=0){
        stopTimer();
        const res=$('#result'); const cur=state.practice.cur;
        res.innerHTML=`Hết giờ! Đáp án: <span class="hl">${state.practice.mode==='vi2han'? cur.han : cur.vi}</span>`;
        res.style.color='var(--bad)';
        state.stats.wrong++; state.stats.streak=0; state.stats.total=state.stats.correct+state.stats.wrong; hooks.onStatsChange(); addWrong(cur);
        nextItem(); startTimer();
      }
    },1000);
  }
  $('#startTimer').onclick=startTimer; $('#stopTimer').onclick=stopTimer;

  $$('#practice .btn').forEach(btn=>{
    if(btn.dataset.mode) btn.onclick=()=>setMode(btn.dataset.mode);
    if(btn.dataset.level) btn.onclick=()=>{ state.practice.useWrong=false; setLevel(btn.dataset.level); };
  });
  $('#mixAll').onclick=()=>{ state.practice.useWrong=false; setLevel('all'); };
  $('#check').onclick=check;
  $('#show').onclick=()=>{ $('#result').innerHTML=`Đáp án: <span class="hl">${state.practice.mode==='vi2han'? state.practice.cur.han : state.practice.cur.vi}</span>`; $('#result').style.color='var(--accent)'; };
  $('#next').onclick=()=>nextItem();
  $('#resetStats').onclick=()=>{ state.stats.correct=state.stats.wrong=state.stats.total=state.stats.streak=0; hooks.onStatsChange(); $('#result').textContent='Đã reset điểm.'; $('#result').style.color='var(--accent)'; };
  $('#toggleWrongPool').onclick=()=>{ state.practice.useWrong=!state.practice.useWrong; if(state.practice.useWrong && state.wrongArr.length===0){ state.practice.useWrong=false; $('#result').textContent='Chưa có câu sai để ôn.'; $('#result').style.color='var(--accent)'; return; } nextItem(); };
  window.addEventListener('keydown',e=>{ if(e.key==='Enter' && document.activeElement===$('#answer')) check(); });

  setLevel('easy'); setMode('random'); nextItem();
}
