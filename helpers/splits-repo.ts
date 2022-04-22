import fs from 'fs'
import splitsJson from '../data/splits.json'

export type EntSplit = {
 id: number,
 rooms: number,
 total_price: number,
}

// Keep array in memory
let splits = splitsJson;

/* READ */
export function getAllSplits(): EntSplit[] {
  return splits;
}

export function getSplitById(id: number): EntSplit | undefined {
  return splits.find(x => x.id.toString() === id.toString());
}

/* CREATE */
export function createSplit({
  rooms,
  totalPrice
}: {
  rooms: number,
  totalPrice: number
}): number {
  // generate
  const newGame = {
    id: splits.length ? Math.max(...splits.map(x => x.id)) + 1 : 1,
    rooms,
    total_price: totalPrice,
  }

  splits.push(newGame);
  saveData();

  return newGame.id;
}

/* DELETE */
export function deleteSplit(id: number) {
  splits = splits.filter(x => x.id.toString() !== id.toString());
  saveData();
}

/*
 * Private functions
 */
function saveData() {
  fs.writeFileSync('data/splits.json', JSON.stringify(splits, null, 2));
}