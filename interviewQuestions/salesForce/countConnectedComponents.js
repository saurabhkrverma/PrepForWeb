// ref: https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0323.Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph/README_EN.md

// input  n = 5, edges = [[0,1],[1,2],[3,4]]
// output 2

const dfs = (visited, stack, graph,nodes) => {
    while(stack.length > 0) {
        const currentNode = stack.shift();
        if(visited[currentNode] >= 0 ){
            continue;
        }
        graph[currentNode]?.forEach((node)=>{
            stack.push(node);
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
    let stack = [];
    let count = 0;
    let rank = [];
    let prev_count=0;
    while(nodes.length>0){
        const currentNode = nodes.shift();
        visited.push(currentNode);
        graph[currentNode]?.forEach((node)=>{
            stack.push(node);
        });
        // check if note is visited already
        // its
        dfs(visited, stack, graph, nodes);
        let currentRank = visited.length-prev_count;
        prev_count = prev_count+currentRank;
        // console.log(visited, prev_count);
        rank.push(currentRank);
        count++;
    }
    console.log(rank);
    return count;
}


class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjList = {}
        for(let i=0; i<this.vertices.length; i++) {
            this.adjList[i] = [];
        }
    }

    addEdge(source, destination) {
        this.adjList[source].push(destination)
    }


}


const dfs2 = (vertex, visited, graph) => {
    visited[vertex] = true;
    const neighbours = graph.adjList[vertex];
    for(let i =0; i< neighbours.length; i++) {
        const neighbour = neighbours[i];
        if(!visited[neighbour]) {
            dfs2(neighbour, visited, graph);
        }
    }
}
const countComponents2 = (n, edges) => {
    let vertices = []
    for(let i=0; i<n; i++) {
        vertices[i] = i;
    }
    const graph = new Graph(vertices);

    // add edges to the graph
    for(let i=0; i<edges.length; i++) {
        const [source,destination] = edges[i];
        graph.addEdge(source,destination);
    }

    let visited = {};
    let count = 0;
    for(let vertex in graph.adjList) {
        if(!visited[vertex]) {
            dfs2(vertex, visited, graph);
            count++;
        }
    }
    return count;
}







const totalNodes = 10;
const edges = [[1,2], [1,3], [2, 4], [3, 5], [7,8]]

console.log(countComponents2(totalNodes, edges));