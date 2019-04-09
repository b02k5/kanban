import React, { PureComponent } from "react";
import Layout from "./layout";

interface IState {
  boardValue: string;
}

export default class Main extends PureComponent<any, IState> {
  public state = {
    boardValue: ""
  };

  public addBoardHandler = () => {
    this.state.boardValue !== "" &&
      this.setState({
        boardValue: ""
      });
  };

  public inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      boardValue: e.target.value
    });
  };

  public render(): JSX.Element {
    return (
      <Layout
        {...this.state}
        onAddBoard={this.addBoardHandler}
        onInputChange={this.inputChangeHandler}
      />
    );
  }
}
