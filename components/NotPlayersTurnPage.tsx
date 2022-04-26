import { Listing, Player } from "helpers/Types";

import Button from "./Button"
import Center from "./Center";
import Headline from "./Headline"
import Link from "next/link";
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
      <Hero listing={listing} />
      <HowItWorks />
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

function Hero({
  listing,
}: {
  listing: Listing | null,
}) {
  return (
    <section>
      {
        isAirbnb(listing) ? (
          <Headline>Split your Airbnb fairly</Headline>
        ) : (
          <Headline>Split your rental fairly</Headline>
        )
      }
      <p className="mt-8">Divide the cost of your rental so that everyone is happy</p>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="mt-8 border-t pt-8">
      <Headline level={2}>How it works</Headline>
      <p className="mt-4">
        Each person will select their least preferred sleeping area then bid
        on how much more they are willing to pay for each of the other sleeping
        areas.
      </p>
      <p className="mt-4">
        Once every one has submitted bids, an algorithm will assign rooms and
        fairly divide the total cost.
      </p>
      <p className="mt-4">
        If you are assigned to your least preferred sleeping area, you will
        pay less than if everyone paid the same.
      </p>
      <div className="mt-8">
        <Center>
          <Link href="/example"><a className="text-cyan-600">See an example</a></Link>
        </Center>
      </div>
    </section>
  )
}

function isAirbnb(listing: Listing | null): boolean {
  return listing != null && listing.domain.indexOf('airbnb.com') > 0;
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