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

const Task = styled.div<{ isDragging: boolean }>`
  width: 100%;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.15s ease;
  background-color: ${props => (props.isDragging ? "#67686d" : "white")};
`;

const Name = styled.h3<{ isDragging: boolean }>`
  color: ${props => (props.isDragging ? "white" : "#212225")};
  font-size: 17px;
  line-height: 22px;
  font-weight: 500;
  display: block;
  margin: 0;
`;

const Time = styled.time`
  display: block;
  color: #a4afb6;
  font-size: 11px;
  line-height: 16px;
  margin-bottom: 2px;
`;

const Description = styled.p<{ isDragging: boolean }>`
  color: ${props => (props.isDragging ? "white" : "#4e4f53")};
  font-size: 13px;
  line-height: 18px;
  margin: 10px 0 0 0;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 15px;
`;
const TagLists = styled.ul`
  list-style: none;
  padding: 0;
`;
const TagItem = styled.li``;
const Tag = styled.span`
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
      {(provided, snapshot) => (
        <Task
          draggable={true}
          onClick={onModalToggle}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Time>{task.date}</Time>
          <Name isDragging={snapshot.isDragging}>{task.name}</Name>
          <Description isDragging={snapshot.isDragging}>
            {task.description}
          </Description>
          <Footer>
            <TagLists>
              <TagItem>
                <Tag>UI</Tag>
              </TagItem>
            </TagLists>
          </Footer>
        </Task>
      )}
    </Draggable>
    {isModalOpen && <TaskDetails task={task} modalClick={onModalToggle} />}
  </Fragment>
);
