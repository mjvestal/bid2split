import type { LinkPreview } from "lib/scrapePreview";
import { createPlayers } from "./players-repo";
import { createRooms } from "./rooms-repo";
import { createSplit } from "./splits-repo";

export default async function createSplitHelper({
  currency,
  listing,
  players,
  rooms,
  totalPrice,
}: {
  currency: string,
  listing?: LinkPreview,
  players: {name: string}[],
  rooms: {name: string}[],
  totalPrice: number,
}): Promise<string> {
  const split = await createSplit({
    currency,
    rooms: rooms.length,
    listingDomain: listing?.host || null,
    listingImage: listing?.image || null,
    listingTitle: listing?.title || null,
    listingUrl: listing?.url || null,
    totalPrice,
  });
  createPlayers(split.id, players);
  createRooms(split.id, rooms);
  return split.short_code;
}