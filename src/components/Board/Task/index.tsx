import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { TaskArguments } from "../../../store/types/tasks";
import { addTask } from "../../../store/actions/tasks";
import TaskLayout from "./layout";
import { TaskType } from "../../../store/types/tasks";

interface IDispatchProps {
  addTask: ({  }: TaskArguments) => void;
}

interface IProps {
  task: TaskType;
  listId: number;
  index: number;
}

interface IState {
  isModalOpen: boolean;
}

type Props = IDispatchProps & IProps;

class Task extends PureComponent<Props, IState> {
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

  private modalToggleHandle = () => {
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
        onModalToggle={this.modalToggleHandle}
      />
    );
  }
}
const mapDispatchToProps: IDispatchProps = {
  addTask
};

export default connect(
  null,
  mapDispatchToProps
)(Task);
