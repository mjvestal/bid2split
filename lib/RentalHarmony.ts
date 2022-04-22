import {Matrix, SingularValueDecomposition, WrapperMatrix2D, solve} from 'ml-matrix';
import { NumberTuple, getAllPairs, getDistinctPairs } from './pairs';

import blossom from 'edmonds-blossom';
import makeKey from './makeKey';
import minDensityCycle, {type StringToNumberObject} from './minDensityCycle';
import nullthrows from 'nullthrows';

type PersonRoomRent = [string, number, number];
type StringToNumberArrayObject = {[key: string]: number[]};

export function calculateEdgeWeights(values: Array<Array<number>>) {
  const n = values.length;
  const edgeWeights = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      edgeWeights.push([i, n + j, values[j][i]]);
    }
  }

  return edgeWeights;
}

export function maxWeightMatching(edgeWeights: Array<Array<number>>) {
  return blossom(edgeWeights, true);
}

export function getRoomAssignments(input: StringToNumberArrayObject): number[] {
  const bids = Object.values(input);
  const edgeWeights = calculateEdgeWeights(bids);
  return maxWeightMatching(edgeWeights).slice(bids.length);
}

export function getEmptyDifferenceObject(n: number): StringToNumberObject {
  const distinctPairs = getDistinctPairs(n);
  const d = distinctPairs.reduce((accum: StringToNumberObject, current) => {
    accum[makeKey(...current)] = null;
    return accum;
  }, {});

  for (let i = 0; i < n; i++) {
    d[makeKey(i, i)] = 0;
  }

  return d;
}

export function getValueMatrix(input: StringToNumberArrayObject): StringToNumberObject {
  const people = Object.keys(input);
  const assignments: number[] = getRoomAssignments(input); 
  const allPairs = getAllPairs(assignments.length);

  return allPairs.reduce((accum: StringToNumberObject, [i, j]) => {
    accum[makeKey(i, j)] = input[people[i]][assignments[j]];
    return accum;
  }, {});
}

export function getUpperBound(input: StringToNumberArrayObject): StringToNumberObject {
  const valueMatrix = getValueMatrix(input);
  const result: StringToNumberObject = {};
  let n = Object.keys(input).length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[makeKey(i, j)] = nullthrows(valueMatrix[makeKey(i, i)]) - nullthrows(valueMatrix[makeKey(i, j)]);
    }
  }
  return result;
}

function inRowspan(row: number[], matrix: Matrix): boolean {
  const newMatrix = new Matrix(matrix);
  newMatrix.addRow(matrix.rows, row);
  const svd = new SingularValueDecomposition(newMatrix, {autoTranspose: true});
  return svd.rank === matrix.rows;
}

function getEdgesOf(path: number[]): NumberTuple[] {
  const edges: NumberTuple[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    edges.push([path[i], path[i + 1]]);
  }
  return edges;
}

export default class RentalHarmony{ 
  /*
   * d[i_j] will be the rent i pays minus the rent person j pays;
   * that is, d[i_j] = price[s[i]] - price[s[j]]
   */
  d: StringToNumberObject = {}; // d[i,j] will be the rent personi i pays 
  M: Matrix;
  y: Matrix;

  totalRent: number;
  bids: StringToNumberArrayObject;
  numberOfRooms: number;
  upperBound: StringToNumberObject;

  constructor(totalRent: number, bids: StringToNumberArrayObject) {
    this.totalRent = totalRent;
    this.bids = bids;
    // TODO assert people.length === bids.length
    this.numberOfRooms = Object.keys(bids).length;

    this.upperBound = getUpperBound(this.bids);

    this.d = getEmptyDifferenceObject(this.numberOfRooms);
    this.M = new Matrix([(new Array(this.numberOfRooms)).fill(1)]);
    this.y = new Matrix([[this.totalRent]]);
  }

  calculateRents(): PersonRoomRent[] {
    while (this.getFreeEdges().length > 0) {
      this.setNextRentDifferences();
      this.setImpliedValues();
    }

    const rent = solve(this.M, this.y).transpose().getRow(0);
    const people = Object.keys(this.bids);
    const roomAssignments = getRoomAssignments(this.bids);
    return people.map((person, index) => {
      return [person, roomAssignments[index], rent[index]];
    });
  }

  getFreeEdges(): NumberTuple[] {
    const freeEdges: NumberTuple[] = [];
    for(let [i, j] of getDistinctPairs(this.numberOfRooms)) {
      if (this.d[makeKey(i, j)] === null) {
        freeEdges.push([i, j]);
      }
    }
    return freeEdges;
  }

  getFreeEdgesOf(path: number[]): NumberTuple[] {
    return getEdgesOf(path).reduce((accum: NumberTuple[], [i, j]) => {
      if (this.d[makeKey(i, j)] == null) {
        accum.push([i, j]);
      }
      return accum;
    }, []);
  }

  setNextRentDifferences() {
    const [minDensity, minCycle] = this.getMinDensityCycle();
    const freePairs = this.getFreeEdgesOf(minCycle);
    freePairs.forEach(([i, j]) => {
      this.d[makeKey(i, j)] = nullthrows(this.upperBound[makeKey(i, j)]) - minDensity;
      this.maybeAddToM(i, j);
    });
  }

  getMinDensityCycle(): [number, number[]] {
    const vertices = [...Array(this.numberOfRooms).keys()];
    const allPairs = getAllPairs(this.numberOfRooms);
    const lengthDict = allPairs.reduce((accum: StringToNumberObject, [i, j]) => {
      const key = makeKey(i, j);
      accum[key] = this.d[key] === null ? 1 : 0;
      return accum;
    }, {});
    const weightDict = allPairs.reduce((accum: StringToNumberObject, [i, j]) => {
      const key = makeKey(i, j);
      accum[key] = this.d[key] === null ? this.upperBound[key] : this.d[key];
      return accum;
    }, {});

    return minDensityCycle(vertices, weightDict, lengthDict, 1e-4);
  }

  maybeAddToM(i: number, j: number) {
    const newRow = this.vec(i, j);
    if (!inRowspan(newRow, this.M) && this.d[makeKey(i, j)] !== null) {
      this.M.addRow(this.M.rows, newRow);
      this.y.addRow(this.y.rows, [nullthrows(this.d[makeKey(i, j)])]);
    }
  }

  vec(i: number, j: number) {
    const entries = [];
    for (let k = 0; k < this.numberOfRooms; k++) {
      entries.push(k === i ? 1 : k === j ? -1 : 0);
    }
    return entries;
  }

  rowCoeffecients(r: number[]): Matrix {
    const svd = new SingularValueDecomposition(this.M.transpose(), {autoTranspose: true});
    const leastSquares = svd.solve(WrapperMatrix2D.checkMatrix([r]).transpose());

    return leastSquares.getColumn(0).reduce((matrix: Matrix, value, index) => {
      return matrix.addRow(index, [value]);
    }, new Matrix(0, 1));
  }

  setImpliedValues() {
    const freeEdges = this.getFreeEdges();
    for (let [i, j] of freeEdges) {
      const r = this.vec(i, j);
      if (inRowspan(r, this.M)) {
        this.d[makeKey(i, j)] = this.rowCoeffecients(r).dot(this.y);
      }
    }
  }
}