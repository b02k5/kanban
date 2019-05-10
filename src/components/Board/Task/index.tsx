import React, { PureComponent } from "react";
import TaskLayout from "./layout";
import { TaskType } from "../../../store/types/tasks";

interface IProps {
  task: TaskType;
  listId: number;
}

interface IState {
  isModalOpen: boolean;
}

export default class Task extends PureComponent<IProps, IState> {
  public state = {
    isModalOpen: false
  };

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

  public taskHandle = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));
  };

  render() {
    return (
      <TaskLayout
        {...this.props}
        {...this.state}
        onDrag={this._dragHandle}
        onNoAllowDrop={this._noAllowDropHandle}
        onTask={this.taskHandle}
      />
    );
  }
}
