import React, { PureComponent, createRef } from "react";
import { connect } from "react-redux";

import ListLayout from "./layout";
import { IList } from "../../../store/types/lists";
import { removeList, editListName } from "../../../store/actions/lists";
import { addTask, removeTasks } from "../../../store/actions/tasks";
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
  removeTasks: (listId: number, tasks: Array<number>) => void;
}

interface IState {
  listId: number;
  listName: string;
  taskName: string;
  isModalOpen: boolean;
  isVisibleName: boolean;
  isTooltipOpen: boolean;
}

type Props = IProps & IStateToProps & IDispatchProps;

class List extends PureComponent<Props, IState> {
  public state = {
    listId: 0,
    listName: this.props.list.name,
    taskName: "",
    isModalOpen: false,
    isVisibleName: false,
    isTooltipOpen: false
  };

  private listNameRef = createRef<HTMLTextAreaElement>();
  private tooltipRef = createRef<HTMLDivElement>();

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
      this.setStateListName();
      this.setFocusToName();
      document.addEventListener("click", this.onDocument);
    } else {
      document.removeEventListener("click", this.onDocument);
      this.state.listName !== this.props.list.name && this.sendEditedListName();
    }

    this.setState(prevState => ({
      isVisibleName: !prevState.isVisibleName
    }));
  };

  public visibleTooltipHandle = () => {
    if (!this.state.isTooltipOpen) {
      document.addEventListener("click", this.onDocument);
    } else {
      document.removeEventListener("click", this.onDocument);
    }

    this.setState(prevState => ({
      isTooltipOpen: !prevState.isTooltipOpen
    }));
  };

  private setFocusToName = () => {
    const node = this.listNameRef.current!;
    node.focus();
    node.setSelectionRange(0, node.value.length);
  };

  private onDocument = (e: MouseEvent) => {
    if (this.listNameRef.current !== e.target && this.state.isVisibleName) {
      this.visibleNameHandle();
    }
    if (
      this.tooltipRef.current !== null &&
      !this.tooltipRef.current.contains(e.target as Node) &&
      this.state.isTooltipOpen
    ) {
      this.visibleTooltipHandle();
    }
  };

  private setStateListName = () => {
    this.setState({
      listName: this.props.list.name
    });
  };

  private sendEditedListName = () => {
    this.state.listName != ""
      ? this.props.editListName(this.state.listId, this.state.listName)
      : (this.state.listName = this.props.list.name);
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
        tooltipRef={this.tooltipRef}
        onVisibleTooltip={this.visibleTooltipHandle}
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
  removeTasks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
