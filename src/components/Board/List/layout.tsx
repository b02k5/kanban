import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TextareaAutosize from "react-textarea-autosize";

import { IList } from "../../../store/types/lists";
import Task from "../Task";
import { TaskType, TaskArguments } from "../../../store/types/tasks";
import AddModal from "../../Modal/Add/index";
import { AddButton } from "../../Buttons";
import ResizableTextarea from "../../ResizableTextarea";

interface IProps {
  list: IList;
  tasks: TaskType[];
  taskName: string;
  isModalOpen: boolean;
  index: number;
  isVisibleName: boolean;
  listNameRef: React.RefObject<HTMLTextAreaElement>;
  listName: string;
  isTooltipOpen: boolean;
  tooltipRef: React.RefObject<HTMLDivElement>;
  onSetTaskName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveList: (listId: number, tasks: Array<number>) => void;
  onEditNameList: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number
  ) => void;
  onModalToggle: () => void;
  onAddTask: ({  }: TaskArguments) => void;
  onVisibleName: () => void;
  onVisibleTooltip: () => void;
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

const TasksWrapper = styled.div`
  background-color: #e9edf4;
  border-radius: 0 0 5px 5px;
`;

const Tasks = styled.ul<{ isDraggingOver: boolean }>`
  list-style-type: none;
  margin: 0;
  padding: 0 15px;
  max-height: calc(100vh - 182px);
  overflow-y: scroll;
  transition: background-color 0.15s ease;
  background-color: ${props =>
    props.isDraggingOver ? "#d3d9e1" : "transparent"};
`;

const TasksItem = styled.li`
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
`;

const More = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  margin: 0;
  padding: 0;
  width: 25px;
  height: 30px;
  border: 0;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  transition: 0.15s;
  &:hover {
    background-color: rgba(78, 79, 83, 0.1);
  }
`;

const MoreCircle = styled.span`
  position: relative;
  display: block;
  width: 4px;
  height: 4px;
  background-color: #9d9d9f;
  border-radius: 50%;
  &::before,
  &::after {
    content: "";
    left: 0;
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: #9d9d9f;
    border-radius: 50%;
  }
  &::before {
    top: -6px;
  }
  &::after {
    top: 6px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: 45px;
  right: -200px;
  width: 250px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  background-color: white;
  z-index: 3;
`;

const TooltipName = styled.span`
  color: #a4afb6;
  display: block;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  padding: 10px 0;
  margin: 0 15px 10px 15px;
`;

const TooltipList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const TooltipItem = styled.li``;

const TooltipButton = styled.button`
  color: #36373a;
  width: 100%;
  text-align: left;
  margin: 0;
  padding: 10px 15px;
  border: 0;
  font-size: 14px;
  line-height: 19px;
  font-weight: 500;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #e9edf4;
  }
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
  isVisibleName,
  listNameRef,
  listName,
  isTooltipOpen,
  tooltipRef,
  onVisibleTooltip,
  removeTasks
}: IProps): JSX.Element => (
  <Draggable draggableId={`${list.id}`} index={index}>
    {provided => (
      <List
        id={`${list.id}`}
        {...provided.draggableProps}
        ref={provided.innerRef}
      >
        <Header>
          {!isVisibleName && (
            <HeaderTarget
              onClick={onVisibleName}
              {...provided.dragHandleProps}
            />
          )}
          <ResizableTextarea
            maxRows={4}
            lineHeight={25}
            onChange={onEditNameList}
            value={listName}
            elementId={list.id}
            style={Name}
            placeholder="Add list name"
            refTextarea={listNameRef}
          />
          <More onClick={onVisibleTooltip}>
            <MoreCircle />
          </More>
          {isTooltipOpen && (
            <Tooltip ref={tooltipRef}>
              <TooltipName>List Actions</TooltipName>
              <TooltipList>
                {list.name === "Done" && (
                  <TooltipItem>
                    <TooltipButton
                      onClick={() =>
                        list.tasks.length !== 0 &&
                        removeTasks(list.id, list.tasks)
                      }
                    >
                      Remove all tasks
                    </TooltipButton>
                  </TooltipItem>
                )}
                <TooltipItem>
                  <TooltipButton
                    onClick={() => onRemoveList(list.id, list.tasks)}
                  >
                    Remove list
                  </TooltipButton>
                </TooltipItem>
              </TooltipList>
            </Tooltip>
          )}
        </Header>
        <Droppable key={list.id} droppableId={`${list.id}`} type="task">
          {(provided, snapshot) => (
            <Content {...provided.droppableProps} ref={provided.innerRef}>
              <TasksWrapper>
                <Tasks isDraggingOver={snapshot.isDraggingOver}>
                  {[...tasks].map((task, index) => (
                    <TasksItem key={task.id}>
                      <Task task={task} index={index} />
                    </TasksItem>
                  ))}
                  {provided.placeholder}
                </Tasks>
                <AddButton
                  name="Add new task"
                  action="task"
                  click={onModalToggle}
                />
              </TasksWrapper>
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
