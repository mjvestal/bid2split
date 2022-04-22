import {
  createSplit,
  deleteSplit,
  getAllSplits,
  getSplitById,
} from '../splits-repo'
describe('Split CRUD', () => {
  const split = {
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
      testSplitId = createSplit(split);
      expect(getAllSplits().length).toEqual(numberOfSplitsBefore + 1);
    });
  });

  describe('READ', () => {
    let testSplitId: number;
    afterEach(() => {
      deleteSplit(testSplitId);
    });
    it('gets split by id', () => {
      testSplitId = createSplit(split);
      expect(getSplitById(testSplitId)?.rooms).toEqual(split.rooms);
    });
  });

  describe('DELETE', () => {
    const numberOfSplitsBefore = getAllSplits().length;
    const testSplitId = createSplit(split);
    deleteSplit(testSplitId);
    // number of splits should be back to where it started
    expect(getAllSplits().length).toEqual(numberOfSplitsBefore);
  });
});