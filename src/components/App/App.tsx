import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Main from "../Main";
import Board from "../Board";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/board/:id" component={Board} />
        </Switch>
      </div>
    );
  }
}

export default App;
