import { ADD_TASK, REMOVE_TASK } from "../constants/tasks";

export type TasksState = { [taskId: number]: TaskType };

export interface TaskType {
  id: number;
  name: string;
}

export interface AddTaskAction {
  type: ADD_TASK;
  payload: {
    listId: number;
    taskId: number;
    taskName: string;
  };
}

export interface RemoveTaskAction {
  type: REMOVE_TASK;
  payload: {
    listId: number;
    taskId: number;
  };
}

export type TaskAction = AddTaskAction;
