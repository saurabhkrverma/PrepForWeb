// ref: https://leetcode.com/problems/time-based-key-value-store/
// ref: https://nodeflair.com/blog/stripe-software-engineer-interview-questions-and-process

const TimeMap = function () {
    this.map = {}
}

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 * */

TimeMap.prototype.set = function (key, value, timestamp ){
    if(!this.map[key]){
        this.map[key] = {};
    }
    this.map[key][timestamp] = value;
}

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string} value
 * */

TimeMap.prototype.get = function (key, timestamp){
    const obj = this.map[key] || {};
    let result = obj[timestamp];
    if(!result) {
        // look for the closest match
        let match,
            minDiff = Math.min();
        Object.keys(obj).forEach((_timestamp, index)=>{
            const diff = timestamp-_timestamp;
            if(diff > 0 && diff < minDiff) {
                minDiff = diff;
                match = _timestamp;
            }
        })
        result = obj[match] || "";
    }
    return result;
}

let obj = new TimeMap();
obj.set('foo','1',1)
obj.set('foo','6',6)
let result = obj.get('foo',4)
console.log('check result', result)