import React, { PureComponent, createRef } from "react";
import { connect } from "react-redux";
import ListLayout from "./layout";
import { IList } from "../../../store/types/lists";
import { removeList, editListName } from "../../../store/actions/lists";
import { addTask } from "../../../store/actions/tasks";
import { AppState } from "../../../store";
import { getTasks } from "../../../store/selectors/tasks";
import { TaskType, TaskArguments } from "../../../store/types/tasks";

interface IProps {
  list: IList;
  boardId: number;
  index: number;
}

interface IStateToProps {
  tasks: TaskType[];
}

interface IDispatchProps {
  removeList: (boardId: number, listId: number, tasks: Array<number>) => void;
  editListName: (listId: number, nameList: string) => void;
  addTask: ({  }: TaskArguments) => void;
}

interface IState {
  listId: number;
  listName: string;
  taskName: string;
  isModalOpen: boolean;
  isVisibleName: boolean;
}

type Props = IProps & IStateToProps & IDispatchProps;

class List extends PureComponent<Props, IState> {
  public state = {
    listId: 0,
    listName: "",
    taskName: "",
    isModalOpen: false,
    isVisibleName: false
  };

  private listNameRef = createRef<HTMLTextAreaElement>();

  public editNameListHandle = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number
  ) => {
    this.setState({
      listId,
      listName: e.target.value
    });
  };

  private setTaskNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskName: e.target.value
    });
  };

  private addTaskHandle = ({ listId, name, description }: TaskArguments) => {
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

  public visibleNameHandle = () => {
    if (!this.state.isVisibleName) {
      const node = this.listNameRef.current!;
      node.focus()!;
      document.addEventListener("click", this.onDocument);
    } else {
      document.removeEventListener("click", this.onDocument);
      this.sendEditedListName();
    }

    this.setState(prevState => ({
      isVisibleName: !prevState.isVisibleName
    }));
  };

  private onDocument = (e: MouseEvent) => {
    if (this.listNameRef.current !== e.target) {
      this.visibleNameHandle();
    }
  };

  private sendEditedListName = () => {
    this.state.listName != "" &&
      this.props.editListName(this.state.listId, this.state.listName);
  };

  public render(): JSX.Element {
    return (
      <ListLayout
        {...this.props}
        {...this.state}
        onRemoveList={this.removeListHandle}
        onSetTaskName={this.setTaskNameHandle}
        onEditNameList={this.editNameListHandle}
        onModalToggle={this.modalToggleHandle}
        onAddTask={this.addTaskHandle}
        onVisibleName={this.visibleNameHandle}
        listNameRef={this.listNameRef}
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
