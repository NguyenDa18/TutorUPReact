import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

import { Provider } from 'react-redux';
import store from './store';

// Components
import Login from './components/auth/Login';
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import Settings from './components/settings/Settings';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <AppNavbar />
        <div className="container">
          <Switch>
            <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
            <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
            <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
            <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)} />
            <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
