import React, { PureComponent, createRef } from "react";
import { connect } from "react-redux";
import ListLayout from "./layout";
import { IList } from "../../../store/types/lists";
import { removeList, editListName } from "../../../store/actions/lists";
import {
  addTask,
  removeTask,
  addTaskMiddleware
} from "../../../store/actions/tasks";
import { AppState } from "../../../store";
import { getTasks } from "../../../store/selectors/tasks";
import { TaskType, TaskArguments } from "../../../store/types/tasks";

interface IProps {
  list: IList;
  boardId: number;
}

interface IStateToProps {
  tasks: TaskType[];
}

interface IDispatchProps {
  removeList: (boardId: number, listId: number, tasks: Array<number>) => void;
  editListName: (listId: number, nameList: string) => void;
  addTask: ({  }: TaskArguments) => void;
  removeTask: (listId: number, taskId: number) => void;
  addTaskMiddleware: (...actions: any) => void;
}

interface IState {
  taskName: string;
  isAddTaskInputOpen: boolean;
  isModalOpen: boolean;
}

type Props = IProps & IStateToProps & IDispatchProps;

class List extends PureComponent<Props, IState> {
  public state = {
    taskName: "",
    isAddTaskInputOpen: false,
    isModalOpen: false
  };

  private addItemInputRef = createRef<HTMLInputElement>();

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

  private addTaskHandle = ({ listId, name, description }: any) => {
    const taskId: number = new Date().getTime();

    const taskArguments = {
      listId,
      id: taskId,
      name,
      description
    };

    this.props.addTask(taskArguments);
    this.modalToggleHandle();
  };

  private modalToggleHandle = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));
  };

  public removeListHandle = (listId: number, tasks: Array<number>) => {
    const { boardId } = this.props;
    this.props.removeList(boardId, listId, tasks);
  };

  public render(): JSX.Element {
    return (
      <ListLayout
        {...this.props}
        {...this.state}
        onRemoveList={this.removeListHandle}
        onSetTaskName={this.setTaskNameHandle}
        onEditNameList={this.editNameListHandle}
        addItemInputRef={this.addItemInputRef}
        onModalToggle={this.modalToggleHandle}
        onAddTask={this.addTaskHandle}
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
  addTask,
  removeTask,
  addTaskMiddleware
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
