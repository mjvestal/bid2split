import type {GetServerSideProps, GetServerSidePropsContext} from 'next'
import { Listing, MutatedSplit, Player, PlayerRoomRent, Room } from 'helpers/Types';

import CreateSuccessPage from '@/components/CreateSuccessPage';
import NotPlayersTurnPage from '../../components/NotPlayersTurnPage';
import PendingPlayersPage from '../../components/PendingPlayersPage';
import PlayersTurnPage from '../../components/PlayersTurnPage';
import SettledSplitPage from '../../components/SettledSplitPage';
import nullthrows from 'nullthrows';
import retrieveSplit from 'helpers/retrieveSplit';
import usePlayer from '../../components/hooks/usePlayer';
import {useState} from 'react';

type Props = {
  isSuccess: boolean,
  splitId: number,
  splitUid: string,
  listing: Listing | null,
  pendingPlayers: Player[] | null,
  result: PlayerRoomRent[] | null,
  rooms: Room[],
  totalPrice: number,
}

export default function SplitId({
  isSuccess,
  splitId,
  splitUid,
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
    if (isSuccess) {
      return (
        <CreateSuccessPage
          listing={listing}
          onClaimPlayer={setPlayerId} 
          players={players}
          price={totalPrice}
          splitUid={splitUid}
        />
      )
    }
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
      listing={listing}
      onSubmit={handleSubmit}
      player={player}
      rooms={rooms}
      totalPrice={totalPrice}
    />
  );
}

function getFormattedPageModel(splitUid: string) {
  const splitData = retrieveSplit(splitUid);
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
  const splitUid = context.params?.id;
  if (splitUid == null) {
    // TODO redirect
    throw Error('Split not found');
  }
  if (Array.isArray(splitUid)) {
    throw Error('Unexpected input');
  }
  const isSuccess = context.query?.success != null;
  return {
    props: {
      ...getFormattedPageModel(splitUid),
      isSuccess,
      splitUid,
    },
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