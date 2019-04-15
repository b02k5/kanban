import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ListLayout from "./layout";
import { IList } from "../../../store/types/lists";
import { removeList } from "../../../store/actions/lists";

interface IProps {
  list: IList;
  boardId: number;
}

interface IDispatchProps {
  removeList: (boardId: number, listId: number) => void;
}

interface IState {
  taskName: string;
}

type Props = IProps & IDispatchProps;

class List extends PureComponent<Props, IState> {
  public state = {
    taskName: ""
  };

  public setTaskNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskName: e.target.value
    });
  };

  public removeListHandle = (listId: number) => {
    const { boardId } = this.props;
    this.props.removeList(boardId, listId)
  };

  public render(): JSX.Element {
    return (
      <ListLayout
        {...this.props}
        {...this.state}
        onRemoveList={this.removeListHandle}
        onSetTaskName={this.setTaskNameHandle}
      />
    );
  }
}

const mapDispatchToProps: IDispatchProps = {
  removeList
};

export default connect(
  null,
  mapDispatchToProps
)(List);
