import React from "react";
import styled from "styled-components";
import { IList } from "../../../store/types/lists";
import Task from "../Task";
import { TaskType } from "../../../store/types/tasks";
import ReactSVG from "react-svg";

import plusCircle from "../../../assets/images/svg/plus-circle.svg";

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const ListsAddTaskButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding: 0;
  border: 0;
  cursor: pointer;
`;

const ListsAddTaskButtonSpan = styled.span`
  color: #122144;
  display: block;
  padding-left: 22px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
`;

const ListsAddItemForm = styled.div``;

const Tasks = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const TasksItem = styled.li`
  width: 100%;
  margin-bottom: 10px;
`;

const BoardListAddItemInput = styled.input``;
const BoardListAddItemButton = styled.button``;

interface IProps {
  list: IList;
  tasks: TaskType[];
  taskName: string;
  onSetTaskName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveList: (listId: number) => void;
  onEditNameList: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number
  ) => void;
  onAddTask: (listId: number) => void;
}

export default ({
  list,
  taskName,
  onSetTaskName,
  onRemoveList,
  onEditNameList,
  onAddTask,
  tasks
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
        <ListsAddTaskButton>
          <ReactSVG
            src={plusCircle}
            svgStyle={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              width: 15,
              height: 15
            }}
          />
          <ListsAddTaskButtonSpan>Add new item</ListsAddTaskButtonSpan>
        </ListsAddTaskButton>
        {/* <ListsAddItemForm>
          <BoardListAddItemInput
            type="text"
            onChange={onSetTaskName}
            value={taskName}
          />
          <BoardListAddItemButton onClick={() => onAddTask(list.id)}>
            Add item
          </BoardListAddItemButton>
        </ListsAddItemForm> */}
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
