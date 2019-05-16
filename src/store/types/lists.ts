import {
  ADD_LIST,
  REMOVE_LIST,
  EDIT_NAME_LIST,
  CHANGE_POSITION_TASKS
} from "../constants/lists";
import { AddTaskAction, RemoveTaskAction } from "../types/tasks";

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

export interface ChangePositionTasks {
  type: CHANGE_POSITION_TASKS;
  payload: ChangePositionTasksArgs;
}

export interface ChangePositionTasksArgs {
  listId: number;
  taskId: number;
  sourceIndex: number;
  destinationIndex: number;
}

export type ListsAction =
  | AddListAction
  | RemoveListAction
  | EditListNameAction
  | AddTaskAction
  | RemoveTaskAction
  | ChangePositionTasks;
