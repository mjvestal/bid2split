export type NumberTuple = [number, number];

export function getAllPairs(n: number): NumberTuple[] {
  const result: NumberTuple[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result.push([i, j]);
    }
  }
  return result;
}

export function getDistinctPairs(n: number): NumberTuple[] {
  const result: NumberTuple[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) result.push([i, j]);
    }
  }
  return result;
}