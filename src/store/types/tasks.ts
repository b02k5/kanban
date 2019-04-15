import { ADD_TASK } from "../constants/tasks";

export type TasksState = { [taskId: number]: TaskType };

export interface TaskType {
  id: number;
  name: string;
}

export interface AddTaskAction {
  type: ADD_TASK;
  payload: {
    boardId: number;
    taskId: number;
    taskName: string;
  };
}

export type TaskAction = AddTaskAction;
