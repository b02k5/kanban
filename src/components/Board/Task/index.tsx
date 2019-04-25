import React, { PureComponent } from "react";
import TaskLayout from "./layout";
import { TaskType } from "../../../store/types/tasks";

interface IProps {
  task: TaskType;
}

export default class Task extends PureComponent<IProps, {}> {

  private drag = (e: React.DragEvent<HTMLDivElement>, task: TaskType) => {
    e.dataTransfer.setData('transfer', JSON.stringify(task));
  }

  private noAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  render(): JSX.Element {
    return <TaskLayout {...this.props} drag={this.drag}
      noAllowDrop={this.noAllowDrop} />;
  }
}
