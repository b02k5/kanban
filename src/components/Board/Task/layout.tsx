import React from "react";
import styled from "styled-components";
import { TaskType } from "../../../store/types/tasks";

const BoardTask = styled.div``;
interface IProps {
  task: TaskType;
}

export default ({ task }: IProps): JSX.Element => (
  <BoardTask>{task.name}</BoardTask>
);
