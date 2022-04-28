import Button from "./Button";
import Center from "./Center";
import Headline from "./Headline";
import { Player } from "helpers/Types";
import { useRouter } from "next/router";

export default function WelcomeBackSection({
  player,
  splitUid,
}: {
  player: Player,
  splitUid: string,
}) {
  const router = useRouter();
  const navigateToBid = () => {
    router.push(`/split/${splitUid}/bid`);
  };
  return (
    <section className="mt-8 border-t pt-8 container mx-auto">
      <Headline level={2}>Welcome back {player.name}</Headline>
      <p className="mt-4">Bid on rooms.</p>
      <div className="mt-10">
        <Center>
          <Button onClick={navigateToBid}>
            Go
          </Button>
        </Center>
      </div>
    </section>
  )
}