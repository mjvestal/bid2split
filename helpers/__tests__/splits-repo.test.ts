import {
  createSplit,
  deleteSplit,
  getAllSplits,
  getSplitByUid,
} from '../splits-repo'
describe('Split CRUD', () => {
  const SPLIT = {
    currency: "USD",
    rooms: 3,
    totalPrice: 100,
  };

  describe('CREATE', () => {
    let testSplitId: number;
    afterEach(() => {
      deleteSplit(testSplitId);
    });
    it('creates a new split', () => {
      const numberOfSplitsBefore = getAllSplits().length;
      testSplitId = createSplit(SPLIT).id;
      expect(getAllSplits().length).toEqual(numberOfSplitsBefore + 1);
    });
  });

  describe('READ', () => {
    let testSplitId: number;
    let testSplitUid: string;
    afterEach(() => {
      deleteSplit(testSplitId);
    });
    it('gets split by uid', () => {
      const split = createSplit(SPLIT);
      testSplitId = split.id;
      expect(getSplitByUid(split.uid)?.rooms).toEqual(split.rooms);
    });
  });

  describe('DELETE', () => {
    const numberOfSplitsBefore = getAllSplits().length;
    const testSplitId = createSplit(SPLIT).id;
    deleteSplit(testSplitId);
    // number of splits should be back to where it started
    expect(getAllSplits().length).toEqual(numberOfSplitsBefore);
  });
});