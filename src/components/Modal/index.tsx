import React, { ReactNode, createRef } from "react";
import styled from "styled-components";
import portal from "./portal";

interface IProps {
  children: ReactNode;
  modalClick: () => void;
  containerStyles: any;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const Container = styled.div`
  position: relative;
`;
const ModalWrapper = styled.div``;

const refOverlay = createRef<HTMLDivElement>();

export default ({ containerStyles, children, modalClick }: IProps) =>
  portal(
    <Overlay
      onClick={e => refOverlay.current === e.target && modalClick()}
      ref={refOverlay}
    >
      <Container as={containerStyles}>
        <ModalWrapper>{children}</ModalWrapper>
      </Container>
    </Overlay>
  );
