import { MutatedSplit, Player, PlayerRoomRent, PlayerWithBids, Room, UnsolvedSplit } from "./Types";
import { updatePlayerAssignment, updatePlayerBids } from "./players-repo";

import RentalHarmony from "lib/RentalHarmony";
import nullthrows from "nullthrows";

function calculateRents(split: UnsolvedSplit): PlayerRoomRent[] {
  const allBids = split.players.reduce((accum: {[key: string]: number[]}, player: PlayerWithBids) => {
    accum[player.name] = nullthrows(player.bids);
    return accum;
  }, {});
  const calculator = new RentalHarmony(split.totalPrice, allBids);

  const playersByName = split.players.reduce((accum: {[key: string]: Player}, player) => {
    accum[player.name] = {
      id: player.id,
      name: player.name,
    };
    return accum;
  }, {});

  let remainingTotal = split.totalPrice;
  return calculator.calculateRents().map(([playerName, roomIndex, exactRent], index, array) => {
    const player = playersByName[playerName];
    const room = split.rooms[roomIndex];
    const roundedRent = Math.round(exactRent);
    const rent = index < array.length - 1 ? roundedRent : remainingTotal;
    remainingTotal -= roundedRent;
    return {player, room, rent};
  }).sort((a, b) => a.rent - b.rent);
}

async function saveResult(splitId: number, playerRoomRents: PlayerRoomRent[]) {
  await Promise.all(playerRoomRents.map(({player, room, rent}) => {
    updatePlayerAssignment(splitId, player.id, room.id, rent);
  }));
}

/**
 * 
 * @param splitWithoutNewBids Split being mutated
 * @param playerId Player submitting bids for rooms
 * @param bids Bids player is submitting
 * @returns State after player has submitted their bids. If they are the last player,
 *          Then the result will be included, otherwise the remaining players will be included
 */
export default async function createPlayerBid(
  splitWithoutNewBids: UnsolvedSplit, 
  playerId: number, 
  bids: number[],
): Promise<MutatedSplit> {
  const playersWithBids = [...splitWithoutNewBids.players];
  const indexOfPlayer = playersWithBids.findIndex(p => p.id === playerId);
  if (indexOfPlayer < 0) {
    throw Error('Player not found');
  }

  const updatedPlayer = await updatePlayerBids(splitWithoutNewBids.id, playerId, bids);
  if (updatedPlayer == null) {
    throw Error('Player not found');
  }

  // Replace player in memory
  playersWithBids.splice(indexOfPlayer, 1, {
    id: updatedPlayer.id,
    name: updatedPlayer.name,
    bids: updatedPlayer.bids,
  });

  const pendingPlayers = playersWithBids.filter(p => p.bids == null);
  if (pendingPlayers.length > 0) {
    return {
      pendingPlayers,
    }
  }

  const updatedSplit: UnsolvedSplit = {
    ...splitWithoutNewBids,
    players: playersWithBids,
  };
  const result = calculateRents(updatedSplit);
  await saveResult(splitWithoutNewBids.id, result);
  return {
    result,
  };
}