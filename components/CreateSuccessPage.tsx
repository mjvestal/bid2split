import { Listing } from "helpers/Types";

import Headline from "./Headline"
import ListingPreviewCard from "./ListingPreviewCard";
import ShareSplitInput from "./ShareSplitInput";
import VerticalCenterLayout from "./VerticalCenterLayout";
import SelectPlayerSection from "./SelectPlayerSection";

import nullthrows from "nullthrows";
import { useSplitContext } from "lib/useSplitContext";

export default function CreateSuccessPage({
  onClaimPlayer,
}: {
  onClaimPlayer: (id: number) => void,
}) {
  const split = useSplitContext();
  return (
    <VerticalCenterLayout>
      <Headline level={1}>Success!</Headline>
      <p className="mt-2">
        Send a link to your group so they can submit their bids.
      </p>
      <div className="mt-2 w-full">
        <ShareSplitInput splitUid={split.uid} />
      </div>
      
      <Listing listing={split.listing} price={split.totalPrice} />
      <SelectPlayerSection onClaimPlayer={onClaimPlayer} players={nullthrows(split.pendingPlayers)} />
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