import { Listing, Player, PlayerRoomRent, Room } from "helpers/Types";
import React, { ReactElement } from "react";

const SplitContext = React.createContext({} as Split);
SplitContext.displayName = 'Split';

export const useSplitContext = () => React.useContext(SplitContext);

export type Split = {
  id: number,
  listing: Listing | null,
  pendingPlayers: Player[] | null,
  result: PlayerRoomRent[] | null,
  rooms: Room[],
  totalPrice: number,
  uid: string,
};

export const SplitContextProvider = ({
  children,
  split,
}: {
  children: ReactElement,
  split: Split,
}) => {
  return (
    <SplitContext.Provider value={split}>{children}</SplitContext.Provider>
  );
};