import {
  AddListAction,
  RemoveListAction,
  EditListNameAction,
  ChangePositionList,
  ChangePositionListArgs
} from "../types/lists";
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
  tasks: Array<number>
): RemoveListAction => ({
  type: listConstants.REMOVE_LIST,
  payload: {
    boardId,
    listId,
    tasks
  }
});

export const editListName = (
  listId: number,
  listName: string
): EditListNameAction => ({
  type: listConstants.EDIT_NAME_LIST,
  payload: {
    listId,
    listName
  }
});

export const changePositionList = ({
  boardId,
  listId,
  sourceIndex,
  destinationIndex
}: ChangePositionListArgs): ChangePositionList => ({
  type: listConstants.CHANGE_POSITION_LIST,
  payload: {
    boardId,
    listId,
    sourceIndex,
    destinationIndex
  }
});
