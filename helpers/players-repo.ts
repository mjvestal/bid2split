import fs from 'fs';
import { supabase } from './supabaseClient';

export type EntPlayer = {
 id: number,
 split_id: number,
 name: string,
 bids: number[] | null,
 rent: number | null,
 room: number | null,
}


/* READ */
export async function getPlayersBySplitId(splitId: number): Promise<EntPlayer[]> {
  const {data, error} = await supabase.from<EntPlayer>('players')
                                  .select('id,split_id,name,bids,rent,room')
                                  .eq('split_id', splitId);
  if (error != null) {
    throw Error(error.message);
  }
  return data;
}

/* CREATE */
export async function createPlayers(splitId: number, draftPlayers: Array<{name: string}>) {
  const players = draftPlayers.map(player => ({
    split_id: splitId,
    name: player.name,
  }));

  const {error} = await supabase.from<EntPlayer>('players').insert(players);
  if (error != null) {
    throw Error(error.message);
  }
}

/* UPDATE */
export async function updatePlayerBids(splitId: number, playerId: number, bids: number[]): Promise<EntPlayer | null> {
  const {data, error} = await supabase.from<EntPlayer>('players')
    .update({
      bids,
    })
    .eq('id', playerId)
    .eq('split_id', splitId);

  if (error != null) {
    throw Error(error.message);
  }

  return data[0];
}

export async function updatePlayerAssignment(splitId: number, playerId: number, roomId: number, rent: number): Promise<EntPlayer | null> {
  const {data, error} = await supabase.from<EntPlayer>('players')
    .update({
      rent,
      room: roomId,
    })
    .eq('id', playerId)
    .eq('split_id', splitId);

  if (error != null) {
    throw Error(error.message);
  }

  return data[0];
}
