class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjList = {};
        for (let i = 0; i < vertices.length; i++) {
            this.adjList[vertices[i]] = [];
        }
    }

    addEdge(source, destination) {
        this.adjList[source].push(destination);
    }

    dfs(vertex, visited, stack) {
        visited[vertex] = true;
        const neighbors = this.adjList[vertex];
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            if (!visited[neighbor]) {
                this.dfs(neighbor, visited, stack);
            }
        }

        stack.push(vertex);
    }

    topologicalSort() {
        const visited = {};
        const stack = [];

        for (const vertex in this.adjList) {
            if (!visited[vertex]) {
                this.dfs(vertex, visited, stack);
            }
        }
        return stack.reverse();
    }
}

// Example usage:
const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
const graph = new Graph(vertices);

graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'C');
graph.addEdge('B', 'E');
graph.addEdge('D', 'F');
graph.addEdge('F', 'E');

const result = graph.topologicalSort();
console.log("Topological order:", result);


