import { combineReducers } from "redux";
import { boards } from "./boards";
import { lists } from "./lists";
import { tasks } from "./tasks";
import { categories } from "./categories";

export default combineReducers({
  boards,
  lists,
  tasks,
  categories
});
