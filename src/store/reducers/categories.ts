import { Reducer } from "redux";
import { CategoriesType, CategoriesActions } from "../types/categories";

export const categories: Reducer<CategoriesType, CategoriesActions> = (
  state = [
    { value: "UI", label: "UI" },
    { value: "UX", label: "UX" },
    { value: "Color", label: "Color" },
    { value: "Animation", label: "Animation" },
    { value: "Illustration", label: "Illustration" }
  ],
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};
