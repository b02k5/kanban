import React from "react";
import { Route, Switch } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

import Main from "../Main";
import Board from "../Board";
import "./App.css";

const onDragEnd = (result: any) => {};

const App: React.FunctionComponent = () => (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/board/:id" component={Board} />
      </Switch>
    </div>
  </DragDropContext>
);

export default App;
