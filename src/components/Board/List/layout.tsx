import React from "react";
import styled from "styled-components";
import { IList } from "../../../store/types/lists";

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
  taskName: string;
  onSetTaskName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveList: (listId: number) => void;
  onEditNameList: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    listId: number
  ) => void;
  onAddTask: () => void;
}

export default ({
  list,
  taskName,
  onSetTaskName,
  onRemoveList,
  onEditNameList,
  onAddTask
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
      <BoardListItem>task</BoardListItem>
    </BoardListTasks>
    <BoardListFooter>
      <BoardListAddItemInput
        type="text"
        onChange={onSetTaskName}
        value={taskName}
      />
      <BoardListAddItemButton onClick={onAddTask}>
        Add another card
      </BoardListAddItemButton>
    </BoardListFooter>
  </BoardListContent>
);
