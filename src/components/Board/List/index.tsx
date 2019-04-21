import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ListLayout from "./layout";
import { IList } from "../../../store/types/lists";
import { removeList, editListName } from "../../../store/actions/lists";
import { addTask } from "../../../store/actions/tasks";
import { AppState } from "../../../store";
import { getTasks } from "../../../store/selectors/tasks";
import { TaskType } from "../../../store/types/tasks";

interface IProps {
  list: IList;
  boardId: number;
}

interface IStateToProps {
  tasks: TaskType[];
}

interface IDispatchProps {
  removeList: (boardId: number, listId: number) => void;
  editListName: (listId: number, nameList: string) => void;
  addTask: (listId: number, taskId: number, taskName: string) => void;
}

interface IState {
  taskName: string;
  isAddTaskInputOpen: boolean;
}

type Props = IProps & IStateToProps & IDispatchProps;

class List extends PureComponent<Props, IState> {
  public state = {
    taskName: "",
    isAddTaskInputOpen: false
  };

  public editNameListHandle = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number
  ) => {
    this.props.editListName(listId, e.target.value);
  };

  private setTaskNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskName: e.target.value
    });
  };

  private _keyDownHandle = (
    e: React.KeyboardEvent<HTMLInputElement>,
    listId: number
  ) => {
    if (e.key === "Enter") {
      this.addTask(listId);
    }
  };

  public addTask = (listId: number) => {
    const taskId: number = new Date().getTime();

    if (this.state.taskName !== "") {
      this.props.addTask(listId, taskId, this.state.taskName);
      this.setState({
        taskName: "",
        isAddTaskInputOpen: false
      });
    }
  };

  private addTaskHandle = () => {
    this.setState({
      isAddTaskInputOpen: true
    });
  };

  public removeListHandle = (listId: number) => {
    const { boardId } = this.props;
    this.props.removeList(boardId, listId);
  };

  public render(): JSX.Element {
    return (
      <ListLayout
        {...this.props}
        {...this.state}
        onRemoveList={this.removeListHandle}
        onSetTaskName={this.setTaskNameHandle}
        onEditNameList={this.editNameListHandle}
        onAddTask={this.addTaskHandle}
        onKeyDown={this._keyDownHandle}
      />
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: any): IStateToProps => ({
  tasks: getTasks(state, ownProps.list.id)
});

const mapDispatchToProps: IDispatchProps = {
  removeList,
  editListName,
  addTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
