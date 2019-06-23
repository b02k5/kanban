import { SET_CATEGORY } from "../constants/categories";

export enum ECategories {
  UI = "UI",
  UX = "UX",
  Color = "Color",
  Animation = "Animation",
  Illustration = "Illustration"
}

export type Category = { value: string; label: string };

export type CategoriesType = Array<Category>;

export interface SetCategoryArguments {
  value: string;
  label: string;
  taskId: number;
}

export interface SetCategoryAction {
  type: SET_CATEGORY;
  payload: SetCategoryArguments;
}

export type CategoriesActions = SetCategoryAction;
