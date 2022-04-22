import {
  createRooms,
  deleteRoomsByGameId,
  getRoomsBySplitId,
} from '../rooms-repo'

const TEST_GAME_ID = 11;
describe('Rooms CRUD', () => {
  it('creates and deletes multiple rooms for a game', () => {
    let rooms = getRoomsBySplitId(TEST_GAME_ID);
    // First make sure there aren't any rooms yet
    expect(rooms.length).toBe(0);
    // Create rooms
    createRooms(TEST_GAME_ID, [{name: "John"}, {name: "Sam"}]);
    // Read rooms
    rooms = getRoomsBySplitId(TEST_GAME_ID);
    expect(rooms.length).toBe(2);
    // Delete rooms
    deleteRoomsByGameId(TEST_GAME_ID);
    rooms = getRoomsBySplitId(TEST_GAME_ID);
    expect(rooms.length).toBe(0);
  });
});