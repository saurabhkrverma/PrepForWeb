// https://leetcode.com/problems/course-schedule/description/

let canFinish = function(numCourses, prerequisites) {

    let preMap = {};
    let visited = {};

    for(let i=0; i<numCourses; i++) {
        preMap[i] = [];
    }

    // build the adacency list
    for(let i = 0; i< prerequisites.length; i++){
        if(preMap[prerequisites[i][0]] === undefined){
            preMap[prerequisites[i][0]] = [prerequisites[i][1]]
        } else {
            preMap[prerequisites[i][0]].push(prerequisites[i][1])
        }
    }
    console.log(preMap)
    const dfs = (node) => {
        if(visited[node]){
            return false;
        }
        if(preMap[node] !==undefined){
            if (preMap[node].length === 0){
                return true;
            }

            visited[node] = true;
            for(let val of preMap[node]){
                if(!dfs(val)){
                    return false
                }
            }
            visited[node] = false;

            preMap[node] = [];
        }
        return true;

    }

    for(let key in preMap){
        if(!dfs(key)){
            return false
        }
    }
    return true

};

const numCourses = 5;
const prerequisites = [[0,1],[0,2],[1,3],[1,4],[3,4]]
console.log(canFinish(numCourses, prerequisites));