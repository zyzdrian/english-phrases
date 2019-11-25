if ('function' === typeof importScripts) {
    importScripts(
        'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
    );
    /* global workbox */
    if (workbox) {
        console.log('Workbox is loaded');

        self.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'SKIP_WAITING') {
                self.skipWaiting();
            }
        });

        workbox.core.clientsClaim();

        /* injection point for manifest files.  */
        workbox.precaching.precacheAndRoute([]);

        /* custom cache rules*/
        workbox.routing.registerNavigationRoute('/index.html', {
            blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
        });
    } else {
        console.log('Workbox could not be loaded. No Offline support');
    }
}
