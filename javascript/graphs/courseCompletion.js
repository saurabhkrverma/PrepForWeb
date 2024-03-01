// https://leetcode.com/problems/course-schedule/description/

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

}

// const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
// const graph = new DFS(vertices);
//
// graph.addEdge('A', 'B');
// graph.addEdge('A', 'C');
// graph.addEdge('B', 'D');
// graph.addEdge('B', 'E');
// graph.addEdge('C', 'F');
// graph.addEdge('E', 'F');


const vertices = ['A', 'B', 'C', 'D'];
const graph = new DFS(vertices);

graph.addEdge('A', 'B');
graph.addEdge('C', 'D');
// graph.addEdge('D', 'C');

console.log(graph.detectCycle());
// console.log(graph.dfs("A"));





