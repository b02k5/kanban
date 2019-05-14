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
const ModalWrapper = styled.div``;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 0 10px 0 10px;
  background-color: #ffffff;
  border: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgb(78, 79, 83);
  transition: 0.15s;
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 17px;
    height: 2px;
    border-radius: 7px;
    background-color: white;
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
