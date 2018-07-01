// Cache version
const cacheName = 'v11.1.1';

const cachedFiles = [
	'./',
	'./index.html',
	'./js/app.js',
	'./css/reset.css',
	'./css/style.css',
	'./assets/caret.png',
]


self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Installed');

	// e.waitUntil Delays the event until the Promise is resolved
	e.waitUntil(

		// Open the cache
		caches.open(cacheName).then(function (cache) {

			// Add all the default files to the cache
			console.log('[ServiceWorker] Caching files');
			return cache.addAll(cachedFiles);
		})
	); // end e.waitUntil
});


self.addEventListener('activate', function (e) {
	console.log('[ServiceWorker] Activated');

	e.waitUntil(

		// Get all the cache keys (cacheName)
		caches.keys().then(function (cacheNames) {
			return Promise.all(cacheNames.map(function (thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheName) {

					// Deletes cached file
					console.log('[ServiceWorker] Deleting Cached Files of - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	);

});

self.addEventListener('fetch', function (e) {
	console.log('[ServiceWorker] Fetch', e.request.url);

	e.respondWith(
		caches.match(e.request).then(function (response) {

			if (response) {
				console.log('[ServiceWorker] Found in cache', e.request.url, response);
				return response;
			}

			const requestClone = e.request.clone();

			return fetch(requestClone)
				.then(function (response) {
					if (!response) {
						console.log('[ServiceWorker] No response from fetch');
						return response;
					}

					const responseClone = response.clone();

					caches.open(cacheName).then(function (cache) {
						console.log('[ServiceWorker] New data', e.request.url);
						cache.put(e.request, responseClone);
						return response;

					});

				})
				.catch(function (err) {
					console.log('[ServiceWorker] Error fetching new data');
				})

		})

	)
});

self.addEventListener('fetch', function (e) {
  const database_url = 'https://free.currencyconverterapi.com/api/v5/currencies';

  if (e.request.url.indexOf(database_url) === 0) {
    e.respondWith(

      fetch(e.request).then(response =>
        caches.open(dataCacheName).then(cache => {

          cache.put(e.request.url, response.clone());
          return response;
        }),
      ),
    );
  } else {
    e.respondWith(
      caches
        .match(e.request)

        .then(response => response || fetch(e.request)),
    );
  }
});
