
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
let merge = function(intervals) {

    intervals.sort((interval1, interval2)=>{
        return interval1[0]-interval2[0];
    });

    for(let i =0; i<intervals.length-1;){
        const currInterval = intervals[i];
        const nextInterval = intervals[i+1];
        if(currInterval[1]>=nextInterval[0]){
            currInterval[1] = Math.max(currInterval[1],nextInterval[1]);
            intervals.splice(i+1,1);
        } else {
            i++;
        }
    }

    return intervals;

};


const sampleIntervals = [[1,4],[0,2],[3,5]];
console.log(merge(sampleIntervals));