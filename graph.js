class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.adjacencyList = new Map();
  }
  addVertex(v) {
    this.adjacencyList.set(v, []);
  }
  addEdge(s, d) {}

  display() {
    let vertices = this.adjacencyList.keys();
    for (const vertex of vertices) {
      const edgeList = this.adjacencyList.get(vertex);
      console.log(vertex, edgeList);
    }
  }

  displayPathArray(pathArray, algo, destination) {
    let vertices = pathArray.keys();
    for (const vertex of vertices) {
      if (destination) {
        if (vertex !== destination) {
          continue;
        }
      }
      if (algo === "BFS") {
        process.stdout.write(`To reach ${vertex} the shortest path is: `);
      } else {
        process.stdout.write(`To reach ${vertex} one of the path is: `);
      }
      const path = pathArray.get(vertex);
      let resStr = `${vertex}`;
      for (const node of path) {
        resStr = `${node} -> ` + resStr;
      }
      console.log(resStr);
    }
  }

  findPathFromSource(source, vertices, traversalArray, parent) {
    const pathArray = new Map();
    for (const vertex of vertices) {
      pathArray.set(vertex, []);
      if (vertex === source) {
        pathArray.set(vertex, [vertex]);
      }
      let parentNode = vertex;
      while (parentNode !== source) {
        parentNode = parent[traversalArray.indexOf(parentNode)];
        pathArray.get(vertex).push(parentNode);
      }
    }
    return pathArray;
  }

  BFS(source = "A") {
    const vertices = [...this.adjacencyList.keys()];
    const visited = new Array(vertices.length).fill(0);
    const bfsTraversalArray = [];
    const queue = [];
    const parent = [];

    queue.push(source);
    visited[vertices.indexOf(source)] = 1;
    parent.push(null);

    while (queue.length > 0) {
      const processedNode = queue.shift();
      bfsTraversalArray.push(processedNode);

      const edgeList = this.adjacencyList.get(processedNode);

      for (const edge of edgeList) {
        if (!visited[vertices.indexOf(edge)]) {
          queue.push(edge);
          parent.push(processedNode);
          visited[vertices.indexOf(edge)] = 1;
        }
      }
    }
    const pathArray = this.findPathFromSource(
      source,
      vertices,
      bfsTraversalArray,
      parent
    );

    return { pathArray, bfsTraversalArray };
  }

  getDFSTraversalArray(vertices, visited, stack, parent, dfsTraversalArray) {
    if (stack.length === 0) {
      return empty;
    }
    const processedNode = stack.pop();
    dfsTraversalArray.push(processedNode);
    const edgeList = this.adjacencyList.get(processedNode);
    for (const edge of edgeList) {
      if (!visited[vertices.indexOf(edge)]) {
        stack.push(edge);
        parent.push(processedNode);
        visited[vertices.indexOf(edge)] = 1;
        this.getDFSTraversalArray(
          vertices,
          visited,
          stack,
          parent,
          dfsTraversalArray
        );
      }
    }
  }

  DFS(source = "A") {
    const vertices = [...this.adjacencyList.keys()];
    const visited = new Array(vertices.length).fill(0);
    const dfsTraversalArray = [];
    const stack = [];
    const parent = [];

    stack.push(source);
    visited[vertices.indexOf(source)] = 1;
    parent.push(null);

    this.getDFSTraversalArray(
      vertices,
      visited,
      stack,
      parent,
      dfsTraversalArray
    );

    const pathArray = this.findPathFromSource(
      source,
      vertices,
      dfsTraversalArray,
      parent
    );

    return { pathArray, dfsTraversalArray };
  }
}

class UndirectedGraph extends Graph {
  addEdge(s, d) {
    this.adjacencyList.get(s).push(d);
    this.adjacencyList.get(d).push(s);
  }
}

class DirectedGraph extends Graph {
  addEdge(s, d) {
    this.adjacencyList.get(s).push(d);
  }
}

(function driver() {
  const vertices = ["A", "B", "C", "D", "E", "F"];
  const undirectedGraph = new UndirectedGraph(vertices.length);
  const directedGraph = new DirectedGraph(vertices.length);
  for (const vertex of vertices) {
    undirectedGraph.addVertex(vertex);
    directedGraph.addVertex(vertex);
  }
  undirectedGraph.addEdge("A", "B");
  undirectedGraph.addEdge("A", "D");
  undirectedGraph.addEdge("A", "E");
  undirectedGraph.addEdge("B", "C");
  undirectedGraph.addEdge("C", "F");
  undirectedGraph.addEdge("D", "E");
  undirectedGraph.addEdge("E", "F");
  undirectedGraph.addEdge("E", "C");
  undirectedGraph.display();

  const {
    pathArray: undirectedGraphShortestPathArray,
    bfsTraversalArray: undirectedGraphBFSTraversalArray,
  } = undirectedGraph.BFS();
  console.log("BFSTraversalArray", undirectedGraphBFSTraversalArray);
  undirectedGraph.displayPathArray(undirectedGraphShortestPathArray, "BFS");

  const {
    pathArray: undirectedGraphPathArray,
    dfsTraversalArray: undirectedGraphDFSTraversalArray,
  } = undirectedGraph.DFS();
  console.log("DFSTraversalArray", undirectedGraphDFSTraversalArray);
  undirectedGraph.displayPathArray(undirectedGraphPathArray, "DFS");

  console.log("=================================");

  directedGraph.addEdge("A", "B");
  directedGraph.addEdge("A", "D");
  directedGraph.addEdge("A", "E");
  directedGraph.addEdge("B", "C");
  directedGraph.addEdge("D", "E");
  directedGraph.addEdge("E", "F");
  directedGraph.addEdge("E", "C");
  directedGraph.addEdge("F", "C");
  directedGraph.display();

  const {
    pathArray: directedGraphShortestPathArray,
    bfsTraversalArray: directedGraphBFSTraversalArray,
  } = directedGraph.BFS();
  console.log("BFSTraversalArray", directedGraphBFSTraversalArray);
  directedGraph.displayPathArray(directedGraphShortestPathArray, "BFS");

  const {
    pathArray: directedGraphPathArray,
    dfsTraversalArray: directedGraphDFSTraversalArray,
  } = directedGraph.DFS();
  console.log("DFSTraversalArray", directedGraphDFSTraversalArray);
  directedGraph.displayPathArray(directedGraphPathArray, "DFS");
})();
