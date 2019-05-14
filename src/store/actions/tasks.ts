import {
  AddTaskAction,
  RemoveTaskAction,
  TaskArguments,
  EditTaskNameAction,
  EditTaskDescriptionAction
} from "../types/tasks";
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

export const editTaskName = (id: number, name: string): EditTaskNameAction => ({
  type: taskConstants.EDIT_TASK_NAME,
  payload: {
    id,
    name
  }
});

export const editTaskDescription = (
  id: number,
  description: string
): EditTaskDescriptionAction => ({
  type: taskConstants.EDIT_TASK_DESCRIPTION,
  payload: {
    id,
    description
  }
});
