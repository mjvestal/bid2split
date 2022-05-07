import { Split, SplitContextProvider, useSplitContext } from 'lib/useSplitContext';

import type { GetServerSidePropsContext } from 'next';
import PendingPlayersPage from '@/components/PendingPlayersPage';
import SettledSplitPage from '@/components/SettledSplitPage';
import SplitHead from '@/components/SplitHead';
import SplitLandingPage from '@/components/SplitLandingPage';
import { SplitType } from 'helpers/Types';
import { User } from '../api/user';
import nullthrows from 'nullthrows';
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
    <>
      <SplitHead split={split} />
      <SplitContextProvider split={split}>
        <Content isSuccess={isSuccess} user={user} />
      </SplitContextProvider>
    </>
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
      playerId: playerId,
      splitUid,
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

  const player = user != null ? pendingPlayers.find(value => value.id === user.playerId) ?? null : null;
  if (user != null && player == null) {
    // Player has submitted bid, so show them who hasn't
    return <PendingPlayersPage players={pendingPlayers} />;
  }

  return <SplitLandingPage isSuccess={isSuccess} onClaimPlayer={setPlayerId} player={player} />
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
      params,
      req,
      res,
    } = context;
    const splitUid = params?.id;
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
    const props: Props = {
      isSuccess: context.query?.success != null,
      split: getFormattedSplit(split),
      user,
    };
    return {
      props,
    };
  },
  {
    cookieName: "fairsplit_user_id",
    password: nullthrows(process.env.SECRET_COOKIE_PASSWORD),
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);
