import React from "react";
import { Route, Switch } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";

import Main from "../Main";
import Board from "../Board";
import { changePositionTasks } from "../../store/actions/lists";
import { ChangePositionTasksArgs } from "../../store/types/lists";
import "./App.css";

interface IDispatchToProps {
  changePositionTasks: ({  }: ChangePositionTasksArgs) => void;
}

type Props = IDispatchToProps;

const onDragEnd = (result: any, changePositionTasks: any) => {
  const { source, destination, draggableId } = result;
  if (!destination) {
    return;
  }
  const changePositionTasksArgs = {
    listId: source.droppableId,
    taskId: draggableId,
    sourceIndex: source.index,
    destinationIndex: destination.index
  };
  changePositionTasks(changePositionTasksArgs);
  window.console.log(result);
};

const App: React.FunctionComponent<Props> = ({ changePositionTasks }) => (
  <DragDropContext onDragEnd={result => onDragEnd(result, changePositionTasks)}>
    <div className="App">
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/board/:id" component={Board} />
      </Switch>
    </div>
  </DragDropContext>
);

const mapDispatchToProps: IDispatchToProps = {
  changePositionTasks
};

export default connect(
  null,
  mapDispatchToProps
)(App);
