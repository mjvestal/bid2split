import { Player, PlayerRoomRent } from "helpers/Types";

import React from "react";
import { Split } from "./useSplitContext";

const UPDATE_PENDING_PLAYERS = 'UPDATE_PENDING_PLAYERS';
const SET_RESULT = 'SET_RESULT';
const initialState = {
};

type UpdatePendingPlayersActionType = {
  type: 'UPDATE_PENDING_PLAYERS',
  players: Player[],
};

type SetResultActionType = {
  type: 'SET_RESULT',
  result: PlayerRoomRent[],
};

export type SplitActions = UpdatePendingPlayersActionType | SetResultActionType;

export const updatePendingPlayers = (players: Player[]) => ({
  type: UPDATE_PENDING_PLAYERS,
  players,
} as UpdatePendingPlayersActionType);

export const setResult = (result: PlayerRoomRent[]) => ({
  type: SET_RESULT,
  result,
}) as SetResultActionType;

export const splitReducer = (state: Split, action: SplitActions): Split => {
  switch (action.type) {
    case UPDATE_PENDING_PLAYERS:
      return {
        ...state,
        pendingPlayers: action.players,
      };
    case SET_RESULT:
      return {
        ...state,
        result: action.result,
      }
  }
};

export const SplitReducerContext = React.createContext((action: SplitActions) => {});
SplitReducerContext.displayName = 'SplitReducer';

export default function useSplitReducer() {
  return React.useContext(SplitReducerContext);
}