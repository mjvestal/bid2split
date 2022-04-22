import {
 createDecision,
 deleteDecisionsByGameId,
 getDecisionsByGameId, 
} from '../decisions-repo'

const TEST_GAME_ID = 11;

describe('Decisions CRUD', () => {
  it('creates and deletes decisions for a game', () => {
    let decisions = getDecisionsByGameId(TEST_GAME_ID);
    // First make sure there aren't any decisions
    expect(decisions.length).toBe(0);
    // Create decision
    createDecision(TEST_GAME_ID, 1, 2, [250, 250, 250]);
    // Read decision
    decisions = getDecisionsByGameId(TEST_GAME_ID);
    expect(decisions.length).toBe(1);
    // Delete decisions
    deleteDecisionsByGameId(TEST_GAME_ID);
    decisions = getDecisionsByGameId(TEST_GAME_ID);
    expect(decisions.length).toBe(0);
  })
});