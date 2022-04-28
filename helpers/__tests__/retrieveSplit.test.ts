import { SplitType, UnsolvedSplit } from 'helpers/Types';
import {getSplitById, getSplitByUid} from '../splits-repo';
import retrieveSplit, {retrieveUnsolvedSplit} from '../retrieveSplit';

import {getPlayersBySplitId} from '../players-repo';
import {getRoomsBySplitId} from '../rooms-repo';

jest.mock('../splits-repo');
jest.mock('../players-repo');
jest.mock('../rooms-repo');

const GAME_ID = 2;
const GAME_UID = "abc";

describe('retrieveSplit', () => {
  describe('game exists', () => {
    beforeEach(() => {
      // Mock game
      (getSplitById as jest.Mock).mockImplementation(() => {
        return {
          id: GAME_ID,
          rooms: 4,
          total_price: 1000,
        }
      });

      (getSplitByUid as jest.Mock).mockImplementation(() => {
        return {
          id: GAME_ID,
          rooms: 4,
          total_price: 1000,
        }
      });

      // Mock players
      (getPlayersBySplitId as jest.Mock).mockImplementation(() => {
        return [{
          id: 1,
          game_id: GAME_ID,
          name: 'John',
          bids: null,
        }, {
          id: 2,
          game_id: GAME_ID,
          name: 'Paul',
          bids: null,
        }, {
          id: 3,
          game_id: GAME_ID,
          name: 'Ringo',
          bids: null,
        }, {
          id: 4,
          game_id: GAME_ID,
          name: 'George',
          bids: null,
        }];
      });

      // Mock rooms
      (getRoomsBySplitId as jest.Mock).mockImplementation(() => {
        return [{
          game_id: GAME_ID,
          name: 'Master',
          room_number: 1,
        }, {
          game_id: GAME_ID,
          name: 'Suite 2',
          room_number: 2,
        }, {
          game_id: GAME_ID,
          name: 'Shared bath',
          room_number: 3,
        }, {
          game_id: GAME_ID,
          name: 'Twin beds',
          room_number: 4,
        }]
      });
    });

    it('should return existing game', () => {
      const game = retrieveSplit(GAME_UID);
      const expected: SplitType = {
        id: GAME_ID,
        listing: null,
        pendingPlayers: [
          {
            id: 1,
            name: 'John',
          }, {
            id: 2,
            name: 'Paul',
          }, {
            id: 3,
            name: 'Ringo',
          }, {
            id: 4,
            name: 'George',
          }
        ],
        rooms: [{
          name: 'Master',
          id: 1,
        }, {
          name: 'Suite 2',
          id: 2,
        }, {
          name: 'Shared bath',
          id: 3,
        }, {
          name: 'Twin beds',
          id: 4,
        }],
        totalPrice: 1000,
        uid: GAME_UID,
      }
      expect(game).toEqual(expected);
    });
  });

  describe('retrieveUnsolvedSplit', () => {

    it('should return existing game', () => {
      const game = retrieveUnsolvedSplit(GAME_ID);
      const expected: UnsolvedSplit = {
        id: GAME_ID,
        players: [
          {
            id: 1,
            name: 'John',
            bids: null,
          }, {
            id: 2,
            name: 'Paul',
            bids: null,
          }, {
            id: 3,
            name: 'Ringo',
            bids: null,
          }, {
            id: 4,
            name: 'George',
            bids: null,
          }
        ],
        rooms: [{
          name: 'Master',
          id: 1,
        }, {
          name: 'Suite 2',
          id: 2,
        }, {
          name: 'Shared bath',
          id: 3,
        }, {
          name: 'Twin beds',
          id: 4,
        }],
        totalPrice: 1000,
      }
      expect(game).toEqual(expected);
    });
  });
});