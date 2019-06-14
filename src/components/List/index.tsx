import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";

import ListLayout from "./layout";
import { IList } from "../../store/types/lists";
import { removeList, editListName } from "../../store/actions/lists";
import { addTask, removeTasks } from "../../store/actions/tasks";
import { AppState } from "../../store";
import { getTasks } from "../../store/selectors/tasks";
import { TaskType, TaskArguments } from "../../store/types/tasks";
import { ContextList } from "../../utils/context";

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

interface IInfoList {
  id: number;
  name: string;
}

type Props = IProps & IStateToProps & IDispatchProps;

const List: React.FunctionComponent<Props> = props => {
  const [state, setState] = useState({
    taskName: "",
    isModalOpen: false
  });

  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [infoList, setInfoList] = useState<IInfoList>({
    id: 0,
    name: props.list.name
  });

  useEffect(() => {
    if (isEditName) {
      document.addEventListener("click", clickOutsideHandle);
    } else {
      document.removeEventListener("click", clickOutsideHandle);
      infoList.name !== props.list.name && sendEditedListName();
    }

    return () => {
      document.removeEventListener("click", clickOutsideHandle);
    };
  }, [isEditName]);

  const listNameRef = useRef<HTMLTextAreaElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const editNameListHandle = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number
  ) => {
    setInfoList({
      id: listId,
      name: e.target.value
    });
  };

  const clickOutsideHandle = (e: MouseEvent) => {
    const node = listNameRef.current;
    node && !node.contains(e.target as Node) && setIsEditName(false);
  };

  const addTaskHandle = ({ listId, name, description }: TaskArguments) => {
    const taskId: number = new Date().getTime();
    const taskArguments = {
      listId,
      id: taskId,
      name,
      description
    };
    props.addTask(taskArguments);
    modalToggleHandle();
  };

  const modalToggleHandle = () => {
    // this.setState(prevState => ({
    //   isModalOpen: !prevState.isModalOpen
    // }));
  };

  const removeListHandle = (listId: number, tasks: Array<number>) => {
    const { boardId } = props;
    props.removeList(boardId, listId, tasks);
  };

  const visibleNameHandle = () => {
    !isEditName && setFocusToName();
    setIsEditName(prevState => !prevState);
  };

  const setFocusToName = () => {
    const node = listNameRef.current;
    node && node.focus();
    node && node.setSelectionRange(0, node.value.length);
  };

  const setStateListName = () => {
    setInfoList({
      ...infoList,
      name: props.list.name
    });
  };

  const sendEditedListName = () => {
    infoList.name !== ""
      ? props.editListName(infoList.id, infoList.name)
      : setStateListName();
  };

  return (
    <ContextList.Provider value={{ setIsTooltipOpen, tasks: props.tasks }}>
      <ListLayout
        {...props}
        {...state}
        onRemoveList={removeListHandle}
        onEditNameList={editNameListHandle}
        onModalToggle={modalToggleHandle}
        onAddTask={addTaskHandle}
        onVisibleName={visibleNameHandle}
        listNameRef={listNameRef}
        isTooltipOpen={isTooltipOpen}
        isEditName={isEditName}
        setIsTooltipOpen={setIsTooltipOpen}
        infoList={infoList}
        headerRef={headerRef}
      />
    </ContextList.Provider>
  );
};

// class List extends PureComponent<Props, IState> {
//   // public state = {};

//   // private listNameRef = createRef<HTMLTextAreaElement>();
//   // private tooltipRef = createRef<HTMLDivElement>();

//   // public editNameListHandle = (
//   //   e: React.ChangeEvent<HTMLTextAreaElement>,
//   //   listId: number
//   // ) => {
//   //   this.setState({
//   //     listId,
//   //     listName: e.target.value
//   //   });
//   // };

//   // private setTaskNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   this.setState({
//   //     taskName: e.target.value
//   //   });
//   // };

//   // private addTaskHandle = ({ listId, name, description }: TaskArguments) => {
//   //   const taskId: number = new Date().getTime();

//   //   const taskArguments = {
//   //     listId,
//   //     id: taskId,
//   //     name,
//   //     description
//   //   };

//   //   this.props.addTask(taskArguments);
//   //   this.modalToggleHandle();
//   // };

//   // private modalToggleHandle = () => {
//   //   this.setState(prevState => ({
//   //     isModalOpen: !prevState.isModalOpen
//   //   }));
//   // };

//   // public removeListHandle = (listId: number, tasks: Array<number>) => {
//   //   const { boardId } = this.props;
//   //   this.props.removeList(boardId, listId, tasks);
//   // };

//   // public visibleNameHandle = () => {
//   //   if (!this.state.isVisibleName) {
//   //     this.setStateListName();
//   //     this.setFocusToName();
//   //     document.addEventListener("click", this.clikOutsideHandle;
//   //   } else {
//   //     document.removeEventListener("click", this.clikOutsideHandle;
//   //     this.state.listName !== this.props.list.name && this.sendEditedListName();
//   //   }

//   //   this.setState(prevState => ({
//   //     isVisibleName: !prevState.isVisibleName
//   //   }));
//   // };

//   // public visibleTooltipHandle = () => {
//   //   if (!this.state.isTooltipOpen) {
//   //     document.addEventListener("click", this.clikOutsideHandle;
//   //   } else {
//   //     document.removeEventListener("click", this.clikOutsideHandle;
//   //   }

//   //   this.setState(prevState => ({
//   //     isTooltipOpen: !prevState.isTooltipOpen
//   //   }));
//   // };

//   // private setFocusToName = () => {
//   //   const node = this.listNameRef.current!;
//   //   node.focus();
//   //   node.setSelectionRange(0, node.value.length);
//   // };

//   // private clikOutsideHandle= (e: MouseEvent) => {
//   //   if (this.listNameRef.current !== e.target && this.state.isVisibleName) {
//   //     this.visibleNameHandle();
//   //   }
//   //   if (
//   //     this.tooltipRef.current !== null &&
//   //     !this.tooltipRef.current.contains(e.target as Node) &&
//   //     this.state.isTooltipOpen
//   //   ) {
//   //     this.visibleTooltipHandle();
//   //   }
//   // };

//   // private setStateListName = () => {
//   //   this.setState({
//   //     listName: this.props.list.name
//   //   });
//   // };

//   // private sendEditedListName = () => {
//   //   this.state.listName != ""
//   //     ? this.props.editListName(this.state.listId, this.state.listName)
//   //     : (this.state.listName = this.props.list.name);
//   // };

//   // public render(): JSX.Element {
//   //   return (
//   //     <ListLayout
//   //       {...this.props}
//   //       {...this.state}
//   //       onRemoveList={this.removeListHandle}
//   //       onSetTaskName={this.setTaskNameHandle}
//   //       onEditNameList={this.editNameListHandle}
//   //       onModalToggle={this.modalToggleHandle}
//   //       onAddTask={this.addTaskHandle}
//   //       onVisibleName={this.visibleNameHandle}
//   //       listNameRef={this.listNameRef}
//   //       tooltipRef={this.tooltipRef}
//   //       onVisibleTooltip={this.visibleTooltipHandle}
//   //     />
//   //   );
//   // }
// }

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
