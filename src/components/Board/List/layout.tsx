import React from "react";
import styled from "styled-components";
import { IList } from "../../../store/types/lists";
import Task from "../Task";
import { TaskType } from "../../../store/types/tasks";

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
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ListsTextarea = styled.textarea`
  color: #122144;
  font-size: 22px;
  line-height: 27px;
  font-weight: bold;
  width: 100%;
  height: 30px;
  margin: 0 10px 0 0;
  padding: 0;
  border: 0;
  outline: none;
  resize: none;
`;
const ListsRemoveButton = styled.button`
  margin: 0;
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
    top: 0;
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: #9d9d9f;
    border-radius: 50%;
  }
  &::before {
    left: -6px;
  }
  &::after {
    left: 6px;
  }
`;

const ListAddItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const ListsAddTaskButton = styled.button``;

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

const BoardListFooter = styled.div``;
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
        <ListsAddTaskButton>Add new item</ListsAddTaskButton>
        <ListsAddItemForm>
          <BoardListAddItemInput
            type="text"
            onChange={onSetTaskName}
            value={taskName}
          />
          <BoardListAddItemButton onClick={() => onAddTask(list.id)}>
            Add item
          </BoardListAddItemButton>
        </ListsAddItemForm>
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
