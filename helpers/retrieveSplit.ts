import {EntPlayer, getPendingPlayersBySplitId, getPlayersBySplitId} from './players-repo';
import { Player, PlayerRoomRent, PlayerWithBids, Room, SplitType, UnsolvedSplit } from './Types';

import {getRoomsBySplitId} from './rooms-repo';
import {getSplitById} from './splits-repo';
import nullthrows from 'nullthrows';

export function retrieveUnsolvedSplit(id: number): UnsolvedSplit {
  const game = getSplitById(id);
  if (game == null) {
    throw Error(`No split for ID: ${id}`);
  }
  const players: PlayerWithBids[] = getPlayersBySplitId(id).map((player) => {
    return {
      id: player.id,
      bids: player.bids,
      name: player.name,
    };
  });
  const rooms: Room[] = getRoomsBySplitId(id)?.map((room) => {
    return {
      id: room.room_number,
      name: room.name,
    };
  });

  return {
    id,
    players,
    rooms,
    totalPrice: game.total_price,
  };
}

function getSplitResult(players: EntPlayer[], rooms: Room[]): PlayerRoomRent[] {
  const roomsById = rooms.reduce((accum: {[key: number]: Room}, room) => {
    accum[room.id] = room;
    return accum;
  }, {});
  return players.reduce((accum: PlayerRoomRent[], player) => {
    accum.push({
      player: {
        id: player.id,
        name: player.name
      }, 
      room: roomsById[nullthrows(player.room)], 
      rent: nullthrows(player.rent)
    });
    return accum;
  }, []).sort((a, b) => a.rent - b.rent);
}

export default function retrieveSplit(id: number): SplitType {
  const game = getSplitById(id);
  if (game == null) {
    throw Error(`No split for ID: ${id}`);
  }
  const rooms: Room[] = getRoomsBySplitId(id)?.map((room) => {
    return {
      id: room.room_number,
      name: room.name,
    };
  });
  const allPlayers = getPlayersBySplitId(id);
  if (allPlayers.length === 0) {
    throw Error(`No people for split ID: ${id}`);
  }

  let pendingPlayers: Player[] | undefined;
  let result: PlayerRoomRent[] | undefined;
  if (allPlayers[0].rent != null) {
    // Resolved split
    result = getSplitResult(allPlayers, rooms);
  } else {
    pendingPlayers = allPlayers.filter(p => p.bids == null).map((player) => {
      return {
        id: player.id,
        name: player.name,
      };
    });
  }

  return {
    id,
    pendingPlayers,
    rooms,
    totalPrice: game.total_price,
    result,
  };
}