import { NextApiRequest, NextApiResponse } from 'next'

import { areBidsValid } from 'helpers/Validators';
import createPlayerBid from 'helpers/createPlayerBid';
import {retrieveUnsolvedSplit} from 'helpers/retrieveSplit';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'PUT') {
    response.status(405).send({ message: 'Only PUT requests allowed' });
    return;
  }
  const {
    splitId,
    playerId,
    bids,
  } = request.body;
  const splitData = retrieveUnsolvedSplit(splitId);
  const players = splitData.players;

  // Make sure this player hasn't already submitted bids
  const existingBids = players.find(p => p.id === playerId);
  if (existingBids != null && Array.isArray(existingBids) && existingBids.length === splitData.rooms.length) {
    response.status(500).send({ message: 'Cannot change bids' });
    return;
  }

  // Make sure bids is valid
  if (!areBidsValid(bids, splitData.rooms.length)) {
    response.status(500).send({ message: 'Invalid bids' });
    return;
  }

  const result = createPlayerBid(splitData, playerId, bids);
  response.status(200).json({
    result,
  });
}