import type { LinkPreview } from "lib/scrapePreview";
import { createPlayers } from "./players-repo";
import { createRooms } from "./rooms-repo";
import { createSplit } from "./splits-repo";

export default function createSplitHelper({
  listing,
  players,
  rooms,
  totalPrice,
}: {
  listing?: LinkPreview,
  players: {name: string}[],
  rooms: {name: string}[],
  totalPrice: number,
}): number {
  const splitId = createSplit({
    rooms: rooms.length,
    listingDomain: listing?.host || null,
    listingImage: listing?.image || null,
    listingTitle: listing?.title || null,
    listingUrl: listing?.url || null,
    totalPrice,
  });
  createPlayers(splitId, players);
  createRooms(splitId, rooms);
  return splitId;
}