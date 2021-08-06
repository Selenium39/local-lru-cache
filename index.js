'use strict'

class LocalCache {
    constructor(maxSize) {
        this.cache = new Map()
        this.expireCache = new Map()
        this.maxSize = maxSize
        this.intervalId = setInterval(function () {
            // regularly delete expired keys
            for (let [key, value] of this.expireCache) {
                if ((value.insertTime + value.expire) <= (+new Date())) {
                    this.expireCache.delete(key)
                }
            }
        }.bind(this), 1000);
    }

    set(key, value, expire) {
        if (this.get(key)) {
            this.cache.delete(key)
            if (expire) {
                this.expireCache.set(key, { value, insertTime: +new Date(), expire })
            } else {
                this.cache.set(key, { value, insertTime: +new Date(), expire })
            }
        } else {
            if (this.cache.size + this.expireCache.size >= this.maxSize) { //LRU memory elimination strategy
                this.cache.delete(this.cache.keys().next().value)
            }
            if (expire) {
                this.expireCache.set(key, { value, insertTime: +new Date(), expire })
            } else {
                this.cache.set(key, { value, insertTime: +new Date(), expire })
            }
        }
    }

    get(key) {
        if (this.expireCache.has(key) && (this.expireCache.get(key).insertTime + this.expireCache.get(key).expire) <= (+new Date())) { // regularly delete expired keys
            this.expireCache.delete(key)
            return null
        }
        if (this.expireCache.has(key) || this.cache.has(key)) {
            return this.expireCache.has(key) ? this.expireCache.get(key).value : this.cache.get(key).value
        } else {
            return null
        }
    }
}

module.exports = LocalCache