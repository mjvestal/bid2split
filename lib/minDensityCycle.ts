import { getAllPairs, getDistinctPairs, type NumberTuple } from "./pairs";

import makeKey from "./makeKey";
import nullthrows from "nullthrows";

export type StringToNumberObject = {[key: string]: null | number};

function argmin(list: number[][], func: (path: number[]) => number): number[] {
  const values = list.map(func);
  const minValue = Math.min(...values);
  const minIndex = values.indexOf(minValue);
  return list[minIndex];
}

export default function minDensityCycle(
  vertices: number[], 
  weightDict: StringToNumberObject,
  lengthDict: StringToNumberObject,
  errorTollerance = 0,
): [number, number[]] {
  const n = vertices.length;
  const W = weightDict;
  const L = lengthDict;
  const allPairs = getAllPairs(n);
  const distinctPairs = getDistinctPairs(n);

  const m: StringToNumberObject = {};
  for (let [i, j] of allPairs) {
    for (let l = 0; l < n + 1; l++) {
      m[makeKey(i, j, l)] = Infinity;
    }
  }
  distinctPairs.forEach(([i, j]) => {
    m[makeKey(i, j, nullthrows(L[makeKey(i, j)]))] = W[makeKey(i, j)];
  });

  const isValidPath = (lst: any[]) => {
    if (lst.length === 0) {
      return true;
    } else if (lst[0] === lst[lst.length - 1]) {
      return (new Set(lst).size) === lst.length - 1;
    } else {
      return (new Set(lst).size) === lst.length;
    }
  }

  const edgesOf = (path: number[]): NumberTuple[] => {
    const edges: NumberTuple[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      edges.push([path[i], path[i+1]]);
    }
    return edges;
  }

  const lengthOf = (path: number[]): number => {
    const edges = edgesOf(path);
    return edges.reduce((sum, [i, j]) => {
      return sum + nullthrows(L[makeKey(i, j)]);
    }, 0);
  }

  const weightOf = (path: number[]): number => {
    const edges = edgesOf(path);
    return edges.reduce((sum, [i, j]) => {
      return sum + nullthrows(W[makeKey(i, j)]);
    }, 0);
  }

  const densityOf = (path: number[]) => {
    if (lengthOf(path) === 0) {
      return Infinity;
    }
    return weightOf(path) / lengthOf(path);
  };

  const f: {[key: string]: number[]} = {};
  distinctPairs.forEach(([i, j]) => {
    f[makeKey(i, j, 1)] = [i];
  });

  vertices.forEach(k => {
    vertices.forEach(i => {
      vertices.forEach(j => {
        for (let l1 = 1; l1 < n + 1; l1++) {
          for (let l2 = 1; l2 < n + 1 - l1; l2++) {
            const ikl1 = f[makeKey(i, k, l1)];
            const kjl2 = f[makeKey(k, j, l2)];
            if (ikl1 && kjl2 && isValidPath([...ikl1, ...kjl2, j])) {
              const newM = densityOf([...ikl1, ...kjl2, j]);
              if (newM < nullthrows(m[makeKey(i, j, l1 + l2)])) {
                f[makeKey(i, j, l1 + l2)] = [...ikl1, ...kjl2];
                m[makeKey(i, j, l1 + l2)] = newM;
              }
            }
          }
        }
      });
    });
  });

  const cyclesFound: number[][] = [];

  // for failing test, f is wrong. f should have more entries including ones that end in _4
  for (let key in f) {
    const ijl = key.split('_').map((val) => parseInt(val));
    if (ijl[0] === ijl[1]) {
      cyclesFound.push([...f[key], ijl[0]]);
    }
  }
  
  const minCycle = argmin(cyclesFound, densityOf);
  const minDensity = densityOf(minCycle);

  return [minDensity, minCycle];
}