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
        workbox.precaching.precacheAndRoute([
  {
    "url": "api/appropriates.json",
    "revision": "89721ab544d34a8c1d1e482a1937b1d4"
  },
  {
    "url": "api/chapters.json",
    "revision": "68f485f90b710a743a3d4214b58a988d"
  },
  {
    "url": "api/phrases.json",
    "revision": "b1b16dc48796eeb50fc38886bd9cea70"
  },
  {
    "url": "asset-manifest.json",
    "revision": "eedfaa1a18db32b1e23b507a22116e81"
  },
  {
    "url": "favicons/favicon-114.png",
    "revision": "bb35c02f740e719ce63967ba7911644b"
  },
  {
    "url": "favicons/favicon-120.png",
    "revision": "ae16b686c84f7e4fc2f4ac45189cf3a3"
  },
  {
    "url": "favicons/favicon-144.png",
    "revision": "d3310356edbf40bfedcb123b62cd2b4a"
  },
  {
    "url": "favicons/favicon-150.png",
    "revision": "e7e668a36bbc64c05525b76722cd97a9"
  },
  {
    "url": "favicons/favicon-152.png",
    "revision": "6940cbd72ba9c5f609240b2ac614be4b"
  },
  {
    "url": "favicons/favicon-16.png",
    "revision": "a5d03a04a1ed987e0905eafda758e6ef"
  },
  {
    "url": "favicons/favicon-160.png",
    "revision": "13495f0b3696c16a3c8071a0a7ca5b6c"
  },
  {
    "url": "favicons/favicon-180.png",
    "revision": "fb3f3125fc6268526f7eac032d2caad2"
  },
  {
    "url": "favicons/favicon-192.png",
    "revision": "ea1afb23a293ed7b7d43b2c02257aa12"
  },
  {
    "url": "favicons/favicon-310.png",
    "revision": "02ce5ca801bed294adaa945085ef5ced"
  },
  {
    "url": "favicons/favicon-32.png",
    "revision": "04bbf4926ef58caf6e7002fabf0b55e6"
  },
  {
    "url": "favicons/favicon-57.png",
    "revision": "79d1e4a0736de2967abfe2d35dde6b93"
  },
  {
    "url": "favicons/favicon-60.png",
    "revision": "daa08abaa49515e8b61af701db33c7a4"
  },
  {
    "url": "favicons/favicon-64.png",
    "revision": "2311f3eb562c85b734c8e1515fc1b192"
  },
  {
    "url": "favicons/favicon-70.png",
    "revision": "19bdeb3b099814ff86a36437b02b2beb"
  },
  {
    "url": "favicons/favicon-72.png",
    "revision": "93d407f562e23f5e2800e470d731ce67"
  },
  {
    "url": "favicons/favicon-76.png",
    "revision": "179fb5417eff8acc038ed9dcffbd1eab"
  },
  {
    "url": "favicons/favicon-96.png",
    "revision": "1d21354a3064ff784bbe5a99ee98ad63"
  },
  {
    "url": "index.html",
    "revision": "0a6d457d4620d5f10055b667a352f6bc"
  },
  {
    "url": "logo192.png",
    "revision": "329ada229a7053a1ac35fc3735ff3756"
  },
  {
    "url": "logo512.png",
    "revision": "6194d629192c27850ac8f785a8e72686"
  },
  {
    "url": "manifest.json",
    "revision": "3814a2bd6caa6d932a85302dabe87ee8"
  },
  {
    "url": "precache-manifest.25ff11eeec5ca920b4e9f3b91d8229a7.js",
    "revision": "25ff11eeec5ca920b4e9f3b91d8229a7"
  },
  {
    "url": "service-worker.js",
    "revision": "3b1f4a74b2bf4d2c548464fb57b0e219"
  },
  {
    "url": "static/js/2.ac79bb24.chunk.js",
    "revision": "08fa2fdd650ec374a62f9da6385424b9"
  },
  {
    "url": "static/js/main.20427035.chunk.js",
    "revision": "8a312f75832935459fe0af973d29f539"
  },
  {
    "url": "static/js/runtime-main.b7c1313f.js",
    "revision": "5f42dc16fe32683f79abdccbd4da0f82"
  },
  {
    "url": "static/media/left-arrow.c637926a.svg",
    "revision": "c637926a5d332ec9ac7f08c58d30e419"
  },
  {
    "url": "static/media/menu.a6f6f4eb.svg",
    "revision": "a6f6f4eb154d589956bbf0ff019cb46e"
  }
]);

        /* custom cache rules*/
        workbox.routing.registerNavigationRoute('/index.html', {
            blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
        });
    } else {
        console.log('Workbox could not be loaded. No Offline support');
    }
}
