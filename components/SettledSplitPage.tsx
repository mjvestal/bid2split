import Headline from "./Headline";
import { PlayerRoomRent } from "helpers/Types";
import VerticalCenterLayout from "./VerticalCenterLayout";
import formatPrice from "lib/formatPrice";
import { useSplitContext } from "lib/useSplitContext";

export default function SettledSplitPage({result}: {
  result: PlayerRoomRent[],
}) {
  const split = useSplitContext();
  return (
    <VerticalCenterLayout>
      <Headline>You&apos;re done!</Headline>
      <div className="text-center">
        {
          result.map((assignment, index) => <Assignment currency={split.currency} assignment={assignment} key={index} />)
        }
      </div>
    </VerticalCenterLayout>
  )
}

function Assignment({
  assignment,
  currency,
}: {
  assignment: PlayerRoomRent,
  currency: string,
}) {
  const playerName = assignment.player.name;
  const rent = assignment.rent;
  const room = assignment.room.name;
  const formattedRent = formatPrice(rent, currency);
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