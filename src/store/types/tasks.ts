import { ADD_TASK, REMOVE_TASK } from "../constants/tasks";
import { RemoveListAction } from "./lists";

export type TasksState = { [taskId: number]: TaskType };

export interface TaskType {
  id: number;
  name: string;
  description: string;
}

export type TaskArguments = {
  listId: number;
  id: number;
  name: string;
  description: string;
};

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

export type TaskAction = AddTaskAction | RemoveListAction;
