import { toast } from './components/toast.js';
export function initAuth(){ /* reserved for future split */ }

export function setUserCoins(username, value){
  localStorage.setItem(`hb:coins:${username}`, String(Math.max(0,Math.floor(value||0))));
}
export function getUserCoins(username){
  return Number(localStorage.getItem(`hb:coins:${username}`) ?? 0);
}
export function createLocalUser(u){
  const overlayKey='hb:overlayUsers';
  const db=JSON.parse(localStorage.getItem(overlayKey)||'{}');
  if(db[u.username]) throw new Error('User đã tồn tại (overlay)');
  db[u.username]=u;
  localStorage.setItem(overlayKey, JSON.stringify(db));
  toast('Đã tạo user overlay');
}
