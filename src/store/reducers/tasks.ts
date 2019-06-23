import { Reducer } from "redux";
import moment from "moment";

import { TaskAction, TasksState, RemoveTasksAction } from "../types/tasks";
import { taskConstants } from "../constants/tasks";
import { listConstants } from "../constants/lists";
import { RemoveListAction } from "../types/lists";
import { categoriesConstants } from "../constants/categories";

const removeTasks = (
  state: TasksState,
  action: RemoveListAction | RemoveTasksAction
) => {
  const { tasks } = action.payload;
  return Object.keys(state)
    .filter(taskId => !tasks.includes(Number(taskId)))
    .reduce(
      (newState, taskId) => ({
        ...newState,
        [taskId]: state[Number(taskId)]
      }),
      {}
    );
};

export const tasks: Reducer<TasksState, TaskAction> = (state = {}, action) => {
  switch (action.type) {
    case listConstants.REMOVE_LIST: {
      return removeTasks(state, action);
    }
    case taskConstants.ADD_TASK: {
      const { id, name, description, category } = action.payload;
      const date = moment().format("D MMM YYYY");

      if (!state[id]) {
        return {
          ...state,
          [id]: {
            id,
            name,
            description,
            date,
            category
          }
        };
      }
    }
    case taskConstants.EDIT_TASK_NAME: {
      const { id, name } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          name
        }
      };
    }
    case taskConstants.EDIT_TASK_DESCRIPTION: {
      const { id, description } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          description
        }
      };
    }
    case taskConstants.REMOVE_TASKS: {
      return removeTasks(state, action);
    }
    case categoriesConstants.SET_CATEGORY: {
      const { value, label, taskId } = action.payload;
      return {
        ...state,
        [taskId]: {
          ...state[taskId],
          category: {
            value,
            label
          }
        }
      };
    }
    default:
      return {
        ...state
      };
  }
};
