import { AddBoardAction } from "../types/boards";
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
