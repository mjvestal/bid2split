import { NextApiRequest, NextApiResponse } from 'next'

import createGame from 'helpers/createSplit';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'PUT') {
    response.status(405).send({ message: 'Only PUT requests allowed' });
    return;
  }
  const {
    players,
    rooms,
    totalPrice
  } = request.body;
  const gameId = createGame({
    players: players.map((player: string) => ({ name: player})),
    rooms: rooms.map((room: string) => ({name: room})),
    totalPrice,
  });

  response.status(200).json({
    gameId,
  });
}