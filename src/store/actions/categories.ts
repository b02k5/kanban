import { categoriesConstants } from "../constants/categories";
import { SetCategoryAction, SetCategoryArguments } from "../types/categories";

export const setCategory = ({
  value,
  label,
  taskId
}: SetCategoryArguments): SetCategoryAction => ({
  type: categoriesConstants.SET_CATEGORY,
  payload: {
    taskId,
    value,
    label
  }
});
