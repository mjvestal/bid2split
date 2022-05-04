import { NextApiRequest, NextApiResponse } from 'next'

import createSplit from 'helpers/createSplit';
import scrapePreview from 'lib/scrapePreview';
import { sessionOptions } from "lib/session";
import { withIronSessionApiRoute } from "iron-session/next";

async function createSplitRoute(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'PUT') {
    response.status(405).send({ message: 'Only PUT requests allowed' });
    return;
  }
  const {
    currency,
    listingUrl,
    players,
    rooms,
    totalPrice
  } = request.body;

  const listing = listingUrl != null ? await scrapePreview(listingUrl) : null;

  const splitId = await createSplit({
    currency,
    listing: listing || undefined,
    players: players.map((player: string) => ({ name: player.trim()})),
    rooms: rooms.map((room: string) => ({name: room.trim()})),
    totalPrice,
  });

  // If the user is cookied for a different split, destroy
  // that session so they have to re-pick which player they are
  request.session.destroy();

  response.status(200).json({
    splitId,
  });
}

export default withIronSessionApiRoute(createSplitRoute, sessionOptions);