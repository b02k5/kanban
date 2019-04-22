import React, { Fragment } from "react";
import styled from "styled-components";
import { BoardType } from "../../store/types/boards";
import List from "./List";
import { IList } from "../../store/types/lists";
import ReactSVG from "react-svg";

import plusCircle from "../../assets/images/svg/plus-bg.svg";

const Board = styled.div``;
const BoardName = styled.h1``;
const BoardList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const AddList = styled.div`
  flex: 0 0 auto;
  margin-left: 10px;
`;

const AddListInput = styled.input`
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

const BoardAddListButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.1s;
  background-color: transparent;
  transition: 0.1s;
  &:hover {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 50%;
  }
`;

interface IProps {
  activeBoard: BoardType | undefined;
  listName: string;
  lists: IList[];
  isOpenInputList: boolean;
  onAddList: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSetListName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVisibleInput: () => void;
}

export default ({
  activeBoard,
  listName,
  onSetListName,
  onAddList,
  lists,
  onVisibleInput,
  isOpenInputList
}: IProps) => (
  <Board>
    {activeBoard && (
      <Fragment>
        <BoardName>{activeBoard.name}</BoardName>
        <BoardList>
          {[...lists].map(list => (
            <List key={list.id} list={list} boardId={activeBoard.id} />
          ))}
          <AddList>
            {isOpenInputList ? (
              <AddListInput
                type="text"
                value={listName}
                onChange={onSetListName}
                onKeyDown={e => onAddList(e)}
                autoFocus
              />
            ) : (
              <BoardAddListButton onClick={onVisibleInput}>
                <ReactSVG
                  src={plusCircle}
                  svgStyle={{
                    width: 35,
                    height: 35,
                    fill: "#122144"
                  }}
                />
              </BoardAddListButton>
            )}
          </AddList>
        </BoardList>
      </Fragment>
    )}
  </Board>
);
