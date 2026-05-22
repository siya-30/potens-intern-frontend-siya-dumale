const CACHE_NAME =
"nivaad-cache-v1";

const urlsToCache = [

  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json"

];



// INSTALL
self.addEventListener(
  "install",
  (event) => {

    console.log(
      "Service Worker Installed"
    );

    event.waitUntil(

      caches.open(CACHE_NAME)
      .then((cache) => {

        return cache.addAll(
          urlsToCache
        );

      })

    );

  }
);



// FETCH
self.addEventListener(
  "fetch",
  (event) => {

    event.respondWith(

      caches.match(event.request)
      .then((response) => {

        return response ||
        fetch(event.request);

      })

    );

  }
);