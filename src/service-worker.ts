/// <reference types="@sveltejs/kit" />
self.addEventListener('install', (event) => {
    event.waitUntil(console.log('installed'));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(console.log('activated'));
});

