import { useState } from "react";

export default function usePlayer(): [number | null, (playerId: number) => void] {
  const [player, setPlayer] = useState(-1);

  return [player > -1 ? player : null, (playerId: number) => setPlayer(playerId)];
}