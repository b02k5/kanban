import { combineReducers } from "redux";
import { boards } from "./boards";
import { lists } from "./lists";

export default combineReducers({
  boards,
  lists
});
