import { AddListAction, RemoveListAction, EditListNameAction } from "../types/lists";
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

export const removeList = (
  boardId: number,
  listId: number,
): RemoveListAction => ({
  type: listConstants.REMOVE_LIST,
  payload: {
    boardId,
    listId,
  }
});

export const editListName = (listId: number, listName: string): EditListNameAction => ({
  type: listConstants.EDIT_NAME_LIST,
  payload: {
    listId,
    listName
  }
})
