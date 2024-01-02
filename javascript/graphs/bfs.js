class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjList = new Map();
        for (let i = 0; i < vertices.length; i++) {
            this.adjList.set(vertices[i], []);
        }
    }

    addEdge(source, destination) {
        this.adjList.get(source).push(destination);
        // For undirected graph, add this line:
        // this.adjList.get(destination).push(source);
    }

    bfsUtil(visited, queue) {
        while(queue.length > 0) {
            const vertex = queue.shift();
            if(visited[vertex]) {
                continue;
            }
            visited[vertex] = true;
            console.log(vertex);
            const neighbours = this.adjList.get(vertex);
            for(let i=0; i<neighbours?.length; i++){
                const neighbour = neighbours[i];
                if(!visited[neighbour]) {
                    queue.push(neighbour);
                }
            }
        }
    }

    dfsUtil(visited, stack) {
        while(stack.length > 0) {
            const vertex = stack.shift();
            if(visited[vertex]){
                continue;
            }
            visited[vertex] = true;
            console.log(vertex);
            const neighbours = this.adjList.get(vertex).reverse();
            for(let i=0; i<neighbours?.length; i++){
                const neighbour = neighbours[i];
                if(!visited[neighbour]) {
                    stack.unshift(neighbour);
                }
            }
        }
    }

    bfs(startVertex) {
        const visited = {};
        const queue = [];
        queue.push(startVertex);
        this.bfsUtil(visited, queue);
    }


    dfs(startVertex){
        const visited = {};
        const stack = [];
        stack.push(startVertex);
        this.dfsUtil(visited, stack);
    }
}

// Example usage:
const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
const graph = new Graph(vertices);

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('E', 'F');

// console.log("Breadth-First Search starting from vertex 'A':");
// graph.bfs('A');
console.log("Depth-First Search starting from vertex 'A':");
graph.dfs('A');
