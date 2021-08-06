const LocalCache = require('./index')

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


