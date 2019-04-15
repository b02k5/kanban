import { Reducer } from "redux";
import { listConstants } from "../constants/lists";
import { ListsAction, ListsState } from "../types/lists";
import { taskConstants } from "../constants/tasks";

export const lists: Reducer<ListsState, ListsAction> = (state = {}, action) => {
  switch (action.type) {
    case listConstants.ADD_LIST: {
      const { listId, listName } = action.payload;
      return {
        ...state,
        [listId]: {
          id: listId,
          name: listName,
          tasks: []
        }
      };
    }
    case listConstants.REMOVE_LIST: {
      const { listId } = action.payload;
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    }
    case listConstants.EDIT_NAME_LIST: {
      const { listId, listName } = action.payload;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          name: listName
        }
      };
    }
    case taskConstants.ADD_TASK: {
      const { listId, taskId } = action.payload;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          tasks: [...state[listId].tasks, taskId]
        }
      };
    }
    default:
      return {
        ...state
      };
  }
};
