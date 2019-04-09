import { Reducer } from "redux";
import { boardConstants } from "../constants/boards";
import { BoardAction, BoardsState } from "../types/boards";

export const boards: Reducer<BoardsState, BoardAction> = (
  state = {},
  action
) => {
  switch (action.type) {
    case boardConstants.ADD_BOARD:
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
    default:
      return {
        ...state
      };
  }
};
