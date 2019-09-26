import React, { ReactNode, createRef } from "react";

import portal from "./portal";
import * as Modal from "./styles";

interface IProps {
  children: ReactNode;
  modalClick: () => void;
  containerStyles: any;
}

const refOverlay = createRef<HTMLDivElement>();

export default ({ containerStyles, children, modalClick }: IProps) =>
  portal(
    <Modal.Overlay
      onClick={e => refOverlay.current === e.target && modalClick()}
      ref={refOverlay}
    >
      <Modal.Container as={containerStyles}>
        <Modal.ModalWrapper>{children}</Modal.ModalWrapper>
      </Modal.Container>
    </Modal.Overlay>
  );
