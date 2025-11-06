const toneMap = {
  a:['a','ā','á','ǎ','à'], e:['e','ē','é','ě','è'], i:['i','ī','í','ǐ','ì'],
  o:['o','ō','ó','ǒ','ò'], u:['u','ū','ú','ǔ','ù'], v:['ü','ǖ','ǘ','ǚ','ǜ'], ü:['ü','ǖ','ǘ','ǚ','ǜ']
};
function markSyllable(syl,num){
  if(!num||num==='0') return syl;
  let n=parseInt(num,10); if(!(n>=1&&n<=4)) return syl;
  let s=syl.replace('u:','v');
  const vowelIndex = (()=>{ for(const ch of ['a','o','e','i','u','v','ü']){ const idx=s.indexOf(ch); if(idx>-1) return {idx,ch}; } return null; })();
  if(!vowelIndex) return syl;
  const arr=s.split(''); arr[vowelIndex.idx]=toneMap[vowelIndex.ch][n];
  return arr.join('').replace(/v/g,'ü');
}
export function toToneMarked(text){
  if(!text) return '';
  return text.split(/\s+/).map(tok=>{
    const m=tok.match(/^([a-zü:]+)([1-5])?$/i);
    if(!m) return tok;
    return markSyllable(m[1].toLowerCase(), m[2]||'0');
  }).join(' ');
}
