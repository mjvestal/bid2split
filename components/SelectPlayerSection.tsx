import Button from "./Button";
import Center from "./Center";
import Headline from "./Headline"
import type { Player } from "helpers/Types"
import { useState } from "react";

export default function SelectPlayerSection({
  onClaimPlayer,
  players,
}: {
  onClaimPlayer: (id: number) => void,
  players: Player[],
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(-1);
  return (
    <section className="mt-8 border-t pt-8 container mx-auto">
      <Headline level={2}>Get started</Headline>
      <p className="mt-4">Who are you submitting a bid for?</p>
      <div className="self-start">
      {
        players.map(({id, name}) => {
          return (
            <div key={id}>
              <label className="mt-2 inline-flex items-center">
                <input 
                  checked={id === selectedPlayer}
                  name="price_option"
                  onChange={(event) => {setSelectedPlayer(parseInt(event.currentTarget.value))}}
                  type="radio"
                  value={id}
                />
                <span className="ml-2 text-xl">{name}</span>
              </label>
            </div>
          )
        })
      }
      </div>
      <div className="mt-10">
        <Center>
          <Button
            disabled={selectedPlayer < 0} 
            onClick={() => { onClaimPlayer(selectedPlayer)}}>
            Go
          </Button>
        </Center>
      </div>
    </section>
  )
}