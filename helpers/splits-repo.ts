import fs from 'fs'
import splitsJson from '../data/splits.json'

export type EntSplit = {
  id: number,
  listing_domain: string | null,
  listing_image: string | null,
  listing_title: string | null,
  listing_url: string | null,
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
  listingDomain,
  listingImage,
  listingTitle,
  listingUrl,
  rooms,
  totalPrice,
}: {
  listingDomain: string | null,
  listingImage: string | null,
  listingTitle: string | null,
  listingUrl: string | null,
  rooms: number,
  totalPrice: number
}): number {
  // generate
  const newGame: EntSplit = {
    id: splits.length ? Math.max(...splits.map(x => x.id)) + 1 : 1,
    listing_domain: listingDomain,
    listing_image: listingImage,
    listing_title: listingTitle,
    listing_url: listingUrl,
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