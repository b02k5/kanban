import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { BoardsState } from "../../store/types/boards";
import { addBoard } from "../../store/actions/boards";
import { getBoards } from "../../store/selectors/boards";
import BoardLink from "../BoardLink";
import AddModal from "../Modal/Add";
import { EAddNewComponent, ButtonAdd } from "../Buttons";

import * as Main from "./styles";

export default () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const boards = useSelector<AppState, BoardsState>(state => getBoards(state));

  const dispatch = useDispatch();

  const addBoardHandle = ({ name }: { name: string }) => {
    dispatch(addBoard(new Date().getTime(), name));
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <Main.Main>
      <Main.Container>
        <Main.Title>Kanban Board</Main.Title>
        <Main.Content>
          <Main.BoardList>
            {Object.keys(boards).map(board => (
              <BoardLink key={boards[board].id} board={boards[board]} />
            ))}
            <ButtonAdd
              actionName={EAddNewComponent.Board}
              onClick={() => setIsModalOpen(prevState => !prevState)}
            >
              Create new board
            </ButtonAdd>
            {isModalOpen && (
              <AddModal
                name={EAddNewComponent.Board}
                action={addBoardHandle}
                onModalToggle={() => setIsModalOpen(prevState => !prevState)}
              />
            )}
          </Main.BoardList>
        </Main.Content>
      </Main.Container>
    </Main.Main>
  );
};
