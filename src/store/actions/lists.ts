import { AddListAction } from "../types/lists";
import { listConstants } from "../constants/lists";

export const addList = (
  boardId: number,
  listId: number,
  listName: string
): AddListAction => ({
  type: listConstants.ADD_LIST,
  payload: {
    boardId,
    listId,
    listName
  }
});
