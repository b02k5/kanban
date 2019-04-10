import { Reducer } from "redux";
import { boardConstants } from "../constants/boards";
import { BoardAction, BoardsState } from "../types/boards";

export const boards: Reducer<BoardsState, BoardAction> = (
  state = {},
  action
) => {
  switch (action.type) {
    case boardConstants.ADD_BOARD: {
      const { boardId, boardName } = action.payload;
      return {
        ...state,
        [boardId]: {
          id: boardId,
          name: boardName,
          isOpen: false,
          lists: []
        }
      };
    }
    case boardConstants.ACTIVE_BOARD: {
      Object.keys(state).map(board => {
        state[board].id === action.payload
          ? (state[board].isOpen = true)
          : (state[board].isOpen = false);
      });
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload]
        }
      };
    }
    default:
      return {
        ...state
      };
  }
};
