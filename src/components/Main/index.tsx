import React, { PureComponent } from "react";
import Layout from "./layout";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { BoardsState } from "../../store/types/boards";
import { addBoard } from "../../store/actions/boards";
import { getBoards } from "../../store/selectors/boards";

interface IStateToProps {
  boards: BoardsState;
}

interface IDispatchToProps {
  addBoard: (boardId: number, boardName: string) => void;
}

interface IState {
  boardValue: string;
  isOpenCreateForm: boolean;
}

type Props = IStateToProps & IDispatchToProps;

class Main extends PureComponent<Props, IState> {
  public state = {
    boardValue: "",
    isOpenCreateForm: false
  };

  public addBoardHandler = () => {
    const createBoardId = new Date().getTime();
    if (this.state.boardValue !== "") {
      this.props.addBoard(createBoardId, this.state.boardValue);

      this.setState({
        boardValue: "",
        isOpenCreateForm: false
      });
    }
  };

  public inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      boardValue: e.target.value
    });
  };

  public openCreateFormHandle = () => {
    this.setState({
      isOpenCreateForm: true
    })
  }

  public render(): JSX.Element {
    return (
      <Layout
        {...this.props}
        {...this.state}
        onAddBoard={this.addBoardHandler}
        onInputChange={this.inputChangeHandler}
        onOpenCreateForm={this.openCreateFormHandle}
      />
    );
  }
}

const mapStateToProps = (state: AppState): IStateToProps => ({
  boards: getBoards(state)
});

const mapDispatchToProps: IDispatchToProps = {
  addBoard
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
