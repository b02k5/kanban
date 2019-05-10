import { AddTaskAction, RemoveTaskAction, TaskArguments } from "../types/tasks";
import { taskConstants } from "../constants/tasks";

export const addTask = ({
  listId,
  id,
  name,
  description
}: TaskArguments): AddTaskAction => ({
  type: taskConstants.ADD_TASK,
  payload: {
    listId,
    id,
    name,
    description
  }
});

export const removeTask = (
  listId: number,
  taskId: number
): RemoveTaskAction => ({
  type: taskConstants.REMOVE_TASK,
  payload: {
    listId,
    taskId
  }
});

export const addTaskMiddleware = (...actions: any) => (dispatch: any) => {
  [...actions].map(action => dispatch(action));
};
