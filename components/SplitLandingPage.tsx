import { Listing, Player } from "helpers/Types";

import Center from "./Center";
import Headline from "./Headline"
import Link from "next/link";
import ListingPreviewCard from "./ListingPreviewCard";
import VerticalCenterLayout from "./VerticalCenterLayout";
import SelectPlayerSection from "./SelectPlayerSection";
import WelcomeBackSection from "./WelcomeBackSection";
import { useSplitContext } from "lib/useSplitContext";
import nullthrows from "nullthrows";
import ShareSplitInput from "./ShareSplitInput";
import listingSite from "lib/listingSite";

export default function SplitLandingPage({
  isSuccess,
  onClaimPlayer,
  player,
}: {
  isSuccess: boolean,
  onClaimPlayer: (id: number) => void,
  player: Player | null,
}) {
  const split = useSplitContext();
  const {
    listing,
    pendingPlayers,
    totalPrice,
    uid,
  } = split;
  return (
    <VerticalCenterLayout>
      {
        isSuccess ? (
          <>
            <Headline level={1}>Success!</Headline>
            <p className="mt-2">
              Send a link to your group so they can submit their bids.
            </p>
            <div className="mt-2 w-full">
              <ShareSplitInput splitUid={split.uid} />
            </div>
          </>
        ) : (
          <>
            <Hero listing={listing} />
            <HowItWorks />
          </>
        )
      }
      
      <Listing listing={listing} price={totalPrice} />
      {
        player == null ? (
          <SelectPlayerSection onClaimPlayer={onClaimPlayer} players={nullthrows(pendingPlayers)} />
        ) : (
          <WelcomeBackSection player={player} splitUid={uid} />
        )
      }
    </VerticalCenterLayout>
  )
}

function Hero({
  listing,
}: {
  listing: Listing | null,
}) {
  const site = listingSite(listing);
  return (
    <section>
      <Headline>Split your {site ?? 'rental'} fairly</Headline>
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
    <section className="mt-8 border-t pt-8 w-full">
      <Headline level={2}>Where you&apos;re staying</Headline>
      <div className="mt-6">
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