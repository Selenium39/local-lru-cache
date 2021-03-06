<h1 align="center">Welcome to local-lru-cache 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/wantao666/local-lru-cache#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/wantao666/local-lru-cache/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/wantao666/local-lru-cache/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/wantao666/local-lru-cache" />
  </a>
</p>

> A local cache module 

### ✨ [Example](https://github.com/wantao666/local-lru-cache/blob/master/example.js)
```js
const LocalCache = require('local-lru-cache')

// 1.create LocalCache
const localCache = new LocalCache(5)
localCache.set(1, 'a')
localCache.set(2, 'b')
localCache.get(1)         // a
localCache.get(2)         // a,b

// 2.key with expiration time will be delete after expirate (regularly+lazy)
; (async () => {
        localCache.set(3, 'c', 2000)
        await new Promise(resolve => {
            setTimeout(resolve, 2000)
        })
        localCache.get(3)  // null
})()

/**
 * 3. LRU memory elimination strategy
 *    3.1 only eliminate keys without expiration time
 *    3.2 elimination when localCache.size > cache.size+expireCache.size
 * */
localCache.set(3, 'c',2000) // a,b,c
localCache.set(4, 'd')      // a,b,c,d
localCache.set(5, 'e')      // a,b,c,d,e
localCache.set(6, 'f')      // b,c,d,e,f
localCache.set(7,'g')       // c,d,e,f,g
localCache.set(8,'h')       // c,e,f,g,h


```

### 🏠 [Homepage](https://github.com/wantao666/local-lru-cache#readme)

## Install

```sh
npm install
```

## Author

👤 **selenium39**

* Website: https://blog.csdn.net/qq_45453266
* Github: [@wantao666](https://github.com/wantao666)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/wantao666/local-lru-cache/issues). You can also take a look at the [contributing guide](https://github.com/wantao666/local-lru-cache/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [selenium39](https://github.com/wantao666).<br />
This project is [MIT](https://github.com/wantao666/local-lru-cache/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
