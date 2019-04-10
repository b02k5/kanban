import React, { Component } from "react";
import { Route } from "react-router-dom";
import Main from "../Main";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Main} exact />
        {/* <Route path="board/:id" component={Boa} */}
      </div>
    );
  }
}

export default App;
