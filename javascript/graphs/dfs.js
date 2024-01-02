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

    dfsUtil(vertex, visited) {
        visited[vertex] = true;
        console.log(vertex);

        const neighbors = this.adjList.get(vertex);
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            if (!visited[neighbor]) {
                this.dfsUtil(neighbor, visited);
            }
        }
    }

    dfs(startVertex) {
        const visited = {};
        // this will not work in case of a disconnected graph
        this.dfsUtil(startVertex, visited);
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

console.log("Depth-First Search starting from vertex 'A':");
graph.dfs('A');
