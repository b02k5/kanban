import { Reducer } from "redux";
import { TaskAction, TasksState } from "../types/tasks";
import { taskConstants } from "../constants/tasks";

export const tasks: Reducer<TasksState, TaskAction> = (state = {}, action) => {
  switch (action.type) {
    case taskConstants.ADD_TASK: {
      const { taskId, taskName } = action.payload;
      return {
        ...state,
        [taskId]: {
          id: taskId,
          name: taskName
        }
      };
    }
    default:
      return {
        ...state
      };
  }
};
