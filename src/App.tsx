import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProjectDetail from 'modules/project-detail';
import ProjectList from 'modules/projects';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ProjectList} />
          <Route path="/projects/:slug" component={ProjectDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
