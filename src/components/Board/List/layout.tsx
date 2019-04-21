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
  onSetTaskName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveList: (listId: number) => void;
  onEditNameList: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number
  ) => void;
  onAddTask: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, listId: number) => void;
}

const BoardListContent = styled.div`
  flex: 0 0 auto;
`;

const ListsItemWrapper = styled.div`
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
`;
const ListsItem = styled.li`
  width: 350px;
  margin-right: 5px;
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
  outline: none;
  resize: none;
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
  isAddTaskInputOpen
}: IProps): JSX.Element => (
  <ListsItem>
    <ListsItemWrapper>
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
                height: 15
              }}
            />
            <ListsAddTaskButtonSpan>Add new item</ListsAddTaskButtonSpan>
          </ListsAddTaskButton>
        )}
      </ListAddItemWrapper>

      <Tasks>
        {[...tasks].map(task => (
          <TasksItem key={task.id}>
            <Task task={task} />
          </TasksItem>
        ))}
      </Tasks>
    </ListsItemWrapper>
  </ListsItem>
);
