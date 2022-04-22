import RentalHarmony, {
  calculateEdgeWeights,
  getEmptyDifferenceObject,
  getRoomAssignments,
  getUpperBound,
  getValueMatrix,
  maxWeightMatching,
} from "../RentalHarmony";

describe('Rental Harmony', () => {

  const input = {
    'Alice': [30,20,0,200],
    'Bob': [201,32,23,0],
    'Caitlin': [31,204,29,0],
    'Dave': [32,26,212,0]
  };

  const bids = [
    [30,    20,     0,      200 ],
    [201,   32,     23,     0   ],
    [31,    204,    29,     0   ],
    [32,    26,     212,    0   ]
  ];

  describe('calculateEdgeWeights', () => {
    it('returns the expected result', () => {
      const expected = [
        [0, 4, 30],
        [0, 5, 201], 
        [0, 6, 31], 
        [0, 7, 32], 
        [1, 4, 20],
        [1, 5, 32], 
        [1, 6, 204], 
        [1, 7, 26], 
        [2, 4, 0], 
        [2, 5, 23], 
        [2, 6, 29], 
        [2, 7, 212], 
        [3, 4, 200], 
        [3, 5, 0],
        [3, 6, 0],
        [3, 7, 0],
      ];
      expect(calculateEdgeWeights(bids)).toEqual(expected);
    })
  });

  describe('maxWeightMatching', () => {
    it ('returns expected result', () => {
      const s = maxWeightMatching(calculateEdgeWeights(bids));
      expect(s.slice(bids.length)).toEqual([3, 0, 1, 2]);
    });
  });

  describe('getRoomAssignments', () => {
    it('returns expected room assignments', () => {
      expect(getRoomAssignments(input)).toEqual([3, 0, 1, 2]);
    });
  });

  describe('getEmptyDifferenceObject', () => {
    it('returns the expected result', () => {
      expect(getEmptyDifferenceObject(3)).toEqual({
        '0_1': null,
        '0_2': null,
        '1_0': null,
        '1_2': null,
        '2_0': null,
        '2_1': null,
        '0_0': 0,
        '1_1': 0,
        '2_2': 0,
      })
    });
  });

  describe('getValueMatrix', () => {
    it('returns the expected result', () => {
      expect(getValueMatrix(input)).toEqual({
        '0_0': 200,
        '0_1': 30,
        '0_2': 20,
        '0_3': 0,
        '1_0': 0,
        '1_1': 201,
        '1_2': 32,
        '1_3': 23,
        '2_0': 0,
        '2_1': 31,
        '2_2': 204,
        '2_3': 29,
        '3_0': 0,
        '3_1': 32,
        '3_2': 26,
        '3_3': 212,
      });
    });
  });

  describe('getUpperBound', () => {
    it('returns the expected result', () => {
      expect(getUpperBound(input)).toEqual({
        '0_0': 0,
        '0_1': 170,
        '0_2': 180,
        '0_3': 200,
        '1_0': 201,
        '1_1': 0,
        '1_2': 169,
        '1_3': 178,
        '2_0': 204,
        '2_1': 173,
        '2_2': 0,
        '2_3': 175,
        '3_0': 212,
        '3_1': 180,
        '3_2': 186,
        '3_3': 0,
      });
    });
  });

  describe('RentalHarmony', () => {
    describe('solve', () => {
      it('returns correct assignment & rent', () => {
        const r = new RentalHarmony(5400, input);
        expect(r.calculateRents()).toEqual([
          ['Alice',   3, 1337.0],
          ['Bob',     0, 1352.5],
          ['Caitlin', 1, 1354.5],
          ['Dave',    2, 1356.0],
        ]);
      });
    });

    describe('another scenario', () => {
      it('returns expected output', () => {
        const input = {
          'Rich'    :   [200,  150,     20,    0   ],
          'Avg 1'   :   [100,   80,      5,    0   ],
          'Avg 2'   :   [ 90,   75,     10,    0   ],
          'Cheap'   :   [ 40,   30,      5,    0   ],
        };
        const r = new RentalHarmony(7440, input);
        expect(r.calculateRents()).toEqual([
          ['Rich',   0, 1922.50],
          ['Avg 1',  1, 1887.50],
          ['Avg 2',  2, 1818.75],
          ['Cheap',  3, 1811.25],
        ]);
      });
    });

    describe('similar bids scenario', () => {
      it('returns expected output', () => {
        const input = {
          'Rich'    :   [200,  150,     20,    0   ],
          'Avg 1'   :   [180,  145,     15,    0   ],
          'Avg 2'   :   [165,  140,     10,    0   ],
          'Cheap'   :   [140,  120,     10,    0   ],
        };
        const r = new RentalHarmony(7440, input);
        expect(r.calculateRents()).toEqual([
          ['Rich',   0, 1959.375],
          ['Avg 1',  1, 1916.875],
          ['Avg 2',  3, 1776.875],
          ['Cheap',  2, 1786.875],
        ]);
      });
    });

    describe('different "best" rooms bids scenario', () => {
      it('returns expected output', () => {
        const input = {
          'Rich'    :   [200,  150,     20,    0   ],
          'Avg 1'   :   [180,  145,     15,    0   ],
          'Avg 2'   :   [179,  180,     10,    0   ], // <-
          'Cheap'   :   [140,  120,     10,    0   ],
        };
        const r = new RentalHarmony(7440, input);
        expect(r.calculateRents()).toEqual([
          ['Rich',   0, 1955.3125],
          ['Avg 1',  2, 1782.8125],
          ['Avg 2',  1, 1931.5625],
          ['Cheap',  3, 1770.3125],
        ]);
      });
    });

    describe('One person prefers the "worst" room', () => {
      it('returns expected output', () => {
        const input = {
          'Rich'    :   [200,  150,     20,    0   ],
          'Avg 1'   :   [180,  145,     15,    0   ],
          'Avg 2'   :   [165,  140,     10,    0   ],
          'Cheap'   :   [  0,    5,     10,   50   ],
        };
        const r = new RentalHarmony(7440, input);
        expect(r.calculateRents()).toEqual([
          ['Rich',   0, 1953.125],
          ['Avg 1',  2, 1780.625],
          ['Avg 2',  1, 1910.625],
          ['Cheap',  3, 1795.625],
        ]);
      });
    });
  });
});