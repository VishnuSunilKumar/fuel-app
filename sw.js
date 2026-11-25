const C='fuel-v3';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','icon-192.png','icon-512.png'])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!=C&&k!='fuel-model').map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=e.request.url;if(e.request.method!='GET'||!u.startsWith(self.location.origin))return;
 e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(C).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('periodicsync',e=>{if(e.tag=='fuel-water')e.waitUntil(self.registration.showNotification('Time to drink water',{body:'Open Fuel to log your intake.',icon:'icon-192.png',tag:'fuel-water'}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(l=>l.length?l[0].focus():clients.openWindow('./')))});
