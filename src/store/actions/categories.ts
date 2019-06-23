import { categoriesConstants } from "../constants/categories";
import { SetCategory, Category } from "../types/categories";

export const setCategory = ({ value, label }: Category): SetCategory => ({
  type: categoriesConstants.SET_CATEGORY,
  payload: {
    value,
    label
  }
});
