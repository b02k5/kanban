import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ListLayout from "./layout";
import { IList } from "../../../store/types/lists";
import { removeList, editListName } from "../../../store/actions/lists";

interface IProps {
  list: IList;
  boardId: number;
}

interface IDispatchProps {
  removeList: (boardId: number, listId: number) => void;
  editListName: (listId: number, nameList: string) => void;
}

interface IState {
  taskName: string;
}

type Props = IProps & IDispatchProps;

class List extends PureComponent<Props, IState> {
  public state = {
    taskName: ""
  };

  public editNameListHandle = (e: React.ChangeEvent<HTMLTextAreaElement>, listId: number) => {
    this.props.editListName(listId, e.target.value);
  };

  public setTaskNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskName: e.target.value
    });
  };

  // public addTaskHandle = () => {
  //   if (this.state.taskName !== "") {
  //     this.setState({
  //       taskName: ""
  //     });

  //     this.props.addTask(this.props.list.id, this.state.taskName);
  //   }
  // };

  public removeListHandle = (listId: number) => {
    const { boardId } = this.props;
    this.props.removeList(boardId, listId)
  };

  public render(): JSX.Element {
    return (
      <ListLayout
        {...this.props}
        {...this.state}
        onRemoveList={this.removeListHandle}
        onSetTaskName={this.setTaskNameHandle}
        onEditNameList={this.editNameListHandle}
      />
    );
  }
}

const mapDispatchToProps: IDispatchProps = {
  removeList,
  editListName
};

export default connect(
  null,
  mapDispatchToProps
)(List);
