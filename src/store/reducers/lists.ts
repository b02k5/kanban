import { Reducer } from "redux";
import { listConstants } from "../constants/lists";
import { ListsAction, ListsState } from "../types/lists";

export const lists: Reducer<ListsState, ListsAction> = (state = {}, action) => {
  switch (action.type) {
    case listConstants.ADD_LIST:
      const { listId, listName } = action.payload;
      return {
        ...state,
        [listId]: {
          id: listId,
          name: listName,
          tasks: []
        }
      };

    default:
      return {
        ...state
      };
  }
};
