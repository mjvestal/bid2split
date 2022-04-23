import { NextApiRequest, NextApiResponse } from 'next'

import createGame from 'helpers/createSplit';
import scrapePreview from 'lib/scrapePreview';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'PUT') {
    response.status(405).send({ message: 'Only PUT requests allowed' });
    return;
  }
  const {
    listingUrl,
    players,
    rooms,
    totalPrice
  } = request.body;

  const listing = listingUrl != null ? await scrapePreview(listingUrl) : null;

  const gameId = createGame({
    listing: listing || undefined,
    players: players.map((player: string) => ({ name: player.trim()})),
    rooms: rooms.map((room: string) => ({name: room.trim()})),
    totalPrice,
  });

  response.status(200).json({
    gameId,
  });
}