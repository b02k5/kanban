import React from "react";
import styled from "styled-components";

const Main = styled.main``;
const MainForm = styled.div``;
const MainInput = styled.input``;
const MainButton = styled.button``;

interface IProps {
  boardValue: string;
  onAddBoard: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default ({
  boardValue,
  onAddBoard,
  onInputChange
}: IProps): JSX.Element => (
  <Main>
    <MainForm>
      <MainInput onChange={onInputChange} value={boardValue} />
      <MainButton onClick={onAddBoard}>add board</MainButton>
    </MainForm>
  </Main>
);
