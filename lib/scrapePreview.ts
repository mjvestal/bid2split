import {decode} from 'html-entities';
import urlRegexSafe from 'url-regex-safe';

const urlRegEx = urlRegexSafe({exact: true, strict: true});

function isValidUrl(url: string): boolean {
  return urlRegEx.test(url);
}

const KEY = process.env.LINK_PREVIEW_KEY;

type LinkPreviewResponse = {
  title: string,
  description: string,
  image: string,
  url: string,
};

export type LinkPreview = LinkPreviewResponse & {
  host: string,
}

export default async function scrapePreview(rawUrl: string): Promise<LinkPreview | null> {
  if (!isValidUrl(rawUrl)) {
    return null;
  }
  
  const url = new URL(rawUrl);
  const host = url.host
  const urlWithoutSearch = `${url.origin}${url.pathname}`;
  const linkPreviewUrl = `https://api.linkpreview.net/?key=${KEY}&q=${urlWithoutSearch}`;
  const listingResponse = await fetch(linkPreviewUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json: LinkPreviewResponse = await listingResponse.json();
  return {
    ...json,
    title: decode(json.title),
    host,
  };
}