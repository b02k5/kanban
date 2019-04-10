import { BoardsState, BoardType } from "../types/boards";
import { AppState } from "..";
import find from "lodash/find";
import values from "lodash/values";

export const getBoards = (state: AppState): BoardsState => state.boards;

export const getActiveBoard = (state: BoardsState): BoardType | undefined =>
  find(values(state), board => {
    return board.isOpen === true;
  });
