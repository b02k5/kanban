import React, { PureComponent } from "react";
import Layout from "./layout";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { getActiveBoard } from "../../store/selectors/boards";
import { BoardType } from "../../store/types/boards";

interface IStateToProps {
  activeBoard: BoardType | undefined;
}

type Props = IStateToProps;

class Board extends PureComponent<Props, any> {
  public state = {
    listName: ""
  };

  public setListNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      listName: e.target.value
    });
  };

  public addListHandler = () => {
    const boardId: number = this.props.activeBoard
      ? this.props.activeBoard.id
      : 0;
    const listId: number = new Date().getTime();
    this.state.listName !== "" &&
      this.setState({
        listName: ""
      });
  };

  render(): JSX.Element {
    return (
      <Layout
        {...this.props}
        {...this.state}
        onSetListName={this.setListNameHandle}
        onAddList={this.addListHandler}
      />
    );
  }
}

const mapStateToProps = (state: AppState): IStateToProps => ({
  activeBoard: getActiveBoard(state.boards)
});

export default connect(
  mapStateToProps,
  null
)(Board);
