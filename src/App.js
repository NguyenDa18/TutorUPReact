import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Components
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <AppNavbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
