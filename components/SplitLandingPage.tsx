import { Listing, Player } from "helpers/Types";
import listingSite from "lib/listingSite";
import { useSplitContext } from "lib/useSplitContext";
import Link from "next/link";
import { useRouter } from "next/router";
import nullthrows from "nullthrows";
import Button from "./Button";
import Center from "./Center";
import Headline from "./Headline";
import ListingPreviewCard from "./ListingPreviewCard";
import Logo from "./Logo";
import Section from "./Section";
import ShareSplitInput from "./ShareSplitInput";
import { useState } from "react";

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
    currency,
    listing,
    pendingPlayers,
    totalPrice,
    uid,
  } = split;
  return (
    <div>
      {
        isSuccess ? (
          <Section>
            <div className="border-b pb-8">
              <Headline level={1}>Success!</Headline>
              <p className="mt-2">
                Send a link to your group so they can submit their bids.
              </p>
              <div className="mt-2 w-full">
                <ShareSplitInput splitUid={split.uid} />
              </div>
            </div>
          </Section>
        ) : (
          <>
            <Hero listing={listing} />
            <HowItWorks />
          </>
        )
      }
      
      <Listing currency={currency} listing={listing} price={totalPrice} />

      {
        player == null ? (
          <SelectPlayerSection onClaimPlayer={onClaimPlayer} players={nullthrows(pendingPlayers)} />
        ) : (
          <WelcomeBackSection player={player} splitUid={uid} />
        )
      }
    </div>
  )
}

function Hero({
  listing,
}: {
  listing: Listing | null,
}) {
  const site = listingSite(listing);
  return (
    <Section>
      <Center>
        <Link href="/"><a><Logo /></a></Link>
      </Center>

      <p className="text-xl font-brand font-medium mt-8 text-center">
        Split the cost of your {site ?? 'rental'} so that everyone is happy!
      </p>
    </Section>
  )
}

function HowItWorks() {
  return (
    <Section className="py-8 bg-slate-100 bg-[url('/images/bg_tile_gray.png')]">
      <Headline level={2}>How it works</Headline>
      <ol className="mt-4">
        <li className="flex mt-2">
          <span className="bg-cyan-100 text-cyan-800 text-sm font-semibold font-brand inline-flex items-center w-8 h-8 rounded-full justify-center mr-4 shrink-0">
            1.
          </span>
          <span className="mt-1">
            Each person will select their least preferred room and bid
            on how much more they are willing to pay for each of the other rooms.
          </span>
        </li>
        <li className="flex mt-2">
          <span className="bg-cyan-100 text-cyan-800 text-sm font-semibold font-brand inline-flex items-center w-8 h-8 rounded-full justify-center mr-4 shrink-0">
            2.
          </span>
          <span className="mt-1">
            Once every one has submitted bids, an algorithm will assign rooms and
            fairly divide the total cost.
          </span>
        </li>
      </ol>
      <div className="mt-8">
        <Center>
          <Link href="/example"><a className="text-cyan-500 hover:underline font-brand">See an example</a></Link>
        </Center>
      </div>
    </Section>
  );
}

function Listing({
  currency,
  listing,
  price,
}: {
  currency: string,
  listing: Listing | null,
  price: number,
}) {
  if (listing == null) {
    return null;
  }
  return (
    <Section className="w-full">
      <div className="border-b pb-8">
        <Headline level={2}>Where you&apos;re staying</Headline>
        <div className="mt-6">
          <ListingPreviewCard
            currency={currency}
            domain={listing.domain}
            image={listing.image}
            price={price}
            title={listing.title}
            url={listing.url}
          />
        </div>
      </div>
    </Section>
  )
}

function WelcomeBackSection({
  player,
  splitUid,
}: {
  player: Player,
  splitUid: string,
}) {
  const router = useRouter();
  const navigateToBid = () => {
    router.push(`/split/${splitUid}/bid`);
  };
  return (
    <Section className="container mx-auto">
      <Headline level={2}>Welcome back {player.name}</Headline>
      <p className="mt-4">Bid on rooms.</p>
      <div className="mt-10">
        <Center>
          <Button onClick={navigateToBid}>
            Go
          </Button>
        </Center>
      </div>
    </Section>
  )
}

function SelectPlayerSection({
  onClaimPlayer,
  players,
}: {
  onClaimPlayer: (id: number) => void,
  players: Player[],
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(-1);
  return (
    <Section className="container mx-auto">
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
                <span className="ml-2 text-xl font-brand">{name}</span>
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
    </Section>
  )
}