import { combineReducers } from "redux";
import { boards } from "./boards";
import { lists } from "./lists";
import { tasks } from "./tasks";
import { categories } from "./categories";
import { modal } from "./modal";

export default combineReducers({
  boards,
  lists,
  tasks,
  categories,
  modal
});
