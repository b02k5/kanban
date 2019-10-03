import { Reducer } from "redux";
import { modalConstants } from "../constants/modal";
import { ModalState, ModalAction } from "../types/modal";

export const modal: Reducer<ModalState, ModalAction> = (
  state = { isModalOpen: false },
  action
) => {
  switch (action.type) {
    case modalConstants.TOGGLE_MODAL: {
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    }

    default:
      return {
        ...state
      };
  }
};
