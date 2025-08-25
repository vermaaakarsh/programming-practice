class DirectedGraph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.adjacencyList = new Map();
  }
  addVertex(v) {
    this.adjacencyList.set(v, []);
  }
  addEdge(s, d) {
    this.adjacencyList.get(s).push(d);
  }

  display() {
    let vertices = this.adjacencyList.keys();
    for (const vertex of vertices) {
      const edgeList = this.adjacencyList.get(vertex);
      console.log(vertex, edgeList);
    }
  }

  topologicalSortUtil(vertices, visited, vertex, stack) {
    visited[vertices.indexOf(vertex)] = 1;
    const edgeList = this.adjacencyList.get(vertex);
    for (const newVertex of vertices) {
      if (
        edgeList.indexOf(newVertex) >= 0 &&
        !visited[vertices.indexOf(newVertex)]
      ) {
        this.topologicalSortUtil(vertices, visited, newVertex, stack);
      }
    }
    stack.push(vertex);
  }

  topologicalSort() {
    const vertices = [...this.adjacencyList.keys()];
    const visited = new Array(vertices.length).fill(0);
    const stack = [];

    for (let i = 0; i < visited.length; i++) {
      if (visited[i]) {
        continue;
      }
      this.topologicalSortUtil(vertices, visited, vertices[i], stack);
    }

    stack.reverse();
    return stack;
  }
}

(function driver() {
  const vertices = [
    "Go",
    "Shoes",
    "Socks",
    "Blazer",
    "Underwear",
    "Tie",
    "Belts",
    "Pants",
    "Shirt",
  ];
  const directedAcyclicGraph = new DirectedGraph(vertices.length);
  for (const vertex of vertices) {
    directedAcyclicGraph.addVertex(vertex);
  }
  directedAcyclicGraph.addEdge("Shirt", "Tie");
  directedAcyclicGraph.addEdge("Tie", "Blazer");
  directedAcyclicGraph.addEdge("Blazer", "Ready");
  directedAcyclicGraph.addEdge("Shirt", "Pants");
  directedAcyclicGraph.addEdge("Pants", "Belts");
  directedAcyclicGraph.addEdge("Belts", "Ready");
  directedAcyclicGraph.addEdge("Underwear", "Pants");
  directedAcyclicGraph.addEdge("Pants", "Shoes");
  directedAcyclicGraph.addEdge("Underwear", "Shoes");
  directedAcyclicGraph.addEdge("Shoes", "Ready");
  directedAcyclicGraph.addEdge("Socks", "Shoes");

  console.log("Initial", vertices);
  const sortedArray = directedAcyclicGraph.topologicalSort();
  console.log("Final", sortedArray);
})();
