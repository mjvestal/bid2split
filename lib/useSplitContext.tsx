import { Listing, Player, PlayerRoomRent, Room } from "helpers/Types";
import React, { ReactElement } from "react";
import { SplitReducerContext, splitReducer } from "./useSplitReducer";

const SplitContext = React.createContext({} as Split);
SplitContext.displayName = 'Split';

export const useSplitContext = () => React.useContext(SplitContext);


export type Split = {
  id: number,
  currency: string,
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
  const [globalState, dispatch] = React.useReducer(splitReducer, split);
  return (
    <SplitContext.Provider value={globalState}>
      <SplitReducerContext.Provider value={dispatch}>
        {children}
      </SplitReducerContext.Provider>
    </SplitContext.Provider>
  );
};