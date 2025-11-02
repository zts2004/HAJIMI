// Service Worker for PWA offline support
const CACHE_NAME = 'love-quotes-v1';
// 根据实际路径调整（GitHub Pages可能在子目录）
const BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');
const urlsToCache = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'styles.css',
  BASE_PATH + 'app.js',
  BASE_PATH + 'manifest.json'
];

// 安装Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截请求，使用缓存
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果在缓存中找到，返回缓存版本
        if (response) {
          return response;
        }
        // 否则从网络获取
        return fetch(event.request);
      }
    )
  );
});

// 更新Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

