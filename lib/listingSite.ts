import { Listing } from "helpers/Types";

export type ListingSite = "Airbnb" | "Vrbo";

export function listingSiteFromDomain(domain: string): ListingSite | null {
  if (domain.indexOf('airbnb.com') > -1 || domain.indexOf('abnb.me') > -1) {
    return "Airbnb";
  }
  if (domain.indexOf('vrbo.com') > 0) {
    return "Vrbo";
  }

  return null;
}

export default function listingSite(listing: Listing | null): ListingSite | null {
  return listing == null ? null : listingSiteFromDomain(listing.domain);
}