import React from "react";
import styled from "styled-components";
import { BoardsState } from "../../store/types/boards";
import BoardLink from "../BoardLink";

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const Main = styled.main``;
const MainTitle = styled.h1`
  text-align: center;
`;
const MainButton = styled.button`
  font-size: 13px;
  font-weight: bold;
  border: 0;
  border-radius: 3px;
  height: 75px;
  padding: 0 20px;
  cursor: pointer;
  color: #6b808c;
  background-color: rgba(9,45,66,.08);
  transition: 0.1s;
  outline: none;
  &:hover {
    color: #17394d;
    background-color: rgba(9,45,66,.13);
  }
`;
const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const MainForm = styled.div`
  width: 170px;
  height: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const MainFormInput = styled.input`
  font-size: 15px;
  width: 100%;
  padding: 5px 7px;
  margin-bottom: 5px;
  outline: none;
  border: 1px solid rgba(9,45,66,.4);
  border-radius: 3px;
  transition: 0.1s;
  &:focus {
    border-color: rgba(9,45,66,.8);
  }
`;
const MainFormButton = styled.button`
  font-size: 11px;
  font-weight: bold;
  border: 0;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
  color: #6b808c;
  background-color: rgba(9,45,66,.08);
  transition: 0.1s;
  outline: none;
  &:hover {
    color: #ffffff;
    background-color: #5aac44;
  }
`;

const BoardList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

interface IProps {
  boards: BoardsState;
  boardValue: string;
  isOpenCreateForm: boolean;
  onAddBoard: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenCreateForm: () => void;
}

export default ({
  boardValue,
  onAddBoard,
  onInputChange,
  boards,
  onOpenCreateForm,
  isOpenCreateForm
}: IProps): JSX.Element => (
    <Main>
      <Container>
        <MainTitle>Kanban Board</MainTitle>
        <MainContent>
          <BoardList>
            {Object.keys(boards).map(board => (
              <BoardLink key={boards[board].id} board={boards[board]} />
            ))}
            {!isOpenCreateForm && <MainButton onClick={onOpenCreateForm}>Create new board ...</MainButton>}
            {isOpenCreateForm &&
              <MainForm>
                <MainFormInput onChange={onInputChange} value={boardValue} />
                <MainFormButton onClick={onAddBoard}>Create board</MainFormButton>
              </MainForm>
            }
          </BoardList>
        </MainContent>
      </Container>
    </Main>
  );
