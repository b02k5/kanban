import { AppState } from "../store";

export const saveState = (state: AppState): void => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (error) {
    window.console.error(error);
  }
};

export const loadState = (): AppState | undefined => {
  try {
    const serializedState: string | null = localStorage.getItem("state");
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    window.console.error(error);
  }
};
