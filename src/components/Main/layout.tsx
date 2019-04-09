import React from "react";
import styled from "styled-components";
import { BoardsState } from "../../store/types/boards";

const Main = styled.main``;
const MainForm = styled.div``;
const MainInput = styled.input``;
const MainButton = styled.button``;

interface IProps {
  boards: BoardsState;
  boardValue: string;
  onAddBoard: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default ({
  boardValue,
  onAddBoard,
  onInputChange,
  boards
}: IProps): JSX.Element => (
  <Main>
    <MainForm>
      <MainInput onChange={onInputChange} value={boardValue} />
      <MainButton onClick={onAddBoard}>add board</MainButton>
      {Object.keys(boards).map(board => window.console.log(boards[board]))}
    </MainForm>
  </Main>
);
