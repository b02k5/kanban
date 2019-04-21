import React from "react";
import styled from "styled-components";
import { TaskType } from "../../../store/types/tasks";

interface IProps {
  task: TaskType;
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

const BoardTaskIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff0f3;
  margin-right: 18px;
  border: 3px solid #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const BoardTaskName = styled.span`
  color: #122144;
  font-size: 15px;
  line-height: 20px;
  font-weight: 400;
`;

export default ({ task }: IProps): JSX.Element => (
  <BoardTask>
    <BoardTaskIcon />
    <BoardTaskName>{task.name}</BoardTaskName>
  </BoardTask>
);
