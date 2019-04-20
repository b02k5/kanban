import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { saveState, loadState } from "../utils/localStorage";
import throttle from "lodash/throttle";

const logger = createLogger({
  collapsed: true
});

const persistentState = loadState();

export type AppState = ReturnType<typeof rootReducer>;
export const store = createStore(
  rootReducer,
  persistentState,
  applyMiddleware(logger)
);

store.subscribe(
  throttle(() => {
    saveState({
      boards: store.getState().boards,
      lists: store.getState().lists,
      tasks: store.getState().tasks
    });
  }, 1500)
);
