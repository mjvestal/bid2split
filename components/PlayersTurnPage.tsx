import { MutatedSplit, Player, Room } from "helpers/Types";
import { useMemo, useState } from "react";
import useSplitReducer, { setResult, updatePendingPlayers } from "lib/useSplitReducer";

import Button from "./Button";
import CenterLayout from "./CenterLayout";
import Headline from "./Headline";
import PriceAndCurrencyInput from "./PriceAndCurrencyInput";
import formatPrice from "lib/formatPrice";
import nullthrows from "nullthrows";
import { useSplitContext } from "lib/useSplitContext";

export default function PlayersTurnPage({
  player,
}: {
  player: Player,
}) {
  const {
    currency,
    rooms,
    totalPrice,
    uid,
  } = useSplitContext();
  const dispatch = useSplitReducer();
  const [
    bids,
    leastPreferredId,
    pickLeastPreferred,
    setBidForRoom,
  ] = useBidsFields(rooms, totalPrice);
  const [isLoading, setLoading] = useState(false);
  const submitDisabled = Object.values(bids).some(field => field.value == null || field.error != null);

  const handleClickSubmit = async () => {
    if (isLoading || submitDisabled) {
      return;
    }
    setLoading(true);
    const response = await fetch('/api/bids', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        splitUid: uid,
        bids: orderedBids(bids, rooms)
      }),
    });
    const responseObj = await response.json();
    const result: MutatedSplit = responseObj.result;
    if (result.pendingPlayers) {
      dispatch(updatePendingPlayers(result.pendingPlayers));
      return;
    }
    if (result.result) {
      dispatch(setResult(result.result));
      return;
    }
  };
  
  const remainingRooms = 
    leastPreferredId < 0 
      ? [] 
      : rooms.filter(room => room.id !== leastPreferredId);
  return (
    <CenterLayout>
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
                  focus:border-cyan-300 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
            onChange={(event) => pickLeastPreferred(parseInt(event.currentTarget.value))}
            value={leastPreferredId}
        >
          <option value={-1}></option>
          {rooms.map(({id, name}) => {
            return <option key={id} value={id}>{name}</option>
          })}
        </select>

        <BidInstructions 
          currency={currency}
          leastPreferredId={leastPreferredId} 
          rooms={rooms} 
          totalPrice={totalPrice}
        />
        
        {
          remainingRooms.map(({id, name}) => {
            const error = bids[id].error;
            return (
              <label className="block mt-8" key={id}>
                <span className="">{name}</span>
                <PriceAndCurrencyInput
                  currency={currency}
                  inputName={`price_${id}`}
                  max={totalPrice}
                  onChangePrice={(price) => setBidForRoom(id, price)}
                  price={bids[id].value}
                  required={error != null}
                />
                {
                  error != null && (
                    <div className="error mt-2">{error}</div>
                  )
                }
              </label>
            );
          })
        }
      </div>
      <div className="mt-10">
        <Button
          disabled={submitDisabled}
          loading={isLoading}
          onClick={submitDisabled ? () => {} : handleClickSubmit}>
          Submit
        </Button>
      </div>
    </CenterLayout>
  )
}

function BidInstructions({
  currency,
  leastPreferredId,
  rooms,
  totalPrice,
}: {
  currency: string,
  leastPreferredId: number,
  rooms: Room[],
  totalPrice: number
}) {
  const leastPreferredRoom = rooms.find(r => r.id === leastPreferredId);
  if (!leastPreferredRoom) {
    return null;
  }
  const averagePrice = Math.round(totalPrice / rooms.length);
  const formattedPrice = formatPrice(averagePrice, currency);
  return (
    <p className="mt-8">
      Assuming <b>{leastPreferredRoom.name}</b> is priced slightly less than the average price of {formattedPrice}/room, how much  
      <b> more</b> are you willing to pay for each room?
    </p>
  );
}

function orderedBids(bidsById: BidMap, rooms: Room[]): number[] {
  return rooms.map(room => nullthrows(bidsById[room.id].value));
}

type BidMap = {[key: number]: {value: number | null, error: string | null}};
function emptyMap(rooms: Room[]): BidMap {
  return rooms.reduce((accum: BidMap, room) => {
    accum[room.id] = {
      value: null,
      error: null,
    };
    return accum;
  }, {});
}

function useBidsFields(
  rooms: Room[],
  totalPrice: number,
): [
  bids: BidMap, 
  leastPreferredId: number,
  pickLeastPreferred: (bidId: number) => void, 
  setBid: (bidId: number, value: number | null) => void,
] {
  const bidsById = useMemo(() => {
    return emptyMap(rooms);
  }, [rooms]);

  const [bids, setBids] = useState(bidsById);
  const [leastPreferredId, setLeastPreferredId] = useState<number>(-1);

  const pickLeastPreferred = (id: number) => {
    const newBids = emptyMap(rooms);
    newBids[id].value = 0;
    setLeastPreferredId(id);
    setBids(newBids);
  };
  const setBidForRoom = (id: number, bid: number | null) => {
    const newBids = {
      ...bids,
    };
    newBids[id] = {
      error: newBids[id].error = bid != null && bid >= totalPrice ? `You cannot bid more than the total price` : null,
      value: bid,
    };
    setBids(newBids);
  };

  return [bids, leastPreferredId, pickLeastPreferred, setBidForRoom];
}