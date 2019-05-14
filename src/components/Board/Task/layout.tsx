import React, { Fragment } from "react";
import styled from "styled-components";

import { TaskType } from "../../../store/types/tasks";
import TaskDetails from "../../Modal/TaskDetails";

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
  onModalToggle: () => void;
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

const BoardTime = styled.time`
  color: #9ba8b0;
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
  onModalToggle
}: IProps) => (
  <Fragment>
    <BoardTask
      draggable={true}
      onDragStart={e => onDrag(e, task, listId)}
      onDragOver={onNoAllowDrop}
      onClick={onModalToggle}
    >
      <BoardTime>{task.date}</BoardTime>
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

    {isModalOpen && <TaskDetails task={task} modalClick={onModalToggle} />}
  </Fragment>
);
