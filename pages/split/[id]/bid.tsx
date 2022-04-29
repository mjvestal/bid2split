import { MutatedSplit, Player, PlayerRoomRent } from 'helpers/Types';
import { Split, SplitContextProvider, useSplitContext } from 'lib/useSplitContext';
import useSplitReducer, { setResult, updatePendingPlayers } from "lib/useSplitReducer";

import type {GetServerSidePropsContext} from 'next'
import PendingPlayersPage from '@/components/PendingPlayersPage';
import PlayersTurnPage from '@/components/PlayersTurnPage';
import SettledSplitPage from '@/components/SettledSplitPage';
import { User } from '../../api/user';
import retrieveSplit from 'helpers/retrieveSplit';
import {useState} from 'react';
import { withIronSessionSsr } from "iron-session/next";

type Props = {
  split: Split,
  user: User,
}

export default function Bid({
  split,
  user,
}: Props) {
  return (
    <SplitContextProvider split={split}>
      <Content user={user} />
    </SplitContextProvider>
  )
}

function Content({
  user,
}: {
  user: User,
}) {
  const dispatch = useSplitReducer();
  const split = useSplitContext();

  const {
    pendingPlayers,
    result,
    uid: splitUid,
  } = split;

  if (result != null) {
    return <SettledSplitPage result={result} />;
  }

  if (pendingPlayers == null) {
    throw Error("No pending players and no result");
  }

  const player = pendingPlayers.find(value => value.id === parseInt(user.login)) ?? null; // TODO
  if (player == null) {
    // Player has submitted bid, so show them who hasn't
    return <PendingPlayersPage players={pendingPlayers} />;
  }

  const handleSubmit = async (bids: number[]) => {
    const response = await fetch('/api/bids', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        splitUid,
        bids,
      }),
    });
    const responseObj = await response.json();
    const result: MutatedSplit = responseObj.result;
    if (result.pendingPlayers) {
      dispatch(updatePendingPlayers(result.pendingPlayers));
      return;
    }
    if (result.result) {
      dispatch(setResult(result.result));
      return;
    }
  };

  return <PlayersTurnPage onSubmit={handleSubmit} player={player} />
}

function getFormattedSplit(splitUid: string): Split {
  const splitData = retrieveSplit(splitUid);
  return {
    ...splitData,
    pendingPlayers: splitData.pendingPlayers || null,
    result: splitData.result || null,
  };
}

export const getServerSideProps = withIronSessionSsr(
  async function (context: GetServerSidePropsContext) {
    const {
      req,
      res,
    } = context;  
    const splitUid = context.params?.id;
    if (splitUid == null) {
      // TODO redirect
      throw Error('Split not found');
    }
    if (Array.isArray(splitUid)) {
      throw Error('Unexpected input');
    }
    const user = req.session.user;
    if (user === undefined) {
      res.setHeader("location", `/split/${splitUid}`);
      res.statusCode = 302;
      res.end();
      return {
        props: {
          user: { isLoggedIn: false, login: ""} as User,
        },
      };
    }
    const props: Props = {
      split: getFormattedSplit(splitUid),
      user,
    };
    return {
      props,
    };
  },
  {
    cookieName: "fairsplit_user_id",
    password: "n'CVyVf{>_DMatkMq5jF_3^L<+YM<]DaZD&6~45",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);
