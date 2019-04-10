import React, { Fragment } from "react";
import styled from "styled-components";
// import List from "./List";
import { BoardType } from "../../store/types/boards";

const Board = styled.div``;
const BoardName = styled.h1``;
const BoardList = styled.div`
  display: flex;
`;

const AddList = styled.div`
  flex: 0 0 auto;
`;
const AddListInput = styled.input``;
const AddListButton = styled.button``;

interface IProps {
  activeBoard: BoardType | undefined;
  listName: string;
  lists: any;
  onAddList: () => void;
  onSetListName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default ({
  activeBoard,
  listName,
  onSetListName,
  onAddList,
  lists
}: IProps) => (
  <Board>
    {activeBoard && (
      <Fragment>
        <BoardName>{activeBoard.name}</BoardName>
        <BoardList>
          {[...lists].map(list => window.console.log(list))}
          <AddList>
            <AddListInput
              type="text"
              value={listName}
              onChange={onSetListName}
            />
            <AddListButton onClick={onAddList}>Add another list</AddListButton>
          </AddList>
        </BoardList>
      </Fragment>
    )}
  </Board>
);
