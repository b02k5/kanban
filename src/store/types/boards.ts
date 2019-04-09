import { ADD_BOARD } from "../constants/boards";

export type BoardsState = { [id: string]: BoardType };

export interface BoardType {
  id: number;
  name: string;
  isOpen: boolean;
  lists: {};
}

export interface AddBoardAction {
  type: ADD_BOARD;
  payload: {
    boardId: number;
    boardName: string;
  };
}

export type BoardAction = AddBoardAction;
