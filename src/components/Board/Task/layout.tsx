import React, { Fragment } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import { TaskType } from "../../../store/types/tasks";
import TaskDetails from "../../Modal/TaskDetails";

interface IProps {
  task: TaskType;
  isModalOpen: boolean;
  index: number;
  onModalToggle: () => void;
}

const BoardTask = styled.div`
  width: 100%;
  padding: 35px 30px 15px;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  margin-bottom: 10px;
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

export default ({ task, isModalOpen, onModalToggle, index }: IProps) => (
  <Fragment>
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided: any) => (
        <BoardTask
          draggable={true}
          onClick={onModalToggle}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
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
      )}
    </Draggable>
    {isModalOpen && <TaskDetails task={task} modalClick={onModalToggle} />}
  </Fragment>
);
