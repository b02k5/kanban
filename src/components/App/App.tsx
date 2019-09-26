import React from "react";
import { Route, Switch } from "react-router-dom";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import Main from "../Main";
import Board from "../Board";
import { changePositionList } from "../../store/actions/lists";
import { moveTask, changePositionTasks } from "../../store/actions/tasks";

import "./App.css";

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;
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
      dispatch(changePositionList(changePositionListArgs));
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const changePositionTasksArgs = {
        listId: Number(source.droppableId),
        taskId: Number(draggableId),
        sourceIndex: source.index,
        destinationIndex: destination.index
      };
      dispatch(changePositionTasks(changePositionTasksArgs));
      return;
    } else {
      const moveTaskArgs = {
        sourceListId: Number(source.droppableId),
        taskId: Number(draggableId),
        targetListId: Number(destination.droppableId),
        destinationIndex: destination.index
      };
      dispatch(moveTask(moveTaskArgs));
    }
  };

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
      <div className="App">
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/board/:id" component={Board} />
        </Switch>
      </div>
    </DragDropContext>
  );
};
