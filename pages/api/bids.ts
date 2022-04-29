import { NextApiRequest, NextApiResponse } from 'next'

import { areBidsValid } from 'helpers/Validators';
import createPlayerBid from 'helpers/createPlayerBid';
import {retrieveUnsolvedSplit} from 'helpers/retrieveSplit';
import { sessionOptions } from "lib/session";
import { withIronSessionApiRoute } from "iron-session/next";

async function bidRoute(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'PUT') {
    response.status(405).send({ message: 'Only PUT requests allowed' });
    return;
  }
  const user = request.session.user;
  if (user == null || user.playerId < 0) {
    response.status(401).send({ message: 'Unauthorized' });
    return;
  }

  const {
    splitUid,
    bids,
  } = request.body;

  if (user.splitUid !== splitUid) {
    response.status(401).send({ message: 'Unauthorized' });
    return;
  }

  const playerId = user.playerId;

  const splitData = retrieveUnsolvedSplit(splitUid);
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

export default withIronSessionApiRoute(bidRoute, sessionOptions);