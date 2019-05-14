import React, { Fragment } from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";

import { BoardType } from "../../store/types/boards";
import List from "./List";
import { IList } from "../../store/types/lists";
import plusCircle from "../../assets/images/svg/plus-bg.svg";
import AddModal from "../Modal/Add";

interface IProps {
  activeBoard: BoardType | undefined;
  lists: IList[];
  isModalOpen: boolean;
  onAddList: ({ name }: { name: string }) => void;
  onModalToggle: () => void;
}

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

export default ({
  activeBoard,
  onAddList,
  lists,
  onModalToggle,
  isModalOpen
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
            <BoardAddListButton onClick={onModalToggle}>
              <ReactSVG
                src={plusCircle}
                svgStyle={{
                  width: 35,
                  height: 35,
                  fill: "#122144"
                }}
              />
            </BoardAddListButton>
            {isModalOpen && (
              <AddModal
                modalName="list"
                action={onAddList}
                onModalToggle={onModalToggle}
              />
            )}
          </AddList>
        </BoardList>
      </Fragment>
    )}
  </Board>
);
