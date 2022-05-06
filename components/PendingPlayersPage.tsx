import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Headline from "./Headline";
import { Player } from "helpers/Types";
import ShareSplitInput from "./ShareSplitInput";
import VerticalCenterLayout from "./VerticalCenterLayout";
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { useSplitContext } from "lib/useSplitContext";

export default function PendingPlayersPage({
  players,
}: {
  players: Player[],
}) {
  const split = useSplitContext();

  return (
    <VerticalCenterLayout>
      <div className="flex flex-col items-center">
        <section>
          <div className="text-center">
            <FontAwesomeIcon icon={faCircleCheck} size="6x" className="text-salmon-700 mb-2" />
            <Headline>Bid Submitted</Headline>
          </div>
          <p className="mt-6">
            Check back later to see which room you got!
          </p>
        </section>
        <section className="mt-8 border-t pt-8 w-full md:max-w-lg">
          <Headline level={2}>While you wait...</Headline>
          <p className="mt-6">Send a link to {players.map(player => player.name).join(', ')}</p>
          <div className="mt-4">
            <ShareSplitInput splitUid={split.uid} />
          </div>
        </section>
      </div>
    </VerticalCenterLayout>
  )
}