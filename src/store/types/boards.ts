import { ADD_BOARD } from "../constants/boards";

export type BoardsState = { [name: string]: BoardType };

export interface BoardType {
  id: number;
  name: string;
  isOpen: boolean;
  lists: [];
}

export interface AddBoardAction {
  type: ADD_BOARD;
  payload: {
    boardId: number;
    boardName: string;
  };
}

export type BoardAction = AddBoardAction;
