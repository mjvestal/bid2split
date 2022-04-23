import type {GetServerSideProps, GetServerSidePropsContext} from 'next'
import { Listing, MutatedSplit, Player, PlayerRoomRent, Room } from 'helpers/Types';

import NotPlayersTurnPage from '../../components/NotPlayersTurnPage';
import PendingPlayersPage from '../../components/PendingPlayersPage';
import PlayersTurnPage from '../../components/PlayersTurnPage';
import SettledSplitPage from '../../components/SettledSplitPage';
import nullthrows from 'nullthrows';
import retrieveSplit from 'helpers/retrieveSplit';
import usePlayer from '../../components/hooks/usePlayer';
import {useState} from 'react';

type Props = {
  splitId: number,
  listing: Listing | null,
  pendingPlayers: Player[] | null,
  result: PlayerRoomRent[] | null,
  rooms: Room[],
  totalPrice: number,
}

export default function SplitId({
  splitId,
  listing,
  pendingPlayers,
  result,
  rooms,
  totalPrice,
}: Props) {
  const [playerId, setPlayerId] = usePlayer();
  const [players, settledSplit, submitBids] = useSplitState(splitId, pendingPlayers, result);
  const handleSubmit = (bids: number[]) => {
    submitBids(nullthrows(playerId), bids);
  }

  if (settledSplit != null) {
    return <SettledSplitPage result={settledSplit} />;
  }

  if (players == null) {
    throw Error("No pending players and no result");
  }

  if (playerId === null) {
    // Don't know who this is, have them select one of the players
    return (
      <NotPlayersTurnPage 
        listing={listing}
        onClaimPlayer={setPlayerId} 
        players={players}
        price={totalPrice}
      />
    ); 
  }

  const player = players.find(value => value.id === playerId);
  if (player == null) {
    return <PendingPlayersPage players={players} />;
  }
  return (
    <PlayersTurnPage
      onSubmit={handleSubmit}
      player={player}
      rooms={rooms}
      totalPrice={totalPrice}
    />
  );
}

function getFormattedPageModel(splitId: number): Props {
  const splitData = retrieveSplit(splitId);
  return {
    splitId: splitData.id,
    listing: splitData.listing,
    pendingPlayers: splitData.pendingPlayers || null,
    result: splitData.result || null,
    rooms: splitData.rooms,
    totalPrice: splitData.totalPrice,
  };
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const gameIdString = context.params?.id;
  if (gameIdString == null) {
    // TODO redirect
    throw Error('Game not found');
  }
  if (Array.isArray(gameIdString)) {
    throw Error('Unexpected input');
  }
  const gameId = parseInt(gameIdString);
  return {
    props: getFormattedPageModel(gameId),
  }
}

function useSplitState(
  splitId: number,
  pendingPlayers: Player[] | null,
  result: PlayerRoomRent[] | null,
): [Player[] | null, PlayerRoomRent[] | null, (playerId: number, bids: number[]) => void] {
  const [players, setPendingPlayers] = useState<Player[] | null>(pendingPlayers);
  const [settledSplit, setSettledSplit] = useState<PlayerRoomRent[] | null>(result);

  const submitBids = async (playerId: number, bids: number[]) => {
    const response = await fetch('/api/bids', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        splitId: splitId,
        bids,
        playerId,
      }),
    });
    const responseObj = await response.json();
    const result: MutatedSplit = responseObj.result;
    console.log(result);
    if (result.pendingPlayers) {
      setPendingPlayers(result.pendingPlayers);
      return;
    }
    if (result.result) {
      setSettledSplit(result.result);
      return;
    }
  };

  return [players, settledSplit, submitBids];
}