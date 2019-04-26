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

const TaskLetterWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff0f3;
  margin-right: 18px;
  border: 3px solid #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  flex: 0 0 auto;
`;

const BoardTaskName = styled.span`
  color: #122144;
  font-size: 15px;
  line-height: 20px;
  font-weight: 400;
`;

const BoardTaskLetter = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  line-height: 25px;
  font-weight: 500;
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
    <TaskLetterWrapper>
      <BoardTaskLetter>{task.name.charAt(0).toUpperCase()}</BoardTaskLetter>
    </TaskLetterWrapper>
    <BoardTaskName>{task.name}</BoardTaskName>
  </BoardTask>
);
