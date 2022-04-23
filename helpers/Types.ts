export type Player = {
  id: number,
  name: string,
};

export type PlayerWithBids = Player & {
  bids: number[] | null,
};

export type Room = {
  id: number,
  name: string,
};

export type PlayerRoomRent = {
  player: Player,
  room: Room,
  rent: number,
};

export type SplitType = {
  id: number,
  listing: Listing | null,
  pendingPlayers?: Player[],
  result?: PlayerRoomRent[],
  rooms: Room[],
  totalPrice: number,  
};

export type UnsolvedSplit = {
  id: number,
  players: PlayerWithBids[],
  rooms: Room[],
  totalPrice: number,  
};

export type MutatedSplit = {
  pendingPlayers?: Player[],
  result?: PlayerRoomRent[],
}

export type Listing = {
  domain: string,
  image: string,
  title: string,
  url: string,
};