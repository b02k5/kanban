import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { BoardType } from "../../store/types/boards";
import { activeBoard } from "../../store/actions/boards";

const BoardItem = styled.div`
  margin-right: 15px;
  margin-bottom: 15px;
`;

const BoardName = styled.span`
  display: block;
  height: 100%;
  background-color: rgba(73, 83, 121, 0.69);
  width: 170px;
  height: 75px;
  border-radius: 3px;
  padding: 10px 15px;
  text-decoration: none;
  transition: 0.1s;
  &:hover {
    background-color: rgba(73, 83, 121, 0.8);
  }
`;

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
          <BoardName>{board.name}</BoardName>
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
