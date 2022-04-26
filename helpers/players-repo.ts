import fs from 'fs'
import playersJson from '../data/players.json'

export type EntPlayer = {
 id: number,
 game_id: number,
 name: string,
 bids: number[] | null,
 rent: number | null,
 room: number | null,
}

// Keep array in memory
let players: EntPlayer[] = playersJson;

/* READ */
export function getPlayersBySplitId(splitId: number): EntPlayer[] {
  return players.filter(x => x.game_id.toString() === splitId.toString());
}

export function getPlayerIndexBySplitAndPlayerId(splitId: number, playerId: number): number {
  return players.findIndex(x => x.game_id.toString() === splitId.toString() && x.id === playerId);
}

/* CREATE */
export function createPlayers(splitId: number, draftPlayers: Array<{name: string}>) {
  draftPlayers.forEach((player, index: number) => {
    const newPlayer: EntPlayer = {
      id: index + 1,
      game_id: splitId,
      name: player.name,
      bids: null,
      room: null,
      rent: null,
    };
  
    players.push(newPlayer);
  });

  saveData();
}

/* UPDATE */
export function updatePlayerBids(splitId: number, playerId: number, bids: number[]): EntPlayer | null {
  const index = getPlayerIndexBySplitAndPlayerId(splitId, playerId);
  if (index < 0) {
    return null;
  }

  const player: EntPlayer = players[index];
  const updatedPlayer: EntPlayer = {
    ...player,
    bids,
  };

  players.splice(index, 1, updatedPlayer);

  saveData();

  return updatedPlayer;
}

export function updatePlayerAssignment(splitId: number, playerId: number, roomId: number, rent: number): EntPlayer | null {
  const index = getPlayerIndexBySplitAndPlayerId(splitId, playerId);
  if (index < 0) {
    return null;
  }

  const player: EntPlayer = players[index];
  const updatedPlayer: EntPlayer = {
    ...player,
    room: roomId,
    rent,
  };

  players.splice(index, 1, updatedPlayer);

  saveData();

  return updatedPlayer;
}

/* DELETE */
export function deletePlayersByGameId(splitId: number) {
  players = players.filter(x => x.game_id.toString() !== splitId.toString());

  saveData();
}

/*
 * Private functions
 */
function saveData() {
  fs.writeFileSync('data/players.json', JSON.stringify(players, null, 2));
}