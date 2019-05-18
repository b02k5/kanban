import {
  ADD_LIST,
  REMOVE_LIST,
  EDIT_NAME_LIST,
  CHANGE_POSITION_LIST
} from "../constants/lists";
import {
  AddTaskAction,
  MoveTaskAction,
  ChangePositionTasks
} from "../types/tasks";

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
    tasks: Array<number>;
  };
}

export interface EditListNameAction {
  type: EDIT_NAME_LIST;
  payload: {
    listId: number;
    listName: string;
  };
}

export interface ChangePositionList {
  type: CHANGE_POSITION_LIST;
  payload: ChangePositionListArgs;
}

export interface ChangePositionListArgs {
  boardId: number;
  listId: number;
  sourceIndex: number;
  destinationIndex: number;
}

export type ListsAction =
  | AddListAction
  | RemoveListAction
  | EditListNameAction
  | AddTaskAction
  | MoveTaskAction
  | ChangePositionTasks;
