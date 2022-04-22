import Headline from "./Headline";
import { Player } from "helpers/Types";
import VerticalCenterLayout from "./VerticalCenterLayout";

export default function PendingPlayersPage({
  players,
}: {
  players: Player[],
}) {
  return (
    <VerticalCenterLayout>
      <Headline>Just waiting on</Headline>
      <>
        {
          players.map(player => {
            return <div key={player.id}>{player.name}</div>
          })
        }
      </>
    </VerticalCenterLayout>
  )
}