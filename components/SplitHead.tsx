import Head from "next/head";
import { Split } from "lib/useSplitContext";
import listingSite from "lib/listingSite";

export default function SplitHead({
  split,
}: {
  split: Split
}) {
  const image = split.listing == null || split.listing.image == null ? "/images/logo_on_blue.png" : split.listing.image;
  const title = split.listing == null ? "bid2split | Fairly split the cost of your next vacation rental" : `bid2split | Split the cost of your ${listingSite(split.listing) ?? 'vacation rental'}`
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:image" content={image} />
    </Head>
  );
}