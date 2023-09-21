const CACHE_NAME = "abkuerzungs-quizz-cache";
const CACHE_VERSION = "v1.0";
const CACHE = CACHE_NAME + "-" + CACHE_VERSION;

const urlsToCache = [
    "index.html",
    "images/aq_logo.svg",
    "images/aq_logo_192.png",
    "images/aq_logo_512.png",
    "images/aq_logo_A.svg",
    "images/aq_logo_Q.svg",
    "images/feedback_icon_0.png",
    "images/feedback_icon_1.png",
    "images/feedback_icon_2.png",
    "images/feedback_icon_3.png",
    "images/feedback_icon_4.png",
    "images/feedback_icon_5.png",
    "images/maskable_icon.png",
    "sounds/0_points.mp3",
    "sounds/1_points.mp3",
    "sounds/2_points.mp3",
    "sounds/3_points.mp3",
    "sounds/4_points.mp3",
    "sounds/5_points.mp3",
    "sounds/correct_answer.mp3",
    "sounds/quiz_start.mp3",
    "sounds/wrong_answer.mp3",
    "scripts/app.js",
    "styles/app.css"
];

self.addEventListener("install", function (event) {
    "use strict";
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE).then(function (cache) {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    "use strict";
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            let fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function (response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== "basic") {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it, so we have two streams.
                    let responseToCache = response.clone();

                    caches.open(CACHE).then(function (cache) {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }
            );
        })
    );
});

self.addEventListener("activate", function (event) {
    "use strict";
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (cacheName) {
                if (cacheName.indexOf(CACHE_NAME) === 0 && cacheName.indexOf(CACHE_VERSION) === -1) {
                    console.log(cacheName + " deleted");
                    return caches.delete(cacheName);
                }
            }));
        })
    );
});