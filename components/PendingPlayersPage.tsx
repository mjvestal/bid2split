import Headline from "./Headline";
import { Player } from "helpers/Types";
import ShareSplitInput from "./ShareSplitInput";
import VerticalCenterLayout from "./VerticalCenterLayout";
import { useSplitContext } from "lib/useSplitContext";

export default function PendingPlayersPage({
  players,
}: {
  players: Player[],
}) {
  const split = useSplitContext();
  return (
    <VerticalCenterLayout>
      <section>
        <Headline>Just waiting on</Headline>
        <p className="mt-6">
          {
            players.map(player => {
              return <div key={player.id}>{player.name}</div>
            })
          }
        </p>
      </section>
      <div className="mt-2 w-full">
        <ShareSplitInput splitUid={split.uid} />
      </div>
    </VerticalCenterLayout>
  )
}