import { IToggleModal } from "../types/modal";
import { modalConstants } from "../constants/modal";

export const toggleModal = (): IToggleModal => ({
  type: modalConstants.TOGGLE_MODAL
});
