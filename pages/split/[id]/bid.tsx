import { MutatedSplit, Player, PlayerRoomRent, SplitType } from 'helpers/Types';
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
  const split = useSplitContext();

  const {
    pendingPlayers,
    result,
  } = split;

  if (result != null) {
    return <SettledSplitPage result={result} />;
  }

  if (pendingPlayers == null) {
    throw Error("No pending players and no result");
  }

  const player = pendingPlayers.find(value => value.id === user.playerId) ?? null;
  if (player == null) {
    // Player has submitted bid, so show them who hasn't
    return <PendingPlayersPage players={pendingPlayers} />;
  }

  return <PlayersTurnPage player={player} />
}

function getFormattedSplit(splitData: SplitType): Split {
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
    if (splitUid == null || Array.isArray(splitUid)) {
      return {
        notFound: true,
      }
    }
    const split = await retrieveSplit(splitUid);
    if (split == null) {
      return {
        notFound: true,
      }
    }

    let user = req.session.user ?? null;
    if (user != null && user.splitUid !== splitUid) {
      req.session.destroy();
      user = null;
    }
    if (user == null) {
      res.setHeader("location", `/split/${splitUid}`);
      res.statusCode = 302;
      res.end();
      return {
        props: {
          user: {
            isLoggedIn: false,
            playerId: -1,
            splitUid: "",
          } as User,
        },
      };
    }

    const props: Props = {
      split: getFormattedSplit(split),
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
