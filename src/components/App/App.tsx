import React from "react";
import { Route, Switch } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";

import Main from "../Main";
import Board from "../Board";
import { changePositionTasks } from "../../store/actions/lists";
import { ChangePositionTasksArgs } from "../../store/types/lists";
import { removeTask } from "../../store/actions/tasks";
import "./App.css";

interface IDispatchToProps {
  changePositionTasks: ({  }: ChangePositionTasksArgs) => void;
  removeTask: (
    sourceListId: number,
    targetListId: number,
    taskId: number,
    destinationIndex: number
  ) => void;
}

type Props = IDispatchToProps;

const onDragEnd = (result: any, props: any) => {
  const { source, destination, draggableId } = result;
  const { removeTask, changePositionTasks } = props;
  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  if (source.droppableId === destination.droppableId) {
    const changePositionTasksArgs = {
      listId: source.droppableId,
      taskId: draggableId,
      sourceIndex: source.index,
      destinationIndex: destination.index
    };
    changePositionTasks(changePositionTasksArgs);
    return;
  }

  removeTask(
    source.droppableId,
    draggableId,
    destination.droppableId,
    destination.index
  );
};

const App: React.FunctionComponent<Props> = props => (
  <DragDropContext onDragEnd={result => onDragEnd(result, props)}>
    <div className="App">
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/board/:id" component={Board} />
      </Switch>
    </div>
  </DragDropContext>
);

const mapDispatchToProps: IDispatchToProps = {
  changePositionTasks,
  removeTask
};

export default connect(
  null,
  mapDispatchToProps
)(App);
