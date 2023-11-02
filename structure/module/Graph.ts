import { BaseClass } from "../common/BaseClass";
import { Dictionary } from "./MMap";

export class Graph<T> extends BaseClass {
  isDirected: boolean;
  vertices: T[];
  adjList: Dictionary<T[]>;

  constructor(isDirected: boolean = false) {
    super();
    this.isDirected = isDirected;
    this.vertices = [];
    this.adjList = new Dictionary<T[]>();
  }

  // 添加边
  addVertex(v: T) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  // 添加节点
  addEdge(v: T, w: T) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v)!.push(w);
    // 如果是无向图，也需要在 w 节点中加入 v 节点
    if (!this.isDirected) {
      this.adjList.get(w)!.push(v);
    }
  }

  getVertices() {
    return this.vertices;
  }

  getAdjList() {
    return this.adjList;
  }

  toString(): string {
    let s = "";
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]) || [];
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]}`;
      }
      s += "\n";
    }
    return s;
  }
}
