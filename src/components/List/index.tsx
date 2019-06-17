import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { AppState } from "../../store";
import { IList } from "../../store/types/lists";
import { removeList, editListName } from "../../store/actions/lists";
import { addTask, removeTasks } from "../../store/actions/tasks";
import { getTasks } from "../../store/selectors/tasks";
import { TaskType, TaskArguments } from "../../store/types/tasks";
import { ContextList } from "../../utils/context";
import AddModal from "../Modal/Add/index";
import Tooltip from "../Tooltip";
import TaskList from "./TaskList";
import More from "./More";

import * as List from "./styles";

interface IProps {
  list: IList;
  boardId: number;
  index: number;
}

interface IInfoList {
  id: number;
  name: string;
}

type TooltipItems = Array<{ name: string; action: () => void }>;

export default (props: IProps) => {
  // Create state
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [infoList, setInfoList] = useState<IInfoList>({
    id: 0,
    name: props.list.name
  });
  const [tooltipItems, setTooltipItems] = useState<TooltipItems>([
    {
      name: "Remove all tasks",
      action: () => dispatch(removeTasks(list.id, list.tasks))
    },
    {
      name: "Remove list",
      action: () => dispatch(removeList(boardId, list.id, list.tasks))
    }
  ]);

  // Connect to redux
  const tasks = useSelector<AppState, TaskType[] | []>(state =>
    getTasks(state, props.list.id)
  );
  const { list, boardId, index } = props;
  const dispatch = useDispatch();

  // cDM && cDU
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

  const checkEnterNameHandle = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      setIsEditName(false);
      listNameRef.current && listNameRef.current.blur();
      e.preventDefault();
    } else {
      e.stopPropagation();
    }
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
    dispatch(addTask(taskArguments));
    openModalHandle();
  };

  const openModalHandle = () => {
    setIsModalOpen(prevState => !prevState);
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
      ? dispatch(editListName(infoList.id, infoList.name))
      : setStateListName();
  };

  return (
    <ContextList.Provider value={{ setIsTooltipOpen, tasks, openModalHandle }}>
      <Draggable draggableId={`${list.id}`} index={index}>
        {provided => (
          <List.Main
            id={`${list.id}`}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <List.Header>
              {!isEditName && (
                <List.Draggable
                  onClick={visibleNameHandle}
                  ref={draggableRef}
                  {...provided.dragHandleProps}
                />
              )}
              <List.Name
                maxRows={1}
                onChange={e => editNameListHandle(e, list.id)}
                onKeyDown={e => checkEnterNameHandle(e)}
                value={infoList.name}
                placeholder="Add list name"
                inputRef={listNameRef}
              />
              <More />
              {isTooltipOpen && (
                <Tooltip items={tooltipItems} listName={list.name} />
              )}
            </List.Header>
            <Droppable key={list.id} droppableId={`${list.id}`} type="task">
              {(provided, snapshot) => (
                <List.Content
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <TaskList provided={provided} snapshot={snapshot} />
                </List.Content>
              )}
            </Droppable>
            {isModalOpen && (
              <AddModal
                modalName="task"
                action={addTaskHandle}
                listId={list.id}
                onModalToggle={openModalHandle}
              />
            )}
          </List.Main>
        )}
      </Draggable>
    </ContextList.Provider>
  );
};
