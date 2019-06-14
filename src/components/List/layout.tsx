import React, { useState } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TextareaAutosize from "react-textarea-autosize";

import { IList } from "../../store/types/lists";
import { TaskType, TaskArguments } from "../../store/types/tasks";
import AddModal from "../Modal/Add/index";
import ResizableTextarea from "../ResizableTextarea";
import Tooltip from "../Tooltip";
import TaskList from "./TaskList";
import More from "./More";

interface IProps {
  list: IList;
  tasks: TaskType[];
  taskName: string;
  isModalOpen: boolean;
  index: number;
  isEditName: boolean;
  listNameRef: any;
  headerRef: any;
  isTooltipOpen: boolean;
  infoList: { id: number; name: string };
  onRemoveList: (listId: number, tasks: Array<number>) => void;
  onEditNameList: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number
  ) => void;
  onModalToggle: () => void;
  onAddTask: ({  }: TaskArguments) => void;
  onVisibleName: () => void;
  removeTasks: (listId: number, tasks: Array<number>) => void;
}

const List = styled.div`
  position: relative;
  width: 280px;
  margin-left: 15px;
`;

const Header = styled.div`
  position: relative;
  padding: 10px 40px 10px 15px;
  border-radius: 5px 5px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #e9edf4;
`;

const HeaderTarget = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: grab;
`;

const Name = styled.textarea`
  color: #36373a;
  font-size: 20px;
  line-height: 25px;
  font-weight: bold;
  width: 100%;
  margin: 0;
  padding: 2px 0 2px 10px;
  border: 0;
  border-bottom: 1px solid transparent;
  background-color: transparent;
  resize: none;
  transition: 0.1s;
`;
const RemoveList = styled.button``;

const Content = styled.div`
  height: calc(100vh - 119px);
`;

export default ({
  list,
  onRemoveList,
  onEditNameList,
  tasks,
  onModalToggle,
  isModalOpen,
  onAddTask,
  index,
  onVisibleName,
  isEditName,
  listNameRef,
  isTooltipOpen,
  removeTasks,
  infoList,
  headerRef
}: IProps): JSX.Element => {
  const [tooltipItems, setTooltipItems] = useState([
    {
      name: "Remove all tasks",
      action: () => list.tasks.length !== 0 && removeTasks(list.id, list.tasks)
    },
    {
      name: "Remove list",
      action: () => onRemoveList(list.id, list.tasks)
    }
  ]);

  return (
    <Draggable draggableId={`${list.id}`} index={index}>
      {provided => (
        <List
          id={`${list.id}`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Header>
            {!isEditName && (
              <HeaderTarget
                onClick={onVisibleName}
                ref={headerRef}
                {...provided.dragHandleProps}
              />
            )}
            <ResizableTextarea
              maxRows={4}
              lineHeight={25}
              onChange={onEditNameList}
              value={infoList.name}
              elementId={list.id}
              style={Name}
              placeholder="Add list name"
              refTextarea={listNameRef}
            />
            <More />
            {isTooltipOpen && (
              <Tooltip items={tooltipItems} listName={list.name} />
            )}
          </Header>
          <Droppable key={list.id} droppableId={`${list.id}`} type="task">
            {(provided, snapshot) => (
              <Content {...provided.droppableProps} ref={provided.innerRef}>
                <TaskList provided={provided} snapshot={snapshot} />
              </Content>
            )}
          </Droppable>
          {isModalOpen && (
            <AddModal
              modalName="task"
              action={onAddTask}
              listId={list.id}
              onModalToggle={onModalToggle}
            />
          )}
        </List>
      )}
    </Draggable>
  );
};
