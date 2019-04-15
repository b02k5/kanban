import { combineReducers } from "redux";
import { boards } from "./boards";
import { lists } from "./lists";
import { tasks } from "./tasks";

export default combineReducers({
  boards,
  lists,
  tasks
});
