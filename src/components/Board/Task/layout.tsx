import React from "react";
import styled from "styled-components";
import { TaskType } from "../../../store/types/tasks";

interface IProps {
  task: TaskType;
  listId: number;
  onDrag: (
    e: React.DragEvent<HTMLDivElement>,
    task: TaskType,
    listId: number
  ) => void;
  onNoAllowDrop: (e: React.DragEvent<HTMLDivElement>) => void;
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

export default ({
  task,
  onDrag,
  onNoAllowDrop,
  listId
}: IProps): JSX.Element => (
  <BoardTask
    draggable={true}
    onDragStart={e => onDrag(e, task, listId)}
    onDragOver={onNoAllowDrop}
  >
    <BoardTaskName>{task.name}</BoardTaskName>
  </BoardTask>
);
