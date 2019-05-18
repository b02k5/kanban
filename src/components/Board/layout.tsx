import React, { Fragment } from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

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
const Header = styled.header`
  padding: 10px 30px;
  background-color: #fdfdfd;
  border-bottom: 1px solid #d9d8da;
`;
const Name = styled.h1`
  color: #3d3f43;
  font-size: 20px;
  line-height: 33px;
  font-weight: 700;
  margin: 0;
`;

const Content = styled.div`
  padding: 20px;
`;
const Lists = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const AddListWrapper = styled.div`
  flex: 0 0 auto;
`;

const AddListButton = styled.button`
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
        <Header>
          <Name>{activeBoard.name}</Name>
        </Header>
        <Content>
          <Droppable
            droppableId={`${activeBoard.id}`}
            direction="horizontal"
            type="list"
          >
            {(provided: any) => (
              <Lists {...provided.droppableProps} ref={provided.innerRef}>
                {[...lists].map((list, index) => (
                  <List
                    key={list.id}
                    index={index}
                    list={list}
                    boardId={activeBoard.id}
                  />
                ))}
                <AddListWrapper>
                  <AddListButton onClick={onModalToggle}>
                    <ReactSVG
                      src={plusCircle}
                      svgStyle={{
                        width: 35,
                        height: 35,
                        fill: "#122144"
                      }}
                    />
                  </AddListButton>
                  {isModalOpen && (
                    <AddModal
                      modalName="list"
                      action={onAddList}
                      onModalToggle={onModalToggle}
                    />
                  )}
                </AddListWrapper>
                {provided.placeholder}
              </Lists>
            )}
          </Droppable>
        </Content>
      </Fragment>
    )}
  </Board>
);
