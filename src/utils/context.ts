import { createContext } from "react";
import { Category } from "../store/types/categories";
import { TaskType } from "../store/types/tasks";

export const ContextBoard = createContext<number>(0);
export const ContextList = createContext<{
  tasks: TaskType[];
  listId: number;
  setIsTooltipOpen: (value: boolean) => void;
}>({
  setIsTooltipOpen: value => value,
  tasks: [],
  listId: 0
});
export const ContextTask = createContext<Category>({ value: "", label: "" });
