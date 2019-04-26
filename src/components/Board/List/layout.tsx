import React from "react";
import styled from "styled-components";
import { IList } from "../../../store/types/lists";
import Task from "../Task";
import { TaskType } from "../../../store/types/tasks";
import ReactSVG from "react-svg";

import plusCircle from "../../../assets/images/svg/plus-circle.svg";

interface IProps {
  list: IList;
  tasks: TaskType[];
  taskName: string;
  isAddTaskInputOpen: boolean;
  isDraggable: boolean;
  onSetTaskName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveList: (listId: number) => void;
  onEditNameList: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number
  ) => void;
  onAddTask: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, listId: number) => void;
  onDrop: (e: React.DragEvent<HTMLElement>, listId: number) => void;
  onAllowDrop: (e: React.DragEvent<HTMLElement>) => void;
  onDragLeave: () => void;
}

const ListsItemWrapper = styled.div<{ isDraggable: boolean }>`
  position: relative;
  padding: 20px 30px;
  background-color: #ffffff;
  border: 1px solid #DAE1EC;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0
    width: 100%;
    height: 2px;
    background-color: blue;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props =>
      props.isDraggable ? "rgba(0,0,0,.4)" : "transparent"}; 
    z-index: ${props => (props.isDraggable ? "1" : "-1")}; ;
  }
`;
const ListsItem = styled.li`
  width: 350px;
  margin-right: 5px;
  flex: 0 0 auto;
`;

const ListsHeader = styled.div`
  position: relative;
  height: 30px;
  margin-bottom: 13px;
`;
const ListsTextarea = styled.textarea`
  color: #122144;
  font-size: 22px;
  line-height: 27px;
  font-weight: bold;
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 0 20px 0 0;
  border: 0;
  border-bottom: 1px solid transparent;
  outline: none;
  resize: none;
  transition: 0.1s;
  &:focus,
  &:hover {
    border-bottom: 1px solid rgba(18, 33, 68, 0.15);
  }
`;
const ListsRemoveButton = styled.button`
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  margin: 0;
  padding: 0;
  width: 20px;
  height: 30px;
  border: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ListsRemoveButtonCircle = styled.span`
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

const ListAddItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`;

const ListsAddTaskButtonSpan = styled.span`
  color: #122144;
  display: block;
  padding-left: 22px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
`;

const ListsAddTaskButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: rgba(18, 33, 68, 0.05);
  }
`;

const Tasks = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const TasksItem = styled.li`
  width: 100%;
  margin-bottom: 10px;
`;

const BoardListAddItemInput = styled.input`
  width: 65%;
  font-size: 15px;
  padding: 5px 7px;
  outline: none;
  border: 1px solid rgba(9, 45, 66, 0.4);
  border-radius: 3px;
  transition: 0.1s;
  &:focus {
    border-color: rgba(9, 45, 66, 0.8);
  }
`;

export default ({
  list,
  taskName,
  onSetTaskName,
  onRemoveList,
  onEditNameList,
  tasks,
  onKeyDown,
  onAddTask,
  isAddTaskInputOpen,
  onDrop,
  onAllowDrop,
  isDraggable,
  onDragLeave
}: IProps): JSX.Element => (
  <ListsItem
    id={`${list.id}`}
    onDrop={e => onDrop(e, list.id)}
    onDragOver={onAllowDrop}
    onDragLeave={onDragLeave}
  >
    <ListsItemWrapper isDraggable={isDraggable}>
      <ListsHeader>
        <ListsTextarea
          onChange={e => onEditNameList(e, list.id)}
          defaultValue={list.name}
        />
        <ListsRemoveButton onClick={() => onRemoveList(list.id)}>
          <ListsRemoveButtonCircle />
        </ListsRemoveButton>
      </ListsHeader>
      <ListAddItemWrapper>
        {isAddTaskInputOpen ? (
          <BoardListAddItemInput
            type="text"
            onKeyDown={e => onKeyDown(e, list.id)}
            onChange={onSetTaskName}
            value={taskName}
            autoFocus
          />
        ) : (
          <ListsAddTaskButton onClick={onAddTask}>
            <ReactSVG
              src={plusCircle}
              svgStyle={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
                width: 15,
                height: 15,
                fill: "#122144"
              }}
            />
            <ListsAddTaskButtonSpan>Add new item</ListsAddTaskButtonSpan>
          </ListsAddTaskButton>
        )}
      </ListAddItemWrapper>

      <Tasks>
        {[...tasks].map(task => (
          <TasksItem key={task.id}>
            <Task task={task} listId={list.id} />
          </TasksItem>
        ))}
      </Tasks>
    </ListsItemWrapper>
  </ListsItem>
);
