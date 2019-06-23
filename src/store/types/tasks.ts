import {
  ADD_TASK,
  MOVE_TASK,
  EDIT_TASK_NAME,
  EDIT_TASK_DESCRIPTION,
  CHANGE_POSITION_TASK,
  REMOVE_TASKS
} from "../constants/tasks";
import { RemoveListAction } from "./lists";
import { Category } from "./categories";

export type TasksState = { [taskId: number]: TaskType };

export type TaskArguments = {
  listId: number;
  id: number;
  name: string;
  description: string;
  category: Category;
};

export type AddTaskArguments = {
  listId: number;
  name: string;
  description: string;
  category: Category;
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
    category: Category;
  };
}

export interface MoveTaskAction {
  type: MOVE_TASK;
  payload: MoveTaskActionArgs;
}

export type MoveTaskActionArgs = {
  sourceListId: number;
  taskId: number;
  targetListId: number;
  destinationIndex: number;
};

export interface EditTaskNameAction {
  type: EDIT_TASK_NAME;
  payload: {
    name: string;
    id: number;
  };
}

export interface EditTaskDescriptionAction {
  type: EDIT_TASK_DESCRIPTION;
  payload: {
    id: number;
    description: string;
  };
}

export interface ChangePositionTasks {
  type: CHANGE_POSITION_TASK;
  payload: ChangePositionTaskArgs;
}

export interface ChangePositionTaskArgs {
  listId: number;
  taskId: number;
  sourceIndex: number;
  destinationIndex: number;
}

export interface RemoveTasksAction {
  type: REMOVE_TASKS;
  payload: {
    listId: number;
    tasks: Array<number>;
  };
}

export type TaskAction =
  | AddTaskAction
  | RemoveListAction
  | EditTaskNameAction
  | EditTaskDescriptionAction
  | RemoveTasksAction;
