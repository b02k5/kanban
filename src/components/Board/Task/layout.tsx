import React, { Fragment } from "react";
import styled from "styled-components";
import { TaskType } from "../../../store/types/tasks";
import Modal from "../../Modal";

interface IProps {
  task: TaskType;
  listId: number;
  isModalOpen: boolean;
  onDrag: (
    e: React.DragEvent<HTMLDivElement>,
    task: TaskType,
    listId: number
  ) => void;
  onNoAllowDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onTask: () => void;
}

const BoardTask = styled.div`
  width: 100%;
  padding: 10px 20px;
  border: 1px solid #eaeff5;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BoardTaskName = styled.span`
  color: #122144;
  font-size: 15px;
  line-height: 20px;
  font-weight: 400;
`;

const ContainerStyles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 510px;
  background-color: #ffffff;
  border-radius: 7px;
`;
const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 25px;
`;
const ModalTime = styled.time`
  font-size: 13px;
  margin-bottom: 7px;
`;
const ModalTitle = styled.textarea`
  color: #122144;
  font-size: 20px;
  line-height: 25px;
  font-weight: 500;
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 0;
  border: 0;
  border-bottom: 1px solid transparent;
  outline: none;
  resize: none;
  transition: 0.1s;
  &:focus,
  &:hover {
    border-bottom: 1px solid rgba(18, 33, 68, 0.15);
  }
`;

const ModalDescription = styled.textarea`
  color: #122144;
  font-size: 14px;
  line-height: 19px;
  font-weight: 400;
  width: 100%;
  max-height: 300px;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-bottom: 1px solid transparent;
  outline: none;
  resize: none;
  transition: 0.1s;
  &:focus,
  &:hover {
    border-bottom: 1px solid rgba(18, 33, 68, 0.15);
  }
`;

export default ({
  task,
  onDrag,
  onNoAllowDrop,
  listId,
  isModalOpen,
  onTask
}: IProps): JSX.Element => (
  <Fragment>
    <BoardTask
      draggable={true}
      onDragStart={e => onDrag(e, task, listId)}
      onDragOver={onNoAllowDrop}
      onClick={onTask}
    >
      <BoardTaskName>{task.name}</BoardTaskName>
    </BoardTask>

    <Modal modalClick={onTask} containerStyles={ContainerStyles}>
      <ModalHeader>
        <ModalTime>04:00 PM</ModalTime>
        <ModalTitle>{task.name}</ModalTitle>
      </ModalHeader>
      <ModalDescription />
    </Modal>

    {/* {isModalOpen && (
      <Modal modalClick={onTask}>
        <ModalContainer>
          <ModalWrapper>
            <ModalHeader>
              <ModalTime>123</ModalTime>
              <ModalTitle>{task.name}</ModalTitle>
            </ModalHeader>
          </ModalWrapper>
        </ModalContainer>
      </Modal>
    )} */}
  </Fragment>
);
