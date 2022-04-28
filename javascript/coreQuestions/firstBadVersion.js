// ref: https://bigfrontend.dev/problem/first-bad-version

//Say you have multiple versions of a program, write a program that will find and return the first bad revision given a isBad(version) function.
//
// Versions after first bad version are supposed to be all bad versions.
//
// notes
//
// Inputs are all non-negative integers
// if none found, return -1
const isBadVersion = (version) => {
    // configure your own version here
    return !!(version >= 1702766719);
}

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var firstBadVersion = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(versions) {
        let start = 0;
        let end = versions;
        let lastBadVersion = -1;
        while(start<=end) {
            let mid = Math.floor((start+end)/2);
            const isSelectedVersionBad = isBadVersion(mid);
            if(isSelectedVersionBad) {
                lastBadVersion = mid;
                end = mid-1;
            } else {
                start = mid+1;
            }
        }
        return lastBadVersion;
    };
};


console.log(firstBadVersion(isBadVersion)(2126753390));
