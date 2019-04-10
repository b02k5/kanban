import React, { PureComponent } from "react";
import Layout from "./layout";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { getActiveBoard } from "../../store/selectors/boards";
import { BoardType } from "../../store/types/boards";
import { addList } from "../../store/actions/lists";
import { getLists } from "../../store/selectors/lists";
import { IList } from "../../store/types/lists";

interface IStateToProps {
  activeBoard: BoardType | undefined;
  lists: IList[];
}

interface IDispatchToProps {
  addList: (boardId: number, listId: number, listName: string) => void;
}

type Props = IStateToProps & IDispatchToProps;

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

    this.props.addList(boardId, listId, this.state.listName);
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
  activeBoard: getActiveBoard(state.boards),
  lists: getLists(state)
});

const mapDispatchToProps: IDispatchToProps = {
  addList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
