import {listingSiteFromDomain} from "lib/listingSite"

export default function ListingDomain({
  domain
}: {
  domain: string,
}) {
  const site = listingSiteFromDomain(domain);
  if (site === 'Airbnb') {
    return (
      <div className="uppercase tracking-wide text-xs text-pink-700 font-semibold">{domain}</div>
    )
  }
  if (site === 'Vrbo') {
    return (
      <div className="uppercase tracking-wide text-xs text-blue-700 font-semibold">{domain}</div>
    )
  }

  return (
    <div className="uppercase tracking-wide text-xs text-emerald-700 font-semibold">{domain}</div>
  )
}