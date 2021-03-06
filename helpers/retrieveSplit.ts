import {EntPlayer, getPlayersBySplitId} from './players-repo';
import { Listing, Player, PlayerRoomRent, PlayerWithBids, Room, SplitType, UnsolvedSplit } from './Types';

import {getRoomsBySplitId} from './rooms-repo';
import {getSplitByUid} from './splits-repo';
import nullthrows from 'nullthrows';

export async function retrieveUnsolvedSplit(splitUid: string): Promise<UnsolvedSplit> {
  const split = await getSplitByUid(splitUid);
  if (split == null) {
    throw Error(`No split for ID: ${splitUid}`);
  }
  const players: PlayerWithBids[] = (await getPlayersBySplitId(split.id)).map((player) => {
    return {
      id: player.id,
      bids: player.bids,
      name: player.name,
    };
  });
  const rooms: Room[] = (await getRoomsBySplitId(split.id)).map((room) => {
    return {
      id: room.id,
      name: room.name,
    };
  });

  return {
    id: split.id,
    players,
    rooms,
    totalPrice: split.total_price,
    uid: splitUid
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

export default async function retrieveSplit(uid: string): Promise<SplitType | null> {
  const split = await getSplitByUid(uid);
  if (split == null) {
    return null;
  }
  const id = split.id;
  const rooms: Room[] = (await getRoomsBySplitId(id)).map((room) => {
    return {
      id: room.id,
      name: room.name,
    };
  });
  const allPlayers = await getPlayersBySplitId(id);
  if (allPlayers.length === 0) {
    throw Error(`No people for split ID: ${uid}`);
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

  const {
    listing_domain,
    listing_image,
    listing_title,
    listing_url,
  } = split;
  let listing: Listing | null = null;
  if (listing_domain && listing_image && listing_title && listing_url) {
    listing = {
      domain: listing_domain,
      image: listing_image,
      title: listing_title,
      url: listing_url,
    };
  }

  return {
    id,
    currency: split.currency,
    listing,
    pendingPlayers,
    rooms,
    totalPrice: split.total_price,
    result,
    uid,
  };
}