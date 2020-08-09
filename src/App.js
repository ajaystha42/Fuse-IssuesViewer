import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Issue from "./components/Issue/Issue";
import Issues from "./components/Issues/Issues";
import NewIssue from "./components/UI/Forms/NewIssue";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Issues} />
        <Route exact path="/issue/:issue" component={Issue} />
        <Route exact path="/newIssue" component={NewIssue} />
      </Switch>
    </Router>
  );
}

export default App;
