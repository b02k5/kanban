import React, { PureComponent } from "react";
import TaskDetailsLayout from "./layout";

interface IProps {
  listId?: number;
  modalName: string;
  onModalToggle: () => void;
  action: ({  }: any) => void;
}

interface IState {
  taskName: string;
  taskDesc: string;
}

export default class AddModal extends PureComponent<IProps, IState> {
  public state = {
    taskName: "",
    taskDesc: ""
  };

  public submitFormHandle = (e: any) => {
    if (this.props.listId) {
      if (this.state.taskName && this.state.taskDesc !== "") {
        e.preventDefault();
        const addTaskArguments = {
          listId: this.props.listId,
          name: this.state.taskName,
          description: this.state.taskDesc
        };

        this.props.action(addTaskArguments);
      }
    } else {
      if (this.state.taskName !== "") {
        e.preventDefault();
        this.props.action({ name: this.state.taskName });
      }
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

  public render() {
    return (
      <TaskDetailsLayout
        {...this.props}
        {...this.state}
        onSubmitForm={this.submitFormHandle}
        onTextareaName={this.textareaNameHandle}
        onTextareaDesc={this.textareaDescHandle}
      />
    );
  }
}
