import {createPlayers} from '../players-repo';
import {createRooms} from '../rooms-repo';
import {createSplit} from '../splits-repo';
import createSplitHelper from '../createSplit';

const SPLIT_ID = -2;
const SPLIT_UID = "abc";
const PLAYERS = [{name: 'A'}, {name: 'B'}, {name: 'C'}];
const ROOMS = [{name: 'X'}, {name: 'Y'}, {name: 'Z'}];

jest.mock('../splits-repo', () => {
  return {
    createSplit: jest.fn(() => {
      return {
        id: SPLIT_ID,
        uid: SPLIT_UID,
      };
    }),
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
    })).toEqual(SPLIT_UID);

    // Called createSplit
    expect((createSplit as jest.Mock).mock.calls[0][0]).toEqual({
      rooms: ROOMS.length,
      listingDomain: null,
      listingImage: null,
      listingTitle: null,
      listingUrl: null,
      totalPrice: 2000,
    });

    // Called createPlayers with expected input
    expect((createPlayers as jest.Mock).mock.calls[0]).toEqual([
      SPLIT_ID,
      PLAYERS,
    ]);

    // Called createRooms with expected input
    expect((createRooms as jest.Mock).mock.calls[0]).toEqual([
      SPLIT_ID,
      ROOMS,
    ]);
  })
});