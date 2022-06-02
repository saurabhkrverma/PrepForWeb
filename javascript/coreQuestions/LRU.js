// ref: https://bigfrontend.dev/problem/lru-chrome-storage-eviction

/**
 * @typedef {object} OriginData
 * @property {string} origin
 * @property {number} lastUsed
 * @property {number} size
 * @property {boolean} persistent
 */

class OriginData {
    constructor (origin,size,lastused = null,persistent=false) {
        this.origin = origin;
        this.size =size;
        this.lastUsed = lastused;
        this.persistent = persistent;
    }
}

class MyLRUStorage  {
    /**
     * @param {number} capacity
     * @param {() => number} getTimestamp
     */
    constructor(capacity, getTimestamp) {
        this.currentCapacity = capacity;
        this.capacity = capacity
        this.getTimestamp = getTimestamp;
        this.cache = new Map();
    }

    /**
     * @param {string} origin
     * @returns {OriginData | undefined}
     */
    getData(origin) {
        return this.cache.get(origin);
    }

    /**
     * @param {string} origin
     * @param {number} size
     * @returns {boolean}
     */
    setData(origin, size) {
        // when there is enough data, store the page
        if(this.currentCapacity >= size){
            const newPage = new OriginData(origin,size);
            this.cache.set(origin,newPage);
            this.currentCapacity = this.currentCapacity - size;
            return true;
        } else {
            // evict few page until we have the capacity to store the current page
        }

    }

    /**
     * @param {string} origin
     * @returns {void}
     */
    clearData(origin) {

    }

    /**
     * @param {string} origin
     * @returns {void}
     */
    makePersistent(origin) {

    }
}

const storage = new MyLRUStorage(10);

storage.setData('a', 1)
storage.setData('b', 3)
storage.setData('c', 7)

console.log(storage.getData('a'))
console.log(storage.getData('b'))
console.log(storage.getData('c'))
