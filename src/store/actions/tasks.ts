import { AddTaskAction, RemoveTaskAction } from "../types/tasks";
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

export const removeTask = (listId: number, taskId: number): RemoveTaskAction => ({
  type: taskConstants.REMOVE_TASK,
  payload: {
    listId,
    taskId
  }
})

export const addTaskMiddleware = (...actions: any) => (dispatch: any) => {
  [...actions].map(action => dispatch(action))
}
