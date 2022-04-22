import Headline from "./Headline";
import { PlayerRoomRent } from "helpers/Types";
import VerticalCenterLayout from "./VerticalCenterLayout";

export default function SettledSplitPage({result}: {
  result: PlayerRoomRent[],
}) {
  return (
    <VerticalCenterLayout>
      <Headline>You&apos;re done!</Headline>
      <div className="text-center">
        {
          result.map((assignment, index) => <Assignment assignment={assignment} key={index} />)
        }
      </div>
    </VerticalCenterLayout>
  )
}

function Assignment({assignment}: {
  assignment: PlayerRoomRent,
}) {
  const playerName = assignment.player.name;
  const rent = assignment.rent;
  const room = assignment.room.name;
  const formattedRent = `$${rent}`;
  return (
    <div className="mt-8">
      <div className="text-4xl font-hand">{playerName}</div>
      <div className="mt-4 text-lg">
        pays{' '}
        <span className="font-bold">{formattedRent}</span>
        {' '}for{' '}
        <span className="font-bold">{room}</span>
      </div>
    </div>
  )
}