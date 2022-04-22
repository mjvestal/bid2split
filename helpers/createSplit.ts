import { createPlayers } from "./players-repo";
import { createRooms } from "./rooms-repo";
import { createSplit } from "./splits-repo";

export default function createSplitHelper({
  players,
  rooms,
  totalPrice,
}: {
  players: {name: string}[],
  rooms: {name: string}[],
  totalPrice: number,
}): number {
  const splitId = createSplit({
    rooms: rooms.length,
    totalPrice,
  });
  createPlayers(splitId, players);
  createRooms(splitId, rooms);
  return splitId;
}