// ref:https://gist.github.com/lilpolymath/aa00db6d7dfea6d929d0c1759a438f3a
// ref: https://bigfrontend.dev/problem/lru-chrome-storage-eviction


class LRUNode {
    constructor(key, value, expiry=0) {
        this.key = key;
        this.value = value;
        this.expiry = expiry;
        this.expiryTime = Date.now() + expiry; // expected expiry in milliseconds
    }

    isExpired(){
        const currentTime = Date.now();
        return currentTime > this.expiryTime;

    }

}

class MyLRUStorage {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key){
        if(!this.cache.has(key)){
            return false;
        }
        // update the expiry time and the order
        const node = this.cache.get(key);
        if(node.isExpired()){
            return false
        }
        this.cache.delete(key);
        this.set(key, node.value, node.expiry);
        return node.value;
    }

    set(key,value,expiry) {
        // check if the node is there already, if yes then remove it and then add it back in, so it reflects the most recently used order.
        try {
            if(this.cache.has(key)){
                this.cache.delete(key);
                const node = new LRUNode(key,value, expiry);
                setTimeout()
                this.cache.set(key,node);
            } else {
                // check if capacity available
                if(this.capacity < this.cache.size+1){
                    // do eviction first and then add the node
                    const evictionDone = this.evict();
                    if(!evictionDone){
                        return false;
                    }
                }
                const node = new LRUNode(key,value, expiry);
                this.cache.set(key,node);
            }
            return true;
        } catch(err){
            return false;
        }
    }

    printMap() {
        console.log("Current Cache");
        this.cache.forEach((value, key)=>{
            console.log(key, value);
        })
    }

    evict(){
        try{
            // delete the last used key, i.e. the oldest/first entry in the map
            const cacheIterator = this.cache.entries();
            const [oldestKey,oldestNode] = cacheIterator.next().value;
            this.cache.delete(oldestKey);
            return true;
        } catch(err){
            return false;
        }
    }
}

const myCache = new MyLRUStorage(5);

myCache.set(1,'sanju',5000);
myCache.set(2,'chotu',5000);
myCache.set(3,'kusum',5000);
myCache.set(4,'mammi',5000);
myCache.set(5,'chinki',5000);
myCache.printMap();
myCache.set(6,'billu',5000);
myCache.printMap();



