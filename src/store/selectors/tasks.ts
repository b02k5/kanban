import { AppState } from "../index";
import values from "lodash/values";
import find from "lodash/find";

export const getTasks = (state: AppState): any => {
  const activeBoard = find(
    values(state.boards),
    board => board.isOpen === true
  );
};
