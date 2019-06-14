import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { AppState } from "../../store";
import { IList } from "../../store/types/lists";
import { removeList, editListName } from "../../store/actions/lists";
import { addTask, removeTasks } from "../../store/actions/tasks";
import { getTasks } from "../../store/selectors/tasks";
import { TaskType, TaskArguments } from "../../store/types/tasks";
import { ContextList } from "../../utils/context";
import AddModal from "../Modal/Add/index";
import ResizableTextarea from "../ResizableTextarea";
import Tooltip from "../Tooltip";
import TaskList from "./TaskList";
import More from "./More";

import * as ListLayout from "./styles";

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

type TooltipItems = Array<{ name: string; action: () => any }>;

type Props = IProps & IStateToProps & IDispatchProps;

const List: React.FunctionComponent<Props> = props => {
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [infoList, setInfoList] = useState<IInfoList>({
    id: 0,
    name: props.list.name
  });
  const [tooltipItems, setTooltipItems] = useState<TooltipItems>([
    {
      name: "Remove all tasks",
      action: () => list.tasks.length !== 0 && removeTasks(list.id, list.tasks)
    },
    {
      name: "Remove list",
      action: () => removeListHandle(list.id, list.tasks)
    }
  ]);

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

  const { list, index } = { ...props };
  const listNameRef = useRef<HTMLTextAreaElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);

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
      <Draggable draggableId={`${list.id}`} index={index}>
        {provided => (
          <ListLayout.Main
            id={`${list.id}`}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <ListLayout.Header>
              {!isEditName && (
                <ListLayout.Draggable
                  onClick={visibleNameHandle}
                  ref={draggableRef}
                  {...provided.dragHandleProps}
                />
              )}
              <ResizableTextarea
                maxRows={4}
                lineHeight={25}
                onChange={editNameListHandle}
                value={infoList.name}
                elementId={list.id}
                style={ListLayout.Name}
                placeholder="Add list name"
                refTextarea={listNameRef}
              />
              <More />
              {isTooltipOpen && (
                <Tooltip items={tooltipItems} listName={list.name} />
              )}
            </ListLayout.Header>
            <Droppable key={list.id} droppableId={`${list.id}`} type="task">
              {(provided, snapshot) => (
                <ListLayout.Content
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <TaskList provided={provided} snapshot={snapshot} />
                </ListLayout.Content>
              )}
            </Droppable>
            {/* {isModalOpen && (
              <AddModal
                modalName="task"
                action={addTaskHandle}
                listId={list.id}
                onModalToggle={modalToggleHandle}
              />
            )} */}
          </ListLayout.Main>
        )}
      </Draggable>
    </ContextList.Provider>
  );
};

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
