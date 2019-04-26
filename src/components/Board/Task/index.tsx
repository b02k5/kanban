import React, { PureComponent } from "react";
import TaskLayout from "./layout";
import { TaskType } from "../../../store/types/tasks";

interface IProps {
  task: TaskType;
  listId: number;
}

export default class Task extends PureComponent<IProps, {}> {
  private _dragHandle = (
    e: React.DragEvent<HTMLDivElement>,
    task: TaskType,
    listIdDraggable: number
  ) => {
    e.dataTransfer.setData(
      "transfer",
      JSON.stringify({ task: task, listIdDraggable })
    );
  };

  private _noAllowDropHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  render(): JSX.Element {
    return (
      <TaskLayout
        {...this.props}
        onDrag={this._dragHandle}
        onNoAllowDrop={this._noAllowDropHandle}
      />
    );
  }
}
