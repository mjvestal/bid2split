import { Player, Room } from "helpers/Types";
import { useMemo, useState } from "react";

import Button from "./Button";
import Headline from "./Headline";
import Input from "./Input";
import nullthrows from "nullthrows";

export default function PlayersTurnPage({
  onSubmit,
  player,
  rooms,
  totalPrice,
}: {
  onSubmit: (bids: number[]) => void,
  player: Player,
  rooms: Room[],
  totalPrice: number,
}) {
  const [
    bids,
    leastPreferredId,
    pickLeastPreferred,
    setBidForRoom,
  ] = useBidsFields(rooms);
  const submitDisabled = Object.values(bids).some(value => value == null);
  const handleClickSubmit = () => {
    onSubmit(orderedBids(bids, rooms));
  };
  
  const remainingRooms = 
    leastPreferredId < 0 
      ? [] 
      : rooms.filter(room => room.id !== leastPreferredId);
  return (
    <div className="flex min-h-screen h-screen-ios min-h-screen-ios flex-col items-center py-20">
      <main className="flex w-full flex-1 flex-col items-center px-8">
        <div className="flex w-full flex-col items-center">
          <Headline>{player.name}</Headline>

          <div className="self-start w-full">
            <p className="mt-4">Select your <b>least</b> preferred room</p>
            <select 
                className="block
                      w-full
                      mt-1
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(event) => pickLeastPreferred(parseInt(event.currentTarget.value))}
                value={leastPreferredId}
            >
              <option value={-1}></option>
              {rooms.map(({id, name}) => {
                return <option key={id} value={id}>{name}</option>
              })}
            </select>

            <BidInstructions leastPreferredId={leastPreferredId} rooms={rooms} totalPrice={totalPrice} />
            
            {
              remainingRooms.map(({id, name}) => {
                return (
                  <label className="block mt-8" key={id}>
                    <span className="">{name}</span>
                    <Input 
                      onChange={(event) => setBidForRoom(id, event.currentTarget.value)}
                      value={bids[id] || ""}
                    />
                  </label>
                );
              })
            }
          </div>
          <div className="mt-10">
            <Button disabled={submitDisabled} onClick={submitDisabled ? () => {} : handleClickSubmit}>Submit</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

function BidInstructions({
  leastPreferredId,
  rooms,
  totalPrice,
}: {
  leastPreferredId: number,
  rooms: Room[],
  totalPrice: number
}) {
  const leastPreferredRoom = rooms.find(r => r.id === leastPreferredId);
  if (!leastPreferredRoom) {
    return null;
  }
  const averagePrice = Math.round(totalPrice / rooms.length);
  return (
    <p className="mt-8">
      Assuming <b>{leastPreferredRoom.name}</b> is priced slightly less than the average price of ${averagePrice}/room, how much  
      <b> more</b> are you willing to pay for each room?
    </p>
  );
}

function orderedBids(bidsById: BidMap, rooms: Room[]): number[] {
  return rooms.map(room => nullthrows(bidsById[room.id]));
}

type BidMap = {[key: number]: number | null};
function emptyMap(rooms: Room[]): BidMap {
  return rooms.reduce((accum: BidMap, room) => {
    accum[room.id] = null;
    return accum;
  }, {});
}

function useBidsFields(
  rooms: Room[]
): [
  bids: BidMap, 
  leastPreferredId: number,
  pickLeastPreferred: (bidId: number) => void, 
  setBid: (bidId: number, value: string) => void,
] {
  const bidsById = useMemo(() => {
    return emptyMap(rooms);
  }, [rooms]);

  const [bids, setBids] = useState(bidsById);
  const [leastPreferredId, setLeastPreferredId] = useState<number>(-1);

  const pickLeastPreferred = (id: number) => {
    const newBids = emptyMap(rooms);
    newBids[id] = 0;
    setLeastPreferredId(id);
    setBids(newBids);
  };
  const setBidForRoom = (id: number, value: string) => {
    const newBids = {
      ...bids,
    };
    const bid = (value == null || value.length === 0 || isNaN(parseInt(value))) ? null : parseInt(value);
    newBids[id] = bid;
    setBids(newBids);
  };

  return [bids, leastPreferredId, pickLeastPreferred, setBidForRoom];
}