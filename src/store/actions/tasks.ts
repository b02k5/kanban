import {
  AddTaskAction,
  MoveTaskAction,
  TaskArguments,
  EditTaskNameAction,
  EditTaskDescriptionAction,
  ChangePositionTasks,
  ChangePositionTaskArgs
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
  sourceListId: number,
  taskId: number,
  targetListId: number,
  destinationIndex: number
): MoveTaskAction => ({
  type: taskConstants.MOVE_TASK,
  payload: {
    sourceListId,
    taskId,
    targetListId,
    destinationIndex
  }
});

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

export const changePositionTasks = ({
  listId,
  taskId,
  sourceIndex,
  destinationIndex
}: ChangePositionTaskArgs): ChangePositionTasks => ({
  type: taskConstants.CHANGE_POSITION_TASK,
  payload: {
    listId,
    taskId,
    sourceIndex,
    destinationIndex
  }
});
