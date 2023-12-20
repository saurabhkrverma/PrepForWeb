// ref: https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0323.Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph/README_EN.md

// input  n = 5, edges = [[0,1],[1,2],[3,4]]
// output 2

const dfs = (visited, queue, graph,nodes) => {
    while(queue.length > 0) {
        const currentNode = queue.shift();
        if(visited[currentNode] >= 0 ){
            continue;
        }
        graph[currentNode]?.forEach((node)=>{
            queue.push(node);
        });
        visited.push(currentNode);
        nodes.splice(nodes.findIndex((elem)=>elem===currentNode),1);
    }
}

const countComponents = (totalNodes, edges) => {
    let nodes = new Array(totalNodes)
    for (let i = 0; i < totalNodes; ++i) {
        nodes[i] = i;
    }

    const graph = {};

    // construction of graph
    for(let i=0; i< edges.length; i++){
        const [a,b] = edges[i];
        if(graph[a] === undefined) {
            graph[a] = [];
        }
        if(graph[b] === undefined) {
            graph[b] = [];
        }
        graph[a].push(b);
        graph[b].push(a);
    }

    let visited = [];
    let queue = [];
    let count = 0;
    let rank = [];
    let prev_count=0;
    while(nodes.length>0){
        const currentNode = nodes.shift();
        visited.push(currentNode);
        graph[currentNode]?.forEach((node)=>{
            queue.push(node);
        });
        dfs(visited, queue, graph, nodes);
        let currentRank = visited.length-prev_count;
        prev_count = prev_count+currentRank;
        // console.log(visited, prev_count);
        rank.push(currentRank);
        count++;
    }
    console.log(rank);
    return count;
}






const totalNodes = 10;
const edges = [[1,2], [1,3], [2, 4], [3, 5], [7,8]]

console.log(countComponents(totalNodes, edges));