import { Reducer } from "redux";
import { TaskAction, TasksState } from "../types/tasks";
import { taskConstants } from "../constants/tasks";
import { listConstants } from "../constants/lists";

export const tasks: Reducer<TasksState, TaskAction> = (state = {}, action) => {
  switch (action.type) {
    case listConstants.REMOVE_LIST: {
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
    }
    case taskConstants.ADD_TASK: {
      const { taskId, taskName } = action.payload;
      if (!state[taskId]) {
        return {
          ...state,
          [taskId]: {
            id: taskId,
            name: taskName
          }
        };
      }
    }
    default:
      return {
        ...state
      };
  }
};
