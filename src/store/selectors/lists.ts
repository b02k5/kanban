import { AppState } from "..";
import find from "lodash/find";
import values from "lodash/values";
import { IList } from "../types/lists";

export const getLists = (state: AppState): IList[] => {
  const activeBoard = find(
    values(state.boards),
    board => board.isOpen === true
  );
  return activeBoard
    ? activeBoard.lists.map(listId => state.lists[listId])
    : [];
};
