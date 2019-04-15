import { ADD_LIST, REMOVE_LIST } from "../constants/lists";

export type ListsState = { [listId: number]: IList };

export interface IList {
  id: number;
  name: string;
  tasks: [];
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

export type ListsAction = AddListAction | RemoveListAction;
