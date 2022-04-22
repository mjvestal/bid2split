import {createPlayers} from '../players-repo';
import {createRooms} from '../rooms-repo';
import {createSplit} from '../splits-repo';
import createSplitHelper from '../createSplit';

const GAME_ID = -2;
const PLAYERS = [{name: 'A'}, {name: 'B'}, {name: 'C'}];
const ROOMS = [{name: 'X'}, {name: 'Y'}, {name: 'Z'}];

jest.mock('../splits-repo', () => {
  return {
    createSplit: jest.fn(() => GAME_ID),
  }
});
jest.mock('../players-repo');
jest.mock('../rooms-repo');

describe('createSplit Helper', () => {
  it('creates a split, players, and rooms', () => {
    expect(createSplitHelper({
      players: PLAYERS,
      rooms: ROOMS,
      totalPrice: 2000,
    })).toEqual(GAME_ID);

    // Called createSplit
    expect((createSplit as jest.Mock).mock.calls[0][0]).toEqual({
      rooms: ROOMS.length,
      totalPrice: 2000,
    });

    // Called createPlayers with expected input
    expect((createPlayers as jest.Mock).mock.calls[0]).toEqual([
      GAME_ID,
      PLAYERS,
    ]);

    // Called createRooms with expected input
    expect((createRooms as jest.Mock).mock.calls[0]).toEqual([
      GAME_ID,
      ROOMS,
    ]);
  })
});