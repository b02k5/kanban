import React from "react";
import styled from "styled-components";
import { IList } from "../../../store/types/lists";
import Task from "../Task";
import { TaskType } from "../../../store/types/tasks";

const BoardListContent = styled.div`
  flex: 0 0 auto;
`;

const BoardListHeader = styled.div``;
const BoardListTextarea = styled.textarea`
  resize: none;
`;
const BoardListButtonItem = styled.button``;

const BoardListTasks = styled.div``;
const BoardListItem = styled.div``;

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
  <BoardListContent>
    <BoardListHeader>
      <BoardListTextarea
        onChange={e => onEditNameList(e, list.id)}
        defaultValue={list.name}
      />
      <BoardListButtonItem onClick={() => onRemoveList(list.id)}>
        remove
      </BoardListButtonItem>
    </BoardListHeader>
    <BoardListTasks>
      <BoardListItem>
        {[...tasks].map(task => (
          <Task key={task.id} task={task} />
        ))}
      </BoardListItem>
    </BoardListTasks>
    <BoardListFooter>
      <BoardListAddItemInput
        type="text"
        onChange={onSetTaskName}
        value={taskName}
      />
      <BoardListAddItemButton onClick={() => onAddTask(list.id)}>
        Add another card
      </BoardListAddItemButton>
    </BoardListFooter>
  </BoardListContent>
);
