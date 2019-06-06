import React from "react";
import { Route, Switch } from "react-router-dom";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";

import Main from "../Main";
import Board from "../Board";
import { changePositionList } from "../../store/actions/lists";
import { ChangePositionListArgs } from "../../store/types/lists";
import { moveTask, changePositionTasks } from "../../store/actions/tasks";
import {
  ChangePositionTaskArgs,
  MoveTaskActionArgs
} from "../../store/types/tasks";
import "./App.css";

interface IDispatchToProps {
  changePositionTasks: ({  }: ChangePositionTaskArgs) => void;
  moveTask: ({  }: MoveTaskActionArgs) => void;
  changePositionList: ({  }: ChangePositionListArgs) => void;
}

type Props = IDispatchToProps;

const App: React.FunctionComponent<Props> = props => {
  const onDragEnd = (result: DropResult, props: Props) => {
    const { source, destination, draggableId, type } = result;
    const { moveTask, changePositionTasks, changePositionList } = props;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const changePositionListArgs = {
        boardId: Number(source.droppableId),
        listId: Number(draggableId),
        sourceIndex: source.index,
        destinationIndex: destination.index
      };
      changePositionList(changePositionListArgs);
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const changePositionTasksArgs = {
        listId: Number(source.droppableId),
        taskId: Number(draggableId),
        sourceIndex: source.index,
        destinationIndex: destination.index
      };
      changePositionTasks(changePositionTasksArgs);
      return;
    } else {
      const moveTaskArgs = {
        sourceListId: Number(source.droppableId),
        taskId: Number(draggableId),
        targetListId: Number(destination.droppableId),
        destinationIndex: destination.index
      };
      moveTask(moveTaskArgs);
    }
  };

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result, props)}>
      <div className="App">
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/board/:id" component={Board} />
        </Switch>
      </div>
    </DragDropContext>
  );
};

const mapDispatchToProps: IDispatchToProps = {
  changePositionTasks,
  moveTask,
  changePositionList
};

export default connect(
  null,
  mapDispatchToProps
)(App);
