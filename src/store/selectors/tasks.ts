import { AppState } from "../index";
import values from "lodash/values";
import find from "lodash/find";
import { TaskType } from "../types/tasks";

export const getTasks = (state: AppState, listId: number): TaskType[] => {
  const targetList = find(values(state.lists), list => list.id === listId);

  return targetList ? targetList.tasks.map(task => state.tasks[task]) : [];
};
