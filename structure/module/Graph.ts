import { Queue } from "..";
import { BaseClass } from "../common/BaseClass";
import { Dictionary } from "./MMap";

type GraphVerType = string | number;

type ColorType = 0 | 1 | 2;

const COLOR: Record<string, ColorType> = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2,
};

function initGraphColor<T extends GraphVerType>(
  vertices: T[]
): Partial<{ [key in T]: number }> {
  const color: Partial<{ [key in T]: number }> = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = COLOR.WHITE;
  }
  return color;
}

export function breadthFirstSearch<T extends GraphVerType>(
  graph: Graph<T>,
  startVertex: T,
  callback: (ret: T) => void
) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initGraphColor(vertices);

  const queue = new Queue<T>();

  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const u = queue.dequeue()!;
    const neighbors = adjList.get(u); // 首先要保证所有节点都有邻居，这样才是一个完整的图

    if (!neighbors) throw new Error("Not complete graph");
    color[u] = COLOR.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === COLOR.WHITE) {
        color[w] = COLOR.GREY;
        queue.enqueue(w);
      }
    }
    color[u] = COLOR.BLACK;
    if (callback) {
      callback(u);
    }
  }
}

export class Graph<T extends GraphVerType> extends BaseClass {
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
