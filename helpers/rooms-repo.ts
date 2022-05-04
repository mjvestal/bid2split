import fs from 'fs'
import { supabase } from './supabaseClient';

export type EntRoom = {
  id: number,
  name: string,
  split_id: number,
}

/* READ */
export async function getRoomsBySplitId(splitId: number): Promise<EntRoom[]> {
  const {data, error} = await supabase.from<EntRoom>('rooms')
                                  .select('id,name,split_id')
                                  .eq('split_id', splitId);
  if (error != null) {
    throw Error(error.message);
  }
  return data;
}

/* CREATE */
export async function createRooms(splitId: number, draftRooms: Array<{name: string}>) {
  const rooms = draftRooms.map(room => ({
    name: room.name,
    split_id: splitId,
  }));

  const {error} = await supabase.from<EntRoom>('rooms').insert(rooms);
  if (error != null) {
    throw Error(error.message);
  }
}
