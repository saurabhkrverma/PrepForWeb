class Graph {
    constructor(vertices = []) {
        this.vertices = vertices;
        this.adjList = {}
        this.vertices.forEach((vertex)=>{
            this.adjList[vertex] = [];
        })
    }

    addEdge (source, destination) {
        this.adjList[source].push(destination);
    }

}

class DFS extends Graph {

    constructor(vertices=[]) {
        super(vertices);
    }

    dfs(startVertex, traversal=[], visited={}) {
        if(visited[startVertex]) return ;
        visited[startVertex] = true;
        traversal.push(startVertex);
        const neighbours = this.adjList[startVertex]
        for(let i=0; i<neighbours.length; i++){
            const neighbour = neighbours[i];
            if(!visited[neighbour]) {
                this.dfs(neighbour,traversal,visited)
            }
        }
        return traversal;
    }

    dfsForCycle(startVertex, visited) {
        if(visited[startVertex]) {
            return false;
        }
        visited[startVertex] = true;
        const neighbours = this.adjList[startVertex];
        for(let i=0; i<neighbours.length; i++){
            const neighbour = neighbours[i];
            const result = this.dfsForCycle(neighbour,visited);
            if(result === false){
                return false;
            }
        }
        visited[startVertex] = false;
        return true
    }

    detectCycle() {
        let visited = {};
        let result = true;
        for(let i=0; i< this.vertices.length; i++){
            const vertex = this.vertices[i];
            if(!visited[vertex]) {
                const noCyclePresent = this.dfsForCycle(vertex,visited);
                if(!noCyclePresent) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    }

    dfsUtil(vertex, visited, stack){
        visited[vertex] = true;
        const neighbours = this.adjList[vertex]
        for(let i=0; i<neighbours.length; i++){
            const neighbour = neighbours[i];
            if(!visited[neighbour]){
                this.dfsUtil(neighbour, visited, stack);
            }
        }
        stack.push(vertex);
    }

    topoSort() {
        const visited = {};
        const stack = [];

        for(let i=0; i< this.vertices.length; i++){
            const vertex = this.vertices[i];
            if(!visited[vertex]){
                this.dfsUtil(vertex, visited, stack)
            }
        }

        return stack.reverse();
    }

    connectedComponents() {
        let visited = [];
        let count =0;

        // to check connected components in undirected graph, you need to add the edge from source to dest and backwards as well

        for(let i=0; i<this.vertices.length; i++){
            const vertex = this.vertices[i];
            if(!visited[vertex]){
                this.dfs(vertex,[],visited);
                console.log(vertex, visited);
                ++count;
            }
        }

        return count;

    }

}

const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const graph = new DFS(vertices);

graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'C');
graph.addEdge('B', 'E');
graph.addEdge('D', 'F');
graph.addEdge('F', 'E');

console.log(graph.connectedComponents());






