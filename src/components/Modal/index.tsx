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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const Container = styled.div`
  position: relative;
`;
const ModalWrapper = styled.div`
  padding: 30px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: -40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 17px;
    height: 2px;
    border-radius: 7px;
    background-color: #77787a;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

const refOverlay = createRef<HTMLDivElement>();

export default ({ containerStyles, children, modalClick }: IProps) =>
  portal(
    <Overlay
      onClick={e => refOverlay.current === e.target && modalClick()}
      ref={refOverlay}
    >
      <Container as={containerStyles}>
        <ModalWrapper>{children}</ModalWrapper>
        <CloseButton onClick={modalClick} />
      </Container>
    </Overlay>
  );
