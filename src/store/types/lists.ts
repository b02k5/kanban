import { ADD_LIST, REMOVE_LIST, EDIT_NAME_LIST } from "../constants/lists";
import { AddTaskAction } from "../types/tasks";

export type ListsState = { [listId: number]: IList };

export interface IList {
  id: number;
  name: string;
  tasks: Array<number>;
}

export interface AddListAction {
  type: ADD_LIST;
  payload: {
    boardId: number;
    listId: number;
    listName: string;
  };
}

export interface RemoveListAction {
  type: REMOVE_LIST;
  payload: {
    boardId: number;
    listId: number;
  };
}

export interface EditListNameAction {
  type: EDIT_NAME_LIST;
  payload: {
    listId: number;
    listName: string;
  };
}

export type ListsAction =
  | AddListAction
  | RemoveListAction
  | EditListNameAction
  | AddTaskAction;
