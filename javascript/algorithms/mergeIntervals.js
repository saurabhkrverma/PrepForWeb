// ref: https://leetcode.com/problems/merge-intervals/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
let merge = function(intervals) {
    intervals.sort((interval1, interval2)=>{
        return (interval1[0]-interval2[0]);
    });
    console.log(intervals);
    let lastRange = Math.max();
    for(let i=0; i<intervals.length;){
        const currInterval = intervals[i];
        if(currInterval[0]<=lastRange){
            // merge the interval
            currInterval[0] = intervals[i-1][0];
            // take the maximum range
            currInterval[1] = Math.max(currInterval[1],intervals[i-1][1])
            intervals.splice(i-1,1);

        } else {
            i++;
        }
        lastRange = currInterval[1];
    }
    return intervals;
};


const sampleIntervals = [[1,4],[0,2],[3,5]]
console.log(merge(sampleIntervals));
