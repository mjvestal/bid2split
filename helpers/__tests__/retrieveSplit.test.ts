jest.mock('../supabaseClient');

import { SplitType, UnsolvedSplit } from 'helpers/Types';
import retrieveSplit, {retrieveUnsolvedSplit} from '../retrieveSplit';

import {getPlayersBySplitId} from '../players-repo';
import {getRoomsBySplitId} from '../rooms-repo';
import {getSplitByUid} from '../splits-repo';

jest.mock('../splits-repo');
jest.mock('../players-repo');
jest.mock('../rooms-repo');

const SPLIT_D = 2;
const SPLIT_SHORT_CODE = "abc";

describe('retrieveSplit', () => {
  describe('game exists', () => {
    beforeEach(() => {
      // Mock game
      (getSplitByUid as jest.Mock).mockImplementation(async () => {
        return {
          id: SPLIT_D,
          currency: "USD",
          rooms: 4,
          total_price: 1000,
          short_code: SPLIT_SHORT_CODE,
        }
      });

      // Mock players
      (getPlayersBySplitId as jest.Mock).mockImplementation(async () => {
        return [{
          id: 1,
          split_id: SPLIT_D,
          name: 'John',
          bids: null,
        }, {
          id: 2,
          split_id: SPLIT_D,
          name: 'Paul',
          bids: null,
        }, {
          id: 3,
          split_id: SPLIT_D,
          name: 'Ringo',
          bids: null,
        }, {
          id: 4,
          split_id: SPLIT_D,
          name: 'George',
          bids: null,
        }];
      });

      // Mock rooms
      (getRoomsBySplitId as jest.Mock).mockImplementation(async () => {
        return [{
          split_id: SPLIT_D,
          name: 'Master',
          id: 1,
        }, {
          split_id: SPLIT_D,
          name: 'Suite 2',
          id: 2,
        }, {
          split_id: SPLIT_D,
          name: 'Shared bath',
          id: 3,
        }, {
          split_id: SPLIT_D,
          name: 'Twin beds',
          id: 4,
        }]
      });
    });

    it('should return existing game', async () => {
      const game = await retrieveSplit(SPLIT_SHORT_CODE);
      const expected: SplitType = {
        id: SPLIT_D,
        currency: "USD",
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
        uid: SPLIT_SHORT_CODE,
      }
      expect(game).toEqual(expected);
    });
  });

  describe('retrieveUnsolvedSplit', () => {

    it('should return existing game', async () => {
      const game = await retrieveUnsolvedSplit(SPLIT_SHORT_CODE);
      const expected: UnsolvedSplit = {
        id: SPLIT_D,
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
        uid: SPLIT_SHORT_CODE,
      }
      expect(game).toEqual(expected);
    });
  });
});