import decisionsJson from '../data/decisions.json'
import fs from 'fs'

export type EntDecision = {
  game_id: number,
  player_id: number,
  decision: number,
  options: number[],
}

// Keep array in memory
let decisions = decisionsJson;

/* READ */
export function getDecisionsByGameId(gameId: number): EntDecision[] {
  return decisions.filter(x => x.game_id.toString() === gameId.toString());
}

export function getDecisionsByGameAndPlayer(gameId: number, playerId: number): EntDecision[] {
  return decisions.filter(x => x.game_id.toString() === gameId.toString() && x.player_id.toString() === playerId.toString());
}

/* CREATE */
export function createDecision(gameId: number, playerId: number, decision: number, options: number[]) {
  decisions.push({
    game_id: gameId,
    player_id: playerId,
    decision,
    options,
  });

  saveData();
}

/* DELETE */
export function deleteDecisionsByGameId(gameId: number) {
  decisions = decisions.filter(x => x.game_id.toString() !== gameId.toString());

  saveData();
}

/*
 * Private functions
 */
function saveData() {
  fs.writeFileSync('data/decisions.json', JSON.stringify(decisions, null, 2));
}