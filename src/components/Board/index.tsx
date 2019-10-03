import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../store";
import { BoardType } from "../../store/types/boards";
import { addList } from "../../store/actions/lists";
import { toggleModal } from "../../store/actions/modal";
import { getLists } from "../../store/selectors/lists";
import { IList } from "../../store/types/lists";
import { ButtonAdd, EAddNewComponent } from "../Buttons";
import AddModal from "../Modal/Add";
import Lists from "./Lists";
import { ContextBoard } from "../../utils/context";

import * as Board from "./styles";

export default ({
  match: { params }
}: {
  match: { params: { id: string } };
}) => {
  const getActiveBoard = useSelector<AppState, BoardType>(state => {
    return state.boards[params.id];
  });
  const isModalOpen = useSelector<AppState, Boolean>(
    state => state.modal.isModalOpen
  );
  const lists = useSelector<AppState, IList[]>(state => getLists(state));

  const dispatch = useDispatch();

  const addListHandle = ({ name }: { name: string }) => {
    const board: BoardType = getActiveBoard!;
    const listId: number = new Date().getTime();

    dispatch(addList(board.id, listId, name));

    dispatch(toggleModal());
  };

  const { name, id } = getActiveBoard;

  return (
    <ContextBoard.Provider value={id}>
      <Board.Main>
        <>
          <Board.Header>
            <Board.Name>{name}</Board.Name>
          </Board.Header>
          <Board.Content>
            <Lists lists={lists} />
            <Board.AddList>
              <ButtonAdd
                actionName={EAddNewComponent.List}
                onClick={() => dispatch(toggleModal())}
              >
                Add new list
              </ButtonAdd>
              {isModalOpen && (
                <AddModal
                  name={EAddNewComponent.List}
                  action={addListHandle}
                  closeModal={() => dispatch(toggleModal())}
                />
              )}
            </Board.AddList>
          </Board.Content>
        </>
      </Board.Main>
    </ContextBoard.Provider>
  );
};
