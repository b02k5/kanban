import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TextareaAutosize from "react-textarea-autosize";

import { IList } from "../../store/types/lists";
import { TaskType, TaskArguments } from "../../store/types/tasks";
import AddModal from "../Modal/Add/index";
import ResizableTextarea from "../ResizableTextarea";
import Tooltip from "../Tooltip";
import TaskList from "./TaskList";
import More from "./More";

import * as List from "./styles";

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
        <List.Main
          id={`${list.id}`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <List.Header>
            {!isEditName && (
              <List.Draggable
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
              style={List.Name}
              placeholder="Add list name"
              refTextarea={listNameRef}
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
              action={onAddTask}
              listId={list.id}
              onModalToggle={onModalToggle}
            />
          )}
        </List.Main>
      )}
    </Draggable>
  );
};
