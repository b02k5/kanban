import { AddBoardAction, ActiveBoardAction } from "../types/boards";
import { boardConstants } from "../constants/boards";

export const addBoard = (
  boardId: number,
  boardName: string
): AddBoardAction => ({
  type: boardConstants.ADD_BOARD,
  payload: {
    boardId,
    boardName
  }
});

export const activeBoard = (boardId: number): ActiveBoardAction => ({
  type: boardConstants.ACTIVE_BOARD,
  payload: boardId
});
