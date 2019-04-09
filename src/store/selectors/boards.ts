import { BoardsState } from "../types/boards";
import { AppState } from "..";

export const getActiveBoard = (state: AppState): BoardsState => state.boards;
