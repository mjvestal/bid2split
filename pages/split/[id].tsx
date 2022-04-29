import { Split, SplitContextProvider, useSplitContext } from 'lib/useSplitContext';

import type {GetServerSidePropsContext} from 'next'
import PendingPlayersPage from '@/components/PendingPlayersPage';
import SettledSplitPage from '@/components/SettledSplitPage';
import SplitLandingPage from '@/components/SplitLandingPage';
import { User } from '../api/user';
import retrieveSplit from 'helpers/retrieveSplit';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from "iron-session/next";

type Props = {
  isSuccess: boolean,
  split: Split,
  user: User | null,
}

export default function SplitId({
  isSuccess,
  split,
  user,
}: Props) {
  return (
    <SplitContextProvider split={split}>
      <Content isSuccess={isSuccess} user={user} />
    </SplitContextProvider>
  )
}

function Content({
  isSuccess,
  user,
}: {
  isSuccess: boolean,
  user: User | null
}) {
  const router = useRouter();
  const split = useSplitContext();

  const {
    pendingPlayers,
    result,
    uid: splitUid,
  } = split;
  
  const setPlayerId = async (playerId: number) => {
    const body = {
      username: playerId,
    };
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    router.push(`/split/${splitUid}/bid`)
  };

  if (result != null) {
    return <SettledSplitPage result={result} />;
  }

  if (pendingPlayers == null) {
    throw Error("No pending players and no result");
  }

  const player = user != null ? pendingPlayers.find(value => value.id === parseInt(user.login)) ?? null : null; // TODO
  if (user != null && player == null) {
    // Player has submitted bid, so show them who hasn't
    return <PendingPlayersPage players={pendingPlayers} />;
  }

  return <SplitLandingPage isSuccess={isSuccess} onClaimPlayer={setPlayerId} player={player} />
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
    const user = context.req.session.user ?? null;
    const splitUid = context.params?.id;
    if (splitUid == null) {
      // TODO redirect
      throw Error('Split not found');
    }
    if (Array.isArray(splitUid)) {
      throw Error('Unexpected input');
    }
    const isSuccess = context.query?.success != null;
    const props: Props = {
      isSuccess,
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
