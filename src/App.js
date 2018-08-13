import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './store';

// Components
import Login from './components/auth/Login'
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
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
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/client/add" component={AddClient} />
            <Route exact path="/client/:id" component={ClientDetails} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
