import styled from "styled-components";
import { EAddNewComponent, EConfirmModalForm } from "./index";

export const Main = styled.button<{
  actionName: EConfirmModalForm;
}>`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

export const Plus = styled.span`
  position: relative;
  width: 8px;
  height: 2px;
  margin-right: 5px;
  transition: 0.15s;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 2px;
    transform: rotate(90deg);
    transition: 0.15s;
  }
`;

export const ButtonAdd = styled.button<{ actionName: EAddNewComponent }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props =>
    props.actionName === EAddNewComponent.Task ? "#777a80" : "#e9edf4"};
  font-size: 14px;
  line-height: 19px;
  font-weight: 500;
  width: 100%;
  border-radius: ${props =>
    props.actionName === EAddNewComponent.Task ? "0 0 5px 5px;" : "5px"};
  padding: 15px;
  border: 0;
  cursor: pointer;
  transition: 0.15s;
  background-color: ${props =>
    props.actionName === EAddNewComponent.Task
      ? "#e9edf4"
      : "rgba(0, 0, 0, 0.24)"};
  &:hover {
    color: ${props =>
      props.actionName === EAddNewComponent.Task ? "#3d3f43" : "white"};
    background-color: ${props =>
      props.actionName === EAddNewComponent.Task
        ? "#d3d9e1"
        : "rgba(0, 0, 0, 0.32)"};
  }

  ${Plus} {
    background-color: ${props =>
      props.actionName === EAddNewComponent.Task ? "#777a80" : "white"}
    &::before {
      background-color: ${props =>
        props.actionName === EAddNewComponent.Task ? "#777a80" : "white"}
    }
  }
  &:hover ${Plus} {
    background-color: ${props =>
      props.actionName === EAddNewComponent.Task ? "#3d3f43" : "#e9edf4"};
    &::before {
      background-color: ${props =>
        props.actionName === EAddNewComponent.Task ? "#3d3f43" : "#e9edf4"};
    }
  }
`;
