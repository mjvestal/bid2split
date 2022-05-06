import {listingSiteFromDomain} from "lib/listingSite"

export default function ListingDomain({
  domain
}: {
  domain: string,
}) {
  const site = listingSiteFromDomain(domain);
  switch (site) {
    case 'Airbnb':
      return (
        <div className="uppercase tracking-wide text-xs text-airbnb font-semibold">{domain}</div>
      );
    case 'Vrbo':
      return (
        <div className="uppercase tracking-wide text-xs text-vrbo font-semibold">{domain}</div>
      )
    default:
      return (
        <div className="uppercase tracking-wide text-xs text-cyan-500 font-semibold">{domain}</div>
      )
  }
}