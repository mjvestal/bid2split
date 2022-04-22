import {
  createPlayers,
  deletePlayersByGameId,
  getPlayersBySplitId,
} from '../players-repo'

const TEST_GAME_ID = 11;
describe('Players CRUD', () => {
  it('creates and deletes multiple players for a game', () => {
    let players = getPlayersBySplitId(TEST_GAME_ID);
    // First make sure there aren't any players yet
    expect(players.length).toBe(0);
    // Create players
    createPlayers(TEST_GAME_ID, [{name: "John"}, {name: "Sam"}]);
    // Read players
    players = getPlayersBySplitId(TEST_GAME_ID);
    expect(players.length).toBe(2);
    // Delete players
    deletePlayersByGameId(TEST_GAME_ID);
    players = getPlayersBySplitId(TEST_GAME_ID);
    expect(players.length).toBe(0);
  });
});