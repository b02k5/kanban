import React, { Fragment } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import { BoardType } from "../../store/types/boards";
import List from "../List";
import { IList } from "../../store/types/lists";
import AddModal from "../Modal/Add";
import { ButtonAdd, EAddNewComponent } from "../Buttons";

interface IProps {
  activeBoard: BoardType | undefined;
  lists: IList[];
  isModalOpen: boolean;
  onAddList: ({ name }: { name: string }) => void;
  onModalToggle: () => void;
}

const Board = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  margin-bottom: 15px;
  padding: 10px 30px;
  background-color: #fdfdfd;
  border-bottom: 1px solid #d9d8da;
`;
const Name = styled.h1`
  color: #3d3f43;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  margin: 0;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 15px;
  display: flex;
  overflow-x: scroll;
`;
const Lists = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const ListItem = styled.li`
  flex: 0 0 auto;
`;

const AddListWrapper = styled.div`
  flex: 0 0 auto;
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
                  <ListItem key={list.id}>
                    <List index={index} list={list} boardId={activeBoard.id} />
                  </ListItem>
                ))}
                {provided.placeholder}
              </Lists>
            )}
          </Droppable>
          <AddListWrapper>
            <ButtonAdd
              actionName={EAddNewComponent.List}
              onClick={onModalToggle}
            >
              Add new list
            </ButtonAdd>
            {isModalOpen && (
              <AddModal
                name={EAddNewComponent.List}
                action={onAddList}
                onModalToggle={onModalToggle}
              />
            )}
          </AddListWrapper>
        </Content>
      </Fragment>
    )}
  </Board>
);
