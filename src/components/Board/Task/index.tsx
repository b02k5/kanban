import React, { PureComponent } from "react";
import TaskLayout from "./layout";
import { TaskType } from "../../../store/types/tasks";

interface IProps {
  task: TaskType;
}

export default class Task extends PureComponent<IProps, {}> {
  render(): JSX.Element {
    return <TaskLayout {...this.props} />;
  }
}
