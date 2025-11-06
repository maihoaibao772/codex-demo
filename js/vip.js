let running=false, rafId=null;
export function renderVipFrame(container, opts={}){
  const {preset='pulse'}=opts;
  container.classList.remove('spin','pulse','float','wave','spark');
  if(preset==='composite'){ container.classList.add('pulse'); }
  else container.classList.add(map(preset));
}
function map(p){ return ({spin:'spin',pulse:'pulse',float:'float',orbit:'spin',twinkle:'spark',wave:'wave',feather:'float',spark:'spark'})[p]||'spin'; }

let canvas, ctx, particles=[];
function initCanvas(){
  if(canvas) return;
  canvas=document.createElement('canvas'); canvas.id='vipParticles';
  Object.assign(canvas.style,{position:'fixed',inset:'0',pointerEvents:'none',zIndex:'5',opacity:'0.35'});
  document.body.appendChild(canvas);
  ctx=canvas.getContext('2d'); onResize(); window.addEventListener('resize',onResize);
}
function onResize(){ if(!canvas) return; canvas.width=innerWidth; canvas.height=innerHeight; }
function seed(n=80){
  particles=Array.from({length:n},()=>({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*1.8+0.4,
    a:Math.random()*Math.PI*2,
    v:0.2+Math.random()*0.6
  }));
}
function step(){
  if(!running) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='rgba(255,215,0,0.9)';
  particles.forEach(p=>{
    p.a+=0.01; p.x+=Math.cos(p.a)*p.v; p.y+=Math.sin(p.a)*p.v;
    if(p.x<0) p.x=canvas.width; if(p.x>canvas.width) p.x=0;
    if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
  });
  rafId=requestAnimationFrame(step);
}
export function enableVipParticles(){ initCanvas(); seed(70); if(!running){ running=true; step(); } }
export function disableVipParticles(){ running=false; if(rafId) cancelAnimationFrame(rafId); if(canvas){ canvas.remove(); canvas=null; } }
