import { SET_CATEGORY } from "../constants/categories";

export type Category = { value: string; label: string };

export type CategoriesType = Array<Category>;

export interface SetCategory {
  type: SET_CATEGORY;
  payload: Category;
}

export type CategoriesActions = SetCategory;
