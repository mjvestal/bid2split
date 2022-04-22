export function areBidsValid(bids: number[], rooms: number): boolean {
  if (!Array.isArray(bids) || bids.length !== rooms) {
    return false;
  }
  let validBids = true;
  let zeroes = 0;
  for (let i = 0; i < bids.length; i++) {
    if (!Number.isInteger(bids[i]) || bids[i] < 0) {
      validBids = false;
      break;
    }
    if (bids[i] === 0) {
      zeroes++;
    }
  }

  return validBids && zeroes === 1;
}