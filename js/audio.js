function showAudioError(message){
  const out=document.getElementById('selfResult')||document.getElementById('result');
  if(out){
    out.textContent=message;
    out.style.color='var(--bad)';
  }
}

function ensureAudioElement(store){
  if(!store.audio){
    const el=new Audio();
    el.style.display='none';
    document.body.appendChild(el);
    store.audio=el;
  }
  return store.audio;
}

function initTts(){
  const speakBtn=document.getElementById('speak');
  if(!speakBtn) return;
  if(!('speechSynthesis' in window)){
    speakBtn.addEventListener('click',()=>showAudioError('Thiết bị không hỗ trợ TTS.'));
    return;
  }
  const getVoices=()=>{
    const voices=speechSynthesis.getVoices();
    if(voices.length) return Promise.resolve(voices);
    return new Promise(resolve=>{
      const handler=()=>{
        speechSynthesis.removeEventListener('voiceschanged',handler);
        resolve(speechSynthesis.getVoices());
      };
      speechSynthesis.addEventListener('voiceschanged',handler);
    });
  };
  speakBtn.addEventListener('click',async()=>{
    const text=document.getElementById('hanText')?.textContent?.trim();
    if(!text) return;
    try{
      const voices=await getVoices();
      const utter=new SpeechSynthesisUtterance(text);
      utter.lang='zh-CN';
      const zh=voices.find(v=>/zh|cmn|chinese/i.test(`${v.lang||''}${v.name||''}`));
      if(zh) utter.voice=zh;
      speechSynthesis.cancel();
      speechSynthesis.speak(utter);
    }catch{
      showAudioError('Thiết bị không hỗ trợ TTS.');
    }
  });
}

function initRecorder(){
  const recBtn=document.getElementById('recBtn');
  const playBtn=document.getElementById('playRecBtn');
  if(!recBtn && !playBtn) return;
  if(!navigator.mediaDevices || typeof window.MediaRecorder==='undefined'){
    recBtn?.remove();
    playBtn?.remove();
    return;
  }
  const store={audio:null};
  let recorder=null;
  let chunks=[];
  let stream=null;
  const idleLabel=recBtn?.textContent||'🎙️ Ghi';
  if(playBtn) playBtn.disabled=true;

  recBtn?.addEventListener('click',async()=>{
    if(recorder && recorder.state==='recording'){
      recorder.stop();
      return;
    }
    try{
      stream=await navigator.mediaDevices.getUserMedia({audio:true});
      recorder=new MediaRecorder(stream);
      chunks=[];
      recorder.ondataavailable=e=>{ if(e.data?.size) chunks.push(e.data); };
      recorder.onstop=()=>{
        try{ stream?.getTracks().forEach(t=>t.stop()); }catch{}
        stream=null;
        const audioEl=ensureAudioElement(store);
        const blob=new Blob(chunks,{type:recorder.mimeType||'audio/webm'});
        audioEl.src=URL.createObjectURL(blob);
        if(playBtn) playBtn.disabled=false;
        if(recBtn) recBtn.textContent=idleLabel;
      };
      recorder.start();
      if(recBtn) recBtn.textContent='⏺️ Đang ghi…';
      if(playBtn) playBtn.disabled=true;
    }catch{
      if(recBtn) recBtn.textContent=idleLabel;
      showAudioError('Không truy cập được micro.');
    }
  });

  playBtn?.addEventListener('click',()=>{
    const audioEl=ensureAudioElement(store);
    if(audioEl?.src){
      audioEl.play().catch(()=>{});
    }
  });
}

export function initAudio(){
  initTts();
  initRecorder();
}
