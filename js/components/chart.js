export function drawStats(canvas, stats){
  if(!canvas) return; const ctx=canvas.getContext('2d');
  const w=canvas.width, h=canvas.height; ctx.clearRect(0,0,w,h);
  ctx.strokeStyle='rgba(77,163,255,.5)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(30,10); ctx.lineTo(30,h-20); ctx.lineTo(w-10,h-20); ctx.stroke();
  const values=[stats.correct, stats.wrong, Math.round(stats.total? (stats.correct*100/stats.total):0)];
  const colors=['#39d98a','#ff6b6b','#4da3ff'];
  const labels=['Đúng','Sai','%'];
  const max=Math.max(1, ...values.slice(0,2), 100);
  const barw=(w-60)/3 - 20;
  values.forEach((v,i)=>{
    const x=50 + i*(barw+30);
    const barh = (i<2) ? ((h-60)*(v/max)) : ((h-60)*(v/100));
    ctx.fillStyle=colors[i]; ctx.fillRect(x, (h-20)-barh, barw, barh);
    ctx.fillStyle='rgba(231,236,247,.9)'; ctx.font='12px system-ui';
    ctx.fillText(labels[i], x, h-6);
    ctx.fillText(String(v), x, (h-25)-barh);
  });
}
