import React, { Fragment } from "react";
import styled from "styled-components";
import { TaskType } from "../../../store/types/tasks";
import Modal from "../../Modal";
import TextareaAutosize from "react-textarea-autosize";

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
  padding: 35px 30px 15px;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
`;

const BoardTaskName = styled.h3`
  color: #212225;
  font-size: 17px;
  line-height: 22px;
  font-weight: 500;
  display: block;
  margin: 0 0 15px 0;
`;

const ContainerStyles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 510px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
`;

const ModalTime = styled.time`
  color: #9ba8b0;
  font-size: 12px;
  margin-bottom: 3px;
  display: inline-block;
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
  margin-bottom: 18px;
  display: block;
  &:focus,
  &:hover {
    border-bottom: 1px solid rgba(18, 33, 68, 0.15);
  }
`;

const ModalDescription = styled.div`
  width: 100%;
  border-bottom: 1px solid transparent;
  transition: 0.1s;
  &:focus,
  &:hover {
    border-bottom: 1px solid rgba(18, 33, 68, 0.15);
  }
`;

const BoardTime = styled.time`
  font-size: 11px;
  line-height: 16px;
`;

const BoardDescription = styled.p`
  color: #4e4f53;
  font-size: 13px;
  line-height: 18px;
  margin: 0 0 30px 0;
`;

const BoardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const BoardTagList = styled.ul`
  list-style: none;
  padding: 0;
`;
const BoardTagItem = styled.li``;
const BoardTag = styled.span`
  color: white;
  font-size: 13px;
  line-height: 19px;
  font-weight: 500;
  background-color: #b7f5de;
  padding: 2px 10px;
  border-radius: 20px;
`;

export default ({
  task,
  onDrag,
  onNoAllowDrop,
  listId,
  isModalOpen,
  onTask
}: IProps) => (
  <Fragment>
    <BoardTask
      draggable={true}
      onDragStart={e => onDrag(e, task, listId)}
      onDragOver={onNoAllowDrop}
      onClick={onTask}
    >
      <BoardTime as={ModalTime}>{task.date}</BoardTime>
      <BoardTaskName>{task.name}</BoardTaskName>
      <BoardDescription>{task.description}</BoardDescription>
      <BoardFooter>
        <BoardTagList>
          <BoardTagItem>
            <BoardTag>UI</BoardTag>
          </BoardTagItem>
        </BoardTagList>
      </BoardFooter>
    </BoardTask>

    {isModalOpen && (
      <Modal modalClick={onTask} containerStyles={ContainerStyles}>
        <ModalTime>04:00 PM</ModalTime>
        <ModalTitle>{task.name}</ModalTitle>
        <ModalDescription>
          <TextareaAutosize
            style={{
              border: 0,
              color: "#122144",
              fontSize: "14px",
              lineHeight: "19px",
              resize: "none",
              width: "100%",
              outline: "none"
            }}
          />
        </ModalDescription>
      </Modal>
    )}
  </Fragment>
);
