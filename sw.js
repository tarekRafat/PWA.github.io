//listen to events
// 1- install event => set caches
// 2- activate event => clear old caches
// 3- fetch event => return response to user

let cachname = "static-cache-v";
let cachAssets = [
  "./index.html",
  "./about.html",
  "./contact.html",
  "./style.css",
  "./img/home.jpg",
  "./img/contact.jfif",
  "./img/about.png",
  "./failback.json",
];
// 1- install event => set caches
self.addEventListener("install", async function () {
  let createdCache = await caches.open(cachname);
  await createdCache.addAll(cachAssets);
  await self.skipWaiting();
});
// 2- activate event => clear old caches
self.addEventListener("activate", async function () {
  // let allCaches = await caches.keys();
  // allCaches.forEach(async (chach, i) => {
  //   if (chach != cachname) {
  //     caches.delete(chach);
  //   }
  // });
});

// 3- fetch event => return response to user
self.addEventListener("fetch", async function (e) {
  console.log("fetch", e.request);
  if (!navigator.onLine) {
    return await e.respondWith(cacheFirst(e.request));
  } else {
    return await e.respondWith(networkFirst(e.request));
  }
});

let cacheFirst = async req => {
  return (await caches.match(req)) || (await caches.match("failback.json"));
};

let networkFirst = async req => {
  //create dynamic cache
  let dynamicCache = await caches.open("cache-dynamic");
  //take response for fetched request
  let resp = await fetch(req);
  //cache response inside dynamic cache
  await dynamicCache.put(req, resp.clone());
  //return response to user
  return resp;
};
