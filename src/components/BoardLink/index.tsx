import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { BoardType } from "../../store/types/boards";
import { activeBoard } from "../../store/actions/boards";

import * as BoardLink from "./styles";

interface IProps {
  board: BoardType;
}

export default (props: IProps) => {
  const { board } = props;
  const dispatch = useDispatch();

  return (
    <BoardLink.Item>
      <Link
        to={`/board/${board.id}`}
        onClick={() => dispatch(activeBoard(board.id))}
      >
        <BoardLink.Name>{board.name}</BoardLink.Name>
      </Link>
    </BoardLink.Item>
  );
};
