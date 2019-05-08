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
  addItemInputRef: React.RefObject<HTMLInputElement>;
  onSetTaskName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveList: (listId: number, tasks: Array<number>) => void;
  onEditNameList: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number
  ) => void;
  onAddTask: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, listId: number) => void;
  onDrop: (e: React.DragEvent<HTMLElement>, listId: number) => void;
  onDragOver: (e: React.DragEvent<HTMLElement>) => void;
  onDragLeave: () => void;
}

const ListItemWrapper = styled.div<{ isDraggable: boolean }>`
  position: relative;
  width: 280px;
  ${props =>
    props.isDraggable &&
    `&::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.4);
      z-index: 1;
    }`}
`;
const ListItem = styled.li`
  margin-right: 40px;
  flex: 0 0 auto;
`;

const ListHeader = styled.div`
  position: relative;
  height: 30px;
  margin-bottom: 13px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ListName = styled.textarea`
  color: #36373a;
  font-size: 22px;
  line-height: 27px;
  font-weight: bold;
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 0 20px 0 0;
  border: 0;
  border-bottom: 1px solid transparent;
  background-color: transparent;
  outline: none;
  resize: none;
  transition: 0.1s;
  &:focus,
  &:hover {
    border-bottom: 1px solid rgba(18, 33, 68, 0.15);
  }
`;
const ListRemoveButton = styled.button`
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
  background-color: transparent;
`;

const ListRemoveButtonCircle = styled.span`
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

const ListAddTaskButtonSpan = styled.span`
  color: #122144;
  display: block;
  padding-left: 22px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
`;

const ListAddTaskButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  border: 0;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.1s;
  background-color: transparent;
  &:hover {
    background-color: white;
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
  &:last-child {
    margin-bottom: 0;
  }
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
  onDragOver,
  isDraggable,
  onDragLeave,
  addItemInputRef
}: IProps): JSX.Element => (
  <ListItem
    id={`${list.id}`}
    onDrop={e => onDrop(e, list.id)}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
  >
    <ListItemWrapper isDraggable={isDraggable}>
      <ListHeader>
        <ListName
          onChange={e => onEditNameList(e, list.id)}
          defaultValue={list.name}
        />
        <ListRemoveButton onClick={() => onRemoveList(list.id, list.tasks)}>
          <ListRemoveButtonCircle />
        </ListRemoveButton>
      </ListHeader>
      <ListAddItemWrapper>
        {isAddTaskInputOpen ? (
          <BoardListAddItemInput
            type="text"
            onKeyDown={e => onKeyDown(e, list.id)}
            onChange={onSetTaskName}
            value={taskName}
            autoFocus
            ref={addItemInputRef}
          />
        ) : (
          <ListAddTaskButton onClick={onAddTask}>
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
            <ListAddTaskButtonSpan>Add new item</ListAddTaskButtonSpan>
          </ListAddTaskButton>
        )}
      </ListAddItemWrapper>

      <Tasks>
        {[...tasks].map(task => (
          <TasksItem key={task.id}>
            <Task task={task} listId={list.id} />
          </TasksItem>
        ))}
      </Tasks>
    </ListItemWrapper>
  </ListItem>
);
