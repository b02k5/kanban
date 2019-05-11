import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { TaskArguments } from "../../../store/types/tasks";
import { addTask } from "../../../store/actions/tasks";
import TaskDetailsLayout from "./layout";

interface IDispatchProps {
  addTask: ({  }: TaskArguments) => void;
}

interface IProps {
  listId: number;
  onModalToggle: () => void;
}

interface IState {
  taskName: string;
  taskDesc: string;
}

type Props = IProps & IDispatchProps;

class TaskDetails extends PureComponent<Props, IState> {
  public state = {
    taskName: "",
    taskDesc: ""
  };

  public submitFormHandle = () => {
    if (this.state.taskName && this.state.taskDesc !== "") {
      this.addTaskHandle();
    }
  };

  public textareaNameHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      taskName: e.target.value
    });
  };

  public textareaDescHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      taskDesc: e.target.value
    });
  };

  public addTaskHandle = () => {
    const taskId: number = new Date().getTime();

    const taskArguments = {
      listId: this.props.listId,
      id: taskId,
      name: this.state.taskName,
      description: this.state.taskDesc
    };

    this.props.addTask(taskArguments);
    this.props.onModalToggle();
  };

  public render() {
    return (
      <TaskDetailsLayout
        {...this.props}
        {...this.state}
        onSubmitForm={this.submitFormHandle}
        onTextareaName={this.textareaNameHandle}
        onTextareaDesc={this.textareaDescHandle}
        onAddTask={this.addTaskHandle}
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
)(TaskDetails);
