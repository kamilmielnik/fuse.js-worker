# fuse.js-worker

![Version](https://img.shields.io/github/package-json/v/kamilmielnik/fuse.js-worker)
![License](https://img.shields.io/npm/l/fuse.js-worker)
![Prettier](https://github.com/kamilmielnik/fuse.js-worker/workflows/Prettier/badge.svg)

[Fuse.js](https://fusejs.io/) in [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) for great user experience.

## Motivation

[Fuse.js docs](https://fusejs.io/) state:

> When you want client-side fuzzy searching of small to moderately large data sets.

You have a client-side search. Your data set tends to grow. Or perhaps fuzzy search is used with more and more types of data. At some point Fuse.js becomes a performance issue. Tweaking options can only get you so far. Typing feedback becomes worse. You debounce things. It does not really help. Eventually your app freezes when search is performed. User experience is ruined. You don't want to get rid of fuzzy search and you don't want to move the client-side search to server.

[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) for the rescue!
