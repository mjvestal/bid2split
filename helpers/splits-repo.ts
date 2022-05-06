import { nanoid } from 'nanoid/non-secure';
import { supabase } from './supabaseClient';

export type EntSplit = {
  id: number,
  currency: string,
  listing_domain: string | null,
  listing_image: string | null,
  listing_title: string | null,
  listing_url: string | null,
  rooms: number,
  total_price: number,
  short_code: string,
}

/* READ */
export async function getAllSplits(): Promise<EntSplit[]> {
  const { data, error } = await supabase.from<EntSplit>('splits')
          .select('id,currency,listing_domain,listing_image,listing_title,listing_url,rooms,total_price,short_code');
  if (error != null) {
    throw Error(error.message);
  }
  return data;
}

export async function getSplitByUid(uid: string): Promise<EntSplit | undefined> {
  const { data, error } = await supabase.from<EntSplit>('splits')
          .select('id,currency,listing_domain,listing_image,listing_title,listing_url,rooms,total_price,short_code')
          .eq('short_code', uid)
          .limit(1);
  if (error != null) {
    throw Error(error.message);
  }

  return data[0];
}

/* CREATE */
export async function createSplit({
  currency = "USD",
  listingDomain = null,
  listingImage = null,
  listingTitle = null,
  listingUrl = null,
  rooms,
  totalPrice,
}: {
  currency: string,
  listingDomain?: string | null,
  listingImage?: string | null,
  listingTitle?: string | null,
  listingUrl?: string | null,
  rooms: number,
  totalPrice: number
}): Promise<EntSplit> {
  // generate
  const {data, error} = await supabase.from<EntSplit>('splits').insert([{
    currency,
    listing_domain: listingDomain,
    listing_image: listingImage,
    listing_title: listingTitle,
    listing_url: listingUrl,
    rooms,
    total_price: totalPrice,
    short_code: nanoid(11),
  }]);

  if (error != null) {
    throw Error(error.message);
  }

  return data[0];
}

/* DELETE */
export async function deleteSplit(id: number) {
  const { data, error } = await supabase.from<EntSplit>('splits')
          .delete()
          .eq('id', id);
  if (error != null) {
    throw Error(error.message);
  };
}
