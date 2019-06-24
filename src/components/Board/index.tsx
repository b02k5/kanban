import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../store";
import { getActiveBoard } from "../../store/selectors/boards";
import { BoardType } from "../../store/types/boards";
import { addList } from "../../store/actions/lists";
import { getLists } from "../../store/selectors/lists";
import { IList } from "../../store/types/lists";
import { ButtonAdd, EAddNewComponent } from "../Buttons";
import AddModal from "../Modal/Add";
import Lists from "./Lists";

import * as Board from "./styles";

export default () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const activeBoard = useSelector<AppState, BoardType | undefined>(state =>
    getActiveBoard(state.boards)
  );
  const lists = useSelector<AppState, IList[]>(state => getLists(state));

  const dispatch = useDispatch();

  const addListHandle = ({ name }: { name: string }) => {
    const board: BoardType = activeBoard!;
    const listId: number = new Date().getTime();

    dispatch(addList(board.id, listId, name));

    setIsModalOpen(prevState => !prevState);
  };

  return (
    <Board.Main>
      {activeBoard && (
        <>
          <Board.Header>
            <Board.Name>{activeBoard.name}</Board.Name>
          </Board.Header>
          <Board.Content>
            <Lists lists={lists} activeBoard={activeBoard} />
            <Board.AddList>
              <ButtonAdd
                actionName={EAddNewComponent.List}
                onClick={() => setIsModalOpen(prevState => !prevState)}
              >
                Add new list
              </ButtonAdd>
              {isModalOpen && (
                <AddModal
                  name={EAddNewComponent.List}
                  action={addListHandle}
                  closeModal={() => setIsModalOpen(prevState => !prevState)}
                />
              )}
            </Board.AddList>
          </Board.Content>
        </>
      )}
    </Board.Main>
  );
};
