import {
  ADD_TASK,
  REMOVE_TASK,
  EDIT_TASK_NAME,
  EDIT_TASK_DESCRIPTION
} from "../constants/tasks";
import { RemoveListAction } from "./lists";

export type TasksState = { [taskId: number]: TaskType };

export type TaskArguments = {
  listId: number;
  id: number;
  name: string;
  description: string;
};

export type AddTaskArguments = {
  listId: number;
  name: string;
  description: string;
};

export interface TaskType {
  id: number;
  name: string;
  description: string;
  date: string;
}

export interface AddTaskAction {
  type: ADD_TASK;
  payload: {
    listId: number;
    id: number;
    name: string;
    description: string;
  };
}

export interface RemoveTaskAction {
  type: REMOVE_TASK;
  payload: {
    listId: number;
    taskId: number;
  };
}

export interface EditTaskNameAction {
  type: EDIT_TASK_NAME;
  payload: {
    id: number;
    name: string;
  };
}

export interface EditTaskDescriptionAction {
  type: EDIT_TASK_DESCRIPTION;
  payload: {
    id: number;
    description: string;
  };
}

export type TaskAction =
  | AddTaskAction
  | RemoveListAction
  | EditTaskNameAction
  | EditTaskDescriptionAction;
