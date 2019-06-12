import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { TaskArguments } from "../../store/types/tasks";
import { addTask } from "../../store/actions/tasks";
import TaskLayout from "./layout";
import { TaskType } from "../../store/types/tasks";

interface IDispatchProps {
  addTask: ({  }: TaskArguments) => void;
}

interface IProps {
  task: TaskType;
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
