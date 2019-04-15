import { AddTaskAction } from "../types/tasks";
import { taskConstants } from "../constants/tasks";

export const addTask = (
  listId: number,
  taskId: number,
  taskName: string
): AddTaskAction => ({
  type: taskConstants.ADD_TASK,
  payload: {
    listId,
    taskId,
    taskName
  }
});
