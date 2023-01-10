const cacheStaticName = "static-v6";
const cachedDynamycName = "dynamyc-v6";
const filesForCache = generateStaticUrls();
self.addEventListener('install', onInstallingWorker);
self.addEventListener('fetch', onFetchingWorker);
self.addEventListener('activate', onActivatingWorker);
async function onInstallingWorker(event) {
    try{
        const caches = await self.caches.open(cacheStaticName);
        console.log(filesForCache);
        await caches.addAll(filesForCache);
    }catch(err){
        console.log(err.message);
    }
}
async function onActivatingWorker(event){
    const cachesNames = await self.caches.keys();
    Promise.all(
        cachesNames.filter(name => name !== cacheStaticName)
        .filter(name => name !== cachedDynamycName)
        .map(name => self.caches.delete(name))
    )
}
async function onFetchingWorker(event){
    const { request } = event;
    const url = new URL(request.url);
    if (url.origin === location.origin){
        event.respondWith(cacheFirst(request));
    }else{
        networkFirst(request);
    }
}
async function cacheFirst(request){
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
}
async function networkFirst(request){
    const cache = await self.caches.open(cachedDynamycName);
    try {
        const fetched = await fetch(request);
        await cache.put(request, fetched.clone());
        return fetched;
    } catch (error) {
        const cached = await cache.match(request);
        return cached ?? await cache.match('./index.html');
    }
}
function generateStaticUrls(){
    const result = [
        './index.html',
        './css/style.min.css',
        './js/script.min.js',
    ];
    return result;
}