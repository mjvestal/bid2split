import { Listing, Player } from "helpers/Types";

import Button from "./Button"
import Headline from "./Headline"
import ListingPreviewCard from "./ListingPreviewCard";
import VerticalCenterLayout from "./VerticalCenterLayout";
import { useState } from "react";

export default function NotPlayersTurnPage({
  listing,
  onClaimPlayer,
  players,
  price,
}: {
  listing: Listing | null,
  onClaimPlayer: (id: number) => void,
  players: Player[],
  price: number,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(-1);
  return (
    <VerticalCenterLayout>
      <Headline>Bid on rooms</Headline>
      <>
        {listing != null && <ListingPreviewCard price={price} {...listing} /> }
      </>
      <div className="self-start">
      {
        players.map(({id, name}) => {
          return (
            <div key={id}>
              <label className="mt-2 inline-flex items-center">
                <input 
                  checked={id === selectedPlayer}
                  name="price_option"
                  onChange={(event) => {setSelectedPlayer(parseInt(event.currentTarget.value))}}
                  type="radio"
                  value={id}
                />
                <span className="ml-2 text-xl">{name}</span>
              </label>
            </div>
          )
        })
      }
      </div>
      <div className="mt-10">
        <Button onClick={() => { onClaimPlayer(selectedPlayer)}}>Go</Button>
      </div>
    </VerticalCenterLayout>
  )
}