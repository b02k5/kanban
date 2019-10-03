import { TOGGLE_MODAL } from "../constants/modal";

export type ModalState = { isModalOpen: boolean };

export interface IToggleModal {
  type: TOGGLE_MODAL;
}

export type ModalAction = IToggleModal;
