const cacheStaticName = "static-v6";
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
    const caches = await self.caches.open(cacheStaticName);
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
}
async function networkFirst(request){
    const cache = await self.caches.open(cacheStaticName);
    try {
        const fetched = await fetch(request);
        return fetched;
    } catch (error) {
        const cached = cache.match('/index.html');
        return cached;
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