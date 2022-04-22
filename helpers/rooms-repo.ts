import fs from 'fs'
import roomsJson from '../data/rooms.json'

export type EntRoom = {
  game_id: number,
  name: string,
  room_number: number,
}

// Keep array in memory
let rooms = roomsJson;

/* READ */
export function getRoomsBySplitId(splitId: number): EntRoom[] {
  return rooms.filter(x => x.game_id.toString() === splitId.toString());
}

/* CREATE */
export function createRooms(gameId: number, draftRooms: Array<{name: string}>) {
  draftRooms.forEach((room, index: number) => {
    const newRoom = {
      game_id: gameId,
      name: room.name,
      room_number: (index + 1),
    };
  
    rooms.push(newRoom);
  });

  saveData();
}

/* DELETE */
export function deleteRoomsByGameId(gameId: number) {
  rooms = rooms.filter(x => x.game_id.toString() !== gameId.toString());

  saveData();
}

/*
 * Private functions
 */
function saveData() {
  fs.writeFileSync('data/rooms.json', JSON.stringify(rooms, null, 2));
}