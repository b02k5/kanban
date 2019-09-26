import { createContext } from "react";
import { Category } from "../store/types/categories";

export const ContextBoard = createContext<number>(0);
export const ContextList = createContext<any>({});
export const ContextTask = createContext<Category>({ value: "", label: "" });
