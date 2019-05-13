import React, { PureComponent } from "react";
import { connect } from "react-redux";

import Layout from "./layout";
import { AppState } from "../../store";
import { getActiveBoard } from "../../store/selectors/boards";
import { BoardType } from "../../store/types/boards";
import { addList } from "../../store/actions/lists";
import { getLists } from "../../store/selectors/lists";
import { IList } from "../../store/types/lists";

interface IState {
  isModalOpen: boolean;
}

interface IStateToProps {
  activeBoard: BoardType | undefined;
  lists: IList[];
}

interface IDispatchToProps {
  addList: (boardId: number, listId: number, listName: string) => void;
}

type Props = IStateToProps & IDispatchToProps;

class Board extends PureComponent<Props, IState> {
  public state = {
    isModalOpen: false
  };

  public addListHandle = ({ name }: { name: string }) => {
    const activeBoard: BoardType = this.props.activeBoard!;
    const listId: number = new Date().getTime();

    this.props.addList(activeBoard.id, listId, name);
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));
  };

  private modalToggleHandle = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));
  };

  render(): JSX.Element {
    return (
      <Layout
        {...this.props}
        {...this.state}
        onAddList={this.addListHandle}
        onModalToggle={this.modalToggleHandle}
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
