import { Listing, Player } from "helpers/Types";

import Button from "./Button"
import Center from "./Center";
import Headline from "./Headline"
import ListingPreviewCard from "./ListingPreviewCard";
import ShareSplitInput from "./ShareSplitInput";
import VerticalCenterLayout from "./VerticalCenterLayout";
import { useState } from "react";

export default function CreateSuccessPage({
  listing,
  onClaimPlayer,
  players,
  price,
  splitUid,
}: {
  listing: Listing | null,
  onClaimPlayer: (id: number) => void,
  players: Player[],
  price: number,
  splitUid: string,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(-1);
  return (
    <VerticalCenterLayout>
      <Headline level={1}>Success!</Headline>
      <p className="mt-2">
        Send a link to your group so they can submit their bids.
      </p>
      <div className="mt-2 w-full">
        <ShareSplitInput splitUid={splitUid} />
      </div>
      
      <Listing listing={listing} price={price} />
      <section className="mt-8 border-t pt-8 container mx-auto">
        <Headline level={2}>Get started</Headline>
        <p className="mt-4">Who are you submitting a bid for?</p>
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
          <Center>
            <Button
              disabled={selectedPlayer < 0} 
              onClick={() => { onClaimPlayer(selectedPlayer)}}>
              Go
            </Button>
          </Center>
        </div>
      </section>
    </VerticalCenterLayout>
  )
}

function Listing({
  listing,
  price,
}: {
  listing: Listing | null,
  price: number,
}) {
  if (listing == null) {
    return null;
  }
  return (
    <section className="mt-8 border-t pt-8">
      <Headline level={2}>Where you&apos;re staying</Headline>
      <div className="mt-4">
        <ListingPreviewCard
          domain={listing.domain}
          image={listing.image}
          price={price}
          title={listing.title}
          url={listing.url}
        />
      </div>
    </section>
  )
}