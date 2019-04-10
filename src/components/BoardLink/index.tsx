import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { BoardType } from "../../store/types/boards";
import { activeBoard } from "../../store/actions/boards";

const BoardItem = styled.div``;

interface IDispatchToProps {
  activeBoard: (boardId: number) => void;
}

interface IProps {
  board: BoardType;
}

type Props = IDispatchToProps & IProps;

class BoardLink extends PureComponent<Props, {}> {
  public render(): JSX.Element {
    const { board, activeBoard } = this.props;
    return (
      <BoardItem>
        <Link to={`/board/${board.id}`} onClick={() => activeBoard(board.id)}>
          {board.name}
        </Link>
      </BoardItem>
    );
  }
}

const mapDispatchToProps = {
  activeBoard
};

export default connect(
  null,
  mapDispatchToProps
)(BoardLink);
