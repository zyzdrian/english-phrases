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
    "url": "english-phrases/api/appropriates.json",
    "revision": "89721ab544d34a8c1d1e482a1937b1d4"
  },
  {
    "url": "english-phrases/api/chapters.json",
    "revision": "68f485f90b710a743a3d4214b58a988d"
  },
  {
    "url": "english-phrases/api/phrases.json",
    "revision": "b1b16dc48796eeb50fc38886bd9cea70"
  },
  {
    "url": "english-phrases/asset-manifest.json",
    "revision": "8181a32320e12d5c0587cbc0aad86e4a"
  },
  {
    "url": "english-phrases/favicons/favicon-114.png",
    "revision": "bb35c02f740e719ce63967ba7911644b"
  },
  {
    "url": "english-phrases/favicons/favicon-120.png",
    "revision": "ae16b686c84f7e4fc2f4ac45189cf3a3"
  },
  {
    "url": "english-phrases/favicons/favicon-144.png",
    "revision": "d3310356edbf40bfedcb123b62cd2b4a"
  },
  {
    "url": "english-phrases/favicons/favicon-150.png",
    "revision": "e7e668a36bbc64c05525b76722cd97a9"
  },
  {
    "url": "english-phrases/favicons/favicon-152.png",
    "revision": "6940cbd72ba9c5f609240b2ac614be4b"
  },
  {
    "url": "english-phrases/favicons/favicon-16.png",
    "revision": "a5d03a04a1ed987e0905eafda758e6ef"
  },
  {
    "url": "english-phrases/favicons/favicon-160.png",
    "revision": "13495f0b3696c16a3c8071a0a7ca5b6c"
  },
  {
    "url": "english-phrases/favicons/favicon-180.png",
    "revision": "fb3f3125fc6268526f7eac032d2caad2"
  },
  {
    "url": "english-phrases/favicons/favicon-192.png",
    "revision": "ea1afb23a293ed7b7d43b2c02257aa12"
  },
  {
    "url": "english-phrases/favicons/favicon-310.png",
    "revision": "02ce5ca801bed294adaa945085ef5ced"
  },
  {
    "url": "english-phrases/favicons/favicon-32.png",
    "revision": "04bbf4926ef58caf6e7002fabf0b55e6"
  },
  {
    "url": "english-phrases/favicons/favicon-57.png",
    "revision": "79d1e4a0736de2967abfe2d35dde6b93"
  },
  {
    "url": "english-phrases/favicons/favicon-60.png",
    "revision": "daa08abaa49515e8b61af701db33c7a4"
  },
  {
    "url": "english-phrases/favicons/favicon-64.png",
    "revision": "2311f3eb562c85b734c8e1515fc1b192"
  },
  {
    "url": "english-phrases/favicons/favicon-70.png",
    "revision": "19bdeb3b099814ff86a36437b02b2beb"
  },
  {
    "url": "english-phrases/favicons/favicon-72.png",
    "revision": "93d407f562e23f5e2800e470d731ce67"
  },
  {
    "url": "english-phrases/favicons/favicon-76.png",
    "revision": "179fb5417eff8acc038ed9dcffbd1eab"
  },
  {
    "url": "english-phrases/favicons/favicon-96.png",
    "revision": "1d21354a3064ff784bbe5a99ee98ad63"
  },
  {
    "url": "english-phrases/index.html",
    "revision": "87e3a63207c600176caee774f74ba52f"
  },
  {
    "url": "english-phrases/logo192.png",
    "revision": "329ada229a7053a1ac35fc3735ff3756"
  },
  {
    "url": "english-phrases/logo512.png",
    "revision": "6194d629192c27850ac8f785a8e72686"
  },
  {
    "url": "english-phrases/manifest.json",
    "revision": "1700e7fa9f794552623e105869286110"
  },
  {
    "url": "english-phrases/precache-manifest.26858e102a04091e348fe3997a475d70.js",
    "revision": "26858e102a04091e348fe3997a475d70"
  },
  {
    "url": "english-phrases/service-worker.js",
    "revision": "8a120ce0887dd817ea452b0a2904e012"
  },
  {
    "url": "english-phrases/static/js/2.3c156e18.chunk.js",
    "revision": "59e8a4b424ed21a3837c279be366c9d8"
  },
  {
    "url": "english-phrases/static/js/main.28eab16c.chunk.js",
    "revision": "a831646c973d28e20f3ccd11c98bb94b"
  },
  {
    "url": "english-phrases/static/js/runtime-main.c4b99935.js",
    "revision": "afdb2fa3325c7f086ec615d72aa50f51"
  },
  {
    "url": "english-phrases/static/media/left-arrow.c637926a.svg",
    "revision": "c637926a5d332ec9ac7f08c58d30e419"
  },
  {
    "url": "english-phrases/static/media/menu.a6f6f4eb.svg",
    "revision": "a6f6f4eb154d589956bbf0ff019cb46e"
  }
]);

        /* custom cache rules*/
        workbox.routing.registerNavigationRoute('/english-phrases/index.html', {
            blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
        });
    } else {
        console.log('Workbox could not be loaded. No Offline support');
    }
}
