import { describe, it, expect } from "vitest";
import { Graph, breadthFirstSearch, depthFirstSearch } from "../../structure";

describe("Graph Basic Test", () => {
  const graph = new Graph<string>();
  const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  it("Test Add", () => {
    myVertices.forEach((item) => {
      graph.addVertex(item);
    });
    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("A", "D");
    graph.addEdge("C", "D");
    graph.addEdge("C", "G");
    graph.addEdge("D", "G");
    graph.addEdge("D", "H");
    graph.addEdge("B", "E");
    graph.addEdge("B", "F");
    graph.addEdge("E", "I");
    console.log(graph.toString());
    expect(true).true;
  });
});

describe("Core algo test - bfs", () => {
  it("BreadthFisrtSearch", () => {
    const graph = new Graph<string>();
    const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    myVertices.forEach((item) => {
      graph.addVertex(item);
    });
    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("A", "D");
    graph.addEdge("C", "D");
    graph.addEdge("C", "G");
    graph.addEdge("D", "G");
    graph.addEdge("D", "H");
    graph.addEdge("B", "E");
    graph.addEdge("B", "F");
    graph.addEdge("E", "I");

    breadthFirstSearch(graph, myVertices[0], (v: string) => {
      console.log(v);
    });

    expect(true).true;
  });

  it("Core algo test - dfs", () => {
    const graph = new Graph<string>();
    const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    myVertices.forEach((item) => {
      graph.addVertex(item);
    });
    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("A", "D");
    graph.addEdge("C", "D");
    graph.addEdge("C", "G");
    graph.addEdge("D", "G");
    graph.addEdge("D", "H");
    graph.addEdge("B", "E");
    graph.addEdge("B", "F");
    graph.addEdge("E", "I");

    depthFirstSearch(graph, (v: string) => {
      console.log(v);
    });
    expect(true).true;
  });
});
