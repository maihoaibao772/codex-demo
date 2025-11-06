const CACHE='hb-cache-v5';
const ASSETS=[
  '/', '/index.html',
  '/css/style.css','/css/animations.css',
  '/js/app.js','/js/auth.js','/js/practice.js','/js/shop.js','/js/settings.js','/js/translate.js','/js/vip.js','/js/audio.js',
  '/js/components/toast.js','/js/components/chart.js','/js/utils/pinyinTone.js',
  '/data/users.json','/data/vocab.json','/data/sentences_easy.json','/data/sentences_hard.json','/data/frames.json','/data/ui_version.json',
  '/cheatsheet.html','/offline.html'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k===CACHE?null:caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET'){ return; }
  e.respondWith(
    caches.match(req).then(hit=> hit || fetch(req).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(req,copy));
      return res;
    }).catch(()=> caches.match('/offline.html')))
  );
});
